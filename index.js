const CATEGORY_TYPES = {
    ALL: "all",
    BEVERAGES: "beverages",
    FRUITS: "fruits",
    SNACKS: "snacks",
    DRINKS: "drinks"
}

const categoryModel =  {
    categories : [CATEGORY_TYPES.ALL, CATEGORY_TYPES.BEVERAGES, CATEGORY_TYPES.DRINKS, CATEGORY_TYPES.FRUITS, CATEGORY_TYPES.SNACKS],
    categoryLive : CATEGORY_TYPES.ALL
}

const itemListModel =  {
    "tea" : {
        "name": "tea",
        "category": CATEGORY_TYPES.BEVERAGES,
        "img": "tea.jpg"
    },
    "coffee" : {
        "name": "coffee",
        "category": CATEGORY_TYPES.BEVERAGES,
        "img": "coffee.jpg"
    },
    "eggs" : {
        "name": "eggs",
        "category": CATEGORY_TYPES.SNACKS,
        "img": "eggs.jpg"
    },
    "mangojuice" : {
        "name": "mango juice",
        "category": CATEGORY_TYPES.DRINKS,
        "img": "mangojuice.jpg"
    },
    "mango" : {
        "name": "mango",
        "category": CATEGORY_TYPES.FRUITS,
        "img": "mango.jpg"
    },
    "orangejuice" : {
        "name": "orange juice",
        "category": CATEGORY_TYPES.DRINKS,
        "img": "orangejuice.png"
    },
    "greentea" : {
        "name": "green tea",
        "category": CATEGORY_TYPES.BEVERAGES,
        "img": "greentea.jpg"
    },
    "maggi": {
        "name": "maggi",
        "category": CATEGORY_TYPES.SNACKS,
        "img": "maggi.jpg"
    },
    "grapes": {
        "name": "grapes",
        "category" : CATEGORY_TYPES.FRUITS,
        "img": "grapes.jpg"
    },
    "goodday" : {
        "name": "good day",
        "category" : CATEGORY_TYPES.SNACKS,
        "img": "goodday.jpg"
    },
    "blackcoffee" : {
        "name": "black coffee",
        "category": CATEGORY_TYPES.BEVERAGES,
        "img": "blackcoffee.jpg"
    }
};

const orderModel = {
    orderList : [],
    orderNo : Number(localStorage.getItem("orderNo")) || 0
}

orderModel.getOrderListFromLocal = function () {
    const listFromLocal = JSON.parse(localStorage.getItem("orderList"));
    if(!listFromLocal) {
        orderModel.orderList = [];
        return;
    }
    orderModel.orderList = listFromLocal.map( (orderStr)=> JSON.parse(orderStr));
}

const pendingOrderModel = {
    status : "pending",
    pendingOrderList: [],
    deleteBtnObj : {
        label: "Delete",
        className: "delete-btn"
    }
}

const completedOrderModel = {
    status : "completed",
    completedOrderList : [],
    reOrderBtnObj : {
        label: "Reorder",
        className: "reorder-btn"
    }
}

const cartModel = {
    cartItemsList : {},
    cartQty : 0
}

const userModel= {
    userDetails : {name: "Abhijit", tableNo: 9}
}


const ControllerC =  function(){

    this.init = function () {
        orderModel.getOrderListFromLocal();
        categoryView.showCategories(categoryModel.categories);
        itemListView.showItemsList(itemListModel);
        const pendingOrderList = this.filterOrderList(pendingOrderModel.status);
        const completedOrderList = this.filterOrderList(completedOrderModel.status);

        orderListView.showOrderList(pendingOrderList, pendingOrderModel.deleteBtnObj, this.deletePendingOrder, orderListView.pendingListNode);
        orderListView.showOrderList(completedOrderList, completedOrderModel.reOrderBtnObj, this.reorder, orderListView.completedListNode);
    };

    this.pushToOrderList= function (order) {
        orderModel.orderList.push(order);
    };

    this.writeToLocal = function() {
        localStorage.setItem("orderNo",orderModel.orderNo);
        const listToWrite = orderModel.orderList.map( (order) =>  JSON.stringify(order) );
        localStorage.setItem("orderList",JSON.stringify(listToWrite));
    };

    this.updateCartList = function(cartItem) {
        cartModel.cartItemsList[cartItem.name] = cartItem.qty;
    };

    this.getItem = function (itemName) {
        return  itemListModel[itemName];
    }

    this.updateCartCounter = function (newValue) {
        cartModel.cartQty = newValue;
        cartView.setCartCounterLabel(cartModel.cartQty);
    };

    this.updateOrderNo = function (newValue) {
        orderModel.orderNo = newValue;
    };

    this.getCartItemNode = function (itemName) {
        return document.getElementById(`cart-${itemName}`);
    };

    this.getPendingOrderNode = function (orderId) {
        return document.getElementById(`pend-order${orderId}`);
    }

    this.onCategoryChange = function (newCategory) {

        if(newCategory === categoryModel.categoryLive) return;
        let listToDisplay = {};

        if(newCategory === CATEGORY_TYPES.ALL){
            listToDisplay = itemListModel;
        }
        else{
            for(itemName in itemListModel){
                const item = itemListModel[itemName];
                if(item.category === newCategory){
                    listToDisplay[itemName] = item;
                }
            }
        }

        const categoryToSelect  = document.getElementById(newCategory);
        const categoryToUnselect = document.getElementById(categoryModel.categoryLive);
        categoryToSelect.setAttribute("class", "category-blck select");
        categoryToUnselect.setAttribute("class", "category-blck unselect");
        categoryModel.categoryLive = newCategory;
        itemListView.showItemsList(listToDisplay);

    }

    this.filterOrderList = function (status) {
        return orderModel.orderList.filter( (order) => {
            if(order) return order.status === status;
        })
    }

    this.onPlaceOrder = function () {
        for(itemName in cartModel.cartItemsList){
            cartModel.cartItemsList[itemName] ={ qty: cartView.getCartItemQty(itemName), name: itemName};
        }
        this.addToOrderList(cartModel.cartItemsList);
        this.clearCart();
        location.href="#";
    };

    this.reorder = function (orderId) {
        const itemList = orderModel.orderList[orderId].items;
        this.addToOrderList(itemList);
    }

    this.clearCart = function () {
        Object.keys(cartModel.cartItemsList).forEach((item) => {
            delete cartModel.cartItemsList[item];
    })
        this.updateCartCounter(0);

    };

    this.deleteCartItem = function (itemName) {
        const cartItemNode =  this.getCartItemNode(itemName);
        if(itemName in cartModel.cartItemsList) delete cartModel.cartItemsList[itemName];
        cartView.cartListNode.removeChild(cartItemNode);
        this.updateCartCounter(cartModel.cartQty-1);
    };

    this.deleteOrder = function (orderId) {
        if(orderModel.orderList[orderId]){
            delete orderModel.orderList[orderId];
            console.log(orderModel.orderList);
        }

        this.writeToLocal();
    }

    this.deletePendingOrder = function (orderId) {
        this.deleteOrder(orderId);
        const nodeToDel = this.getPendingOrderNode(orderId);
        orderListView.pendingListNode.removeChild(nodeToDel);
    }

    this.onAddToCart = function (itemName) {
        if(!cartModel.cartItemsList[itemName]){
            const cartItem = { qty: 1, name: itemName};
            this.updateCartList(cartItem);
            this.updateCartCounter(cartModel.cartQty+1);
            cartView.addNewCartItem(cartItem);
        }
    };

    this.addToOrderList = function (itemsToOrder) {
        console.log(itemsToOrder)
        const order = {
            orderid: orderModel.orderNo,
            items: itemsToOrder,
            timestamp: Date.now(),
            status: pendingOrderModel.status,
            user: userModel.userDetails
        }
        this.pushToOrderList(order);
        this.updateOrderNo(orderModel.orderNo+1);
        orderListView.addNewOrder(order, orderListView.pendingListNode , pendingOrderModel.deleteBtnObj, this.deletePendingOrder);
        this.writeToLocal();
    };

    this.onOrderNow = function (itemName) {
        const quickCart = {};
        quickCart[itemName] = {
            qty: 1, name: itemName
        }
        this.addToOrderList(quickCart);
    };
}

const ItemListViewC = function () {
    // this.init = function () {
    this.itemsListNode = document.getElementById("item-list");

    this.showItemsList = function (listToDisplay) {
        const fragment = document.createDocumentFragment();
        this.itemsListNode.innerHTML = ""
        Object.keys(listToDisplay).forEach( (itemName)=>{
            const item = listToDisplay[itemName];
            const itemNode = document.createElement("li");

            itemNode.setAttribute("id", item["name"]);
            itemNode.setAttribute("class", "item-card")

            itemNode.innerHTML = `
            <div class="item-img-block">
                <img class="item-img" alt="no image to dislpay" src="./images/${item.img}" />
                <div class="overlay-img">
                    <div class="add-cart">
                        <button class="add-cart-icon add-to-cart-node">
                            <div>Add to cart</div>
                        </button>
                        <button class="add-cart-icon quick-order-btn">
                            <div>Order Now</div>
                        </button>
                    </div>
                </div>
            </div>
            <div class="item-content">
                <div class="item-title">
                    ${item.name}
                </div>
                <div class="item-category">
                    ${item.category}
                </div>
            </div>`

            const quickOrderNode = itemNode.getElementsByClassName("quick-order-btn")[0];
            const addToCartNode = itemNode.getElementsByClassName("add-to-cart-node")[0];

            quickOrderNode.addEventListener("click", () => {
                controller.onOrderNow(itemName);
            })

            addToCartNode.addEventListener("click", () => {
                controller.onAddToCart(itemName);
            })
            fragment.appendChild(itemNode);
        })

        this.itemsListNode.appendChild(fragment);
    }
}

const OrderListViewC = function () {
    this.pendingListNode = document.getElementById("pending-order-list");
    this.completedListNode = document.getElementById("order-completed-list");

    this.showOrderList = function (listToShow, buttonObj, cb, parentNode) {
        const fragment = document.createDocumentFragment();
        listToShow.forEach( (order) => {
            this.addNewOrder(order, fragment, buttonObj, cb)
        })
        parentNode.appendChild(fragment);
    }

    this.addNewOrder = function (order, parentNode, buttonObj, cb){
        const orderNode = document.createElement("li");
        const itemsInOrder = order.items;
        const items = Object.keys(itemsInOrder);
        const date = new Date(order.timestamp)
        orderNode.setAttribute("id",`pend-order${order.orderid}`);
        orderNode.setAttribute("class", "item-pend-card");

        orderNode.innerHTML = `
             <div class="pend-content">
                <ul class="items">
                    ${items.map(itemName => {
            return `<li class="item-name"><div class="item-name-only">${itemName}</div><span class="item-qty"> ${itemsInOrder[itemName].qty}</span></li>`
        }).join("")}
                </ul>
             </div>
             <div class="time-remove">
                ${date.getHours() +":"+ date.getMinutes()}
                <button class="order-list-btn ${buttonObj.className}">${buttonObj.label}</button>
             </div>`

        const btnNode = orderNode.getElementsByClassName("order-list-btn")[0];
        btnNode.addEventListener("click", () => {
               cb.call(controller, order.orderid);
        });

        parentNode.appendChild(orderNode);
    }
}

const CartViewClass = function () {
    this.cartListNode = document.getElementById("order-list");
    const placeOrderBtn = document.getElementsByClassName("place-order-btn")[0];
    placeOrderBtn.addEventListener("click", () => controller.onPlaceOrder());
    this.getItemQtyLabel = function (itemName) {
        return `qty-${itemName}`;
    }

    this.getCartItemQty = function (itemName){
        return document.getElementById(`qty-${itemName}`).value;
    };
    
    this.setCartCounterLabel = function (newValue) {
        document.getElementById("cart-qty").innerText = newValue;
    }

    this.addNewCartItem = function (cartItem) {
        const item = controller.getItem(cartItem.name);
        const itemNode = document.createElement("li");

        itemNode.setAttribute("id",`cart-${item.name}`);
        itemNode.setAttribute("class","cart-item");
        itemNode.innerHTML = `
            <img class="cart-item-img" src="./images/${item["img"]}"/>
                <span class="cart-item-title">${item["name"]}</span>
                <span class="order-qty">
                            <label class="qty-label">Qty:</label>
                            
                            <input type="number" min="0" class="qty-number" id=${this.getItemQtyLabel(cartItem.name)} value=${cartItem.qty} >
                            
                        </span>
                <button class="delete-cart-item pend-btns">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>`

        const deleteBtn = itemNode.getElementsByClassName("delete-cart-item")[0];
        deleteBtn.addEventListener("click", () => {
            controller.deleteCartItem(item.name)
        })
        this.cartListNode.appendChild(itemNode);
    }
}

const CategoryViewClass = function () {
    this.categoryListNode = document.getElementById("categories-list");
    const fragment = document.createDocumentFragment();

    this.showCategories = function (categorylist) {
        categorylist.forEach((category) => {
            const categoryNode = document.createElement("li");
            const state = (category === categoryModel.categoryLive)?"select":"unselect";

            categoryNode.setAttribute("id",category);
            categoryNode.setAttribute("class", `category-blck ${state}`);
            categoryNode.innerHTML = `<a>${category}</a>`;

            categoryNode.addEventListener("click", () => {
                controller.onCategoryChange(category);
            })
            fragment.appendChild(categoryNode);
        })
        this.categoryListNode.appendChild(fragment);
    }
}

// itemListView.init();
var categoryView = new CategoryViewClass();
var cartView = new CartViewClass();
var itemListView = new ItemListViewC();
var orderListView = new OrderListViewC();
var controller = new ControllerC();
controller.init();