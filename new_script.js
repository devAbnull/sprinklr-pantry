const categoryModel = new function () {
    this.all = "all";
    this.beverages = "beverages";
    this.fruits = "fruits";
    this.snacks = "snacks";
    this.drinks = "drinks";
    this.categories = [ this.all, this.beverages, this.fruits, this.snacks, this.drinks ];
    this.categoryLive = this.all;
}

const itemListModel =  {
    "tea" : {
        "name": "tea",
        "category": categoryModel.beverages,
        "img": "tea.jpg"
    },
    "coffee" : {
        "name": "coffee",
        "category": categoryModel.beverages,
        "img": "coffee.jpg"
    },
    "eggs" : {
        "name": "eggs",
        "category": categoryModel.snacks,
        "img": "eggs.jpg"
    },
    "mangojuice" : {
        "name": "mango juice",
        "category": categoryModel.snacks,
        "img": "mangojuice.jpg"
    },
    "mango" : {
        "name": "mango",
        "category": categoryModel.fruits,
        "img": "mango.jpg"
    },
    "orangejuice" : {
        "name": "orange juice",
        "category": categoryModel.drinks,
        "img": "orangejuice.png"
    },
    "greentea" : {
        "name": "green tea",
        "category": categoryModel.beverages,
        "img": "greentea.jpg"
    },
    "maggi": {
        "name": "maggi",
        "category": categoryModel.snacks,
        "img": "maggi.jpg"
    },
    "grapes": {
        "name": "grapes",
        "category" : categoryModel.fruits,
        "img": "grapes.jpg"
    },
    "goodday" : {
        "name": "good day",
        "category" : categoryModel.snacks,
        "img": "goodday.jpg"
    },
    "blackcoffee" : {
        "name": "black coffee",
        "category": categoryModel.beverages,
        "img": "blackcoffee.jpg"
    }
};

const orderModel = new function () {
    this.orderList = [];
    this.orderNo = 0;
    // console.log("le")
    // this.pendingStatus = "pending";
    // this.completedStatus = "completed";
}

const pendingOrderModel = new function () {
    this.status = "pending";
    this.deleteBtnObj =  {}

    this.pendingOrderList = [];
}

const completedOrdeModel = new function () {
    this.status = "completed";
    this.completedOrderList = [];
}

const cartModel = new function () {
    this.cartItemsList = {};
    this.cartQty = 0;
}

const userModel = new function () {
    this.userDetails = {name: "Abhijit", tableNo: 9};
}


const controller = new function(){

    this.init = function () {
        // const orderList = this.filterOrderList("xx");
        this.getItemsFromLocal();
        this.createDeleteBtnObj();
        categoryView.showCategories(categoryModel.categories);
        itemListView.showItemsList(itemListModel);
        // console.log(pendingOrderView)
        const pendingOrderList = this.filterOrderList(pendingOrderModel.status);
        orderListView.showOrderList(pendingOrderList, pendingOrderModel.deleteBtnObj, this.deletePendingOrder, orderListView.pendingListNode);
    }

    this.createDeleteBtnObj = function () {
        pendingOrderModel.deleteBtnObj = {
            label: "Delete",
            className: "delete-btn",
        }
    }
    
    this.pushToOrderList= function (order) {
        orderModel.orderList.push(order);
    };

    this.getOrderNoFromLocal= function () {
        orderModel.orderNo = Number(localStorage.getItem("orderNo"));
        console.log(typeof orderModel.orderNo);
    };
    
    this.getOrderListFromLocal = function () {
        const listFromLocal = JSON.parse(localStorage.getItem("orderList"));
        if(!listFromLocal) {
            orderModel.orderList = [];
            return;
        }
        orderModel.orderList = listFromLocal.map( (orderStr)=> JSON.parse(orderStr));
    }

    this.getItemsFromLocal= function () {
        this.getOrderListFromLocal();
        this.getOrderNoFromLocal();
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

    this.onAddToCart = function (itemName) {
        if(!cartModel.cartItemsList[itemName]){
            const cartItem = { qty: 1, name: itemName};
            this.updateCartList(cartItem);
            this.updateCartCounter(cartModel.cartQty+1);
            cartView.addNewCartItem(cartItem);
            cartView.setCartCounterLabel(cartModel.cartQty);
        }
    };

    this.updateCartCounter = function (newValue) {
        cartModel.cartQty = newValue;
    };

    this.updateOrderNo = function (newValue) {
        orderModel.orderNo = newValue;
    };
    
    this.addToOrderList = function (itemsToOrder) {
        console.log(pendingOrderModel, orderModel, itemListModel, cartModel, userModel)
        const order = {
            orderid: orderModel.orderNo,
            items: itemsToOrder,
            timestamp: Date.now(),
            status: pendingOrderModel.status,
            user: userModel.userDetails
        }
        this.pushToOrderList(order);
        this.updateOrderNo(orderModel.orderNo+1);
        this.writeToLocal();
    };
    
    this.onOrderNow = function (itemName) {
        const quickCart = {};
        quickCart[itemName] = {
            qty: 1, name: itemName
        }
        this.addToOrderList(quickCart);
    };

    this.getCartItemQty = function (itemName){
        return document.getElementById(`qty-${itemName}`).value;
    };
    
    this.onPlaceOrder = function () {
        for(itemName in cartModel.cartItemsList){
            cartModel.cartItemsList[itemName] = this.getCartItemQty(itemName);
        }
        this.addToOrderList(cartModel.cartItemsList);

    };

    this.clearCart = function () {
        Object.keys(cartModel.cartItemsList).forEach((item) => {
            delete cartModel.cartItemsList[item];
        })
        this.updateCartCounter(0);
        
    };
    
    this.deleteCartItem = function (itemName) {
        const cartItemNode =  this.getCartItemNode(itemName);
        if(itemName in cartModel.cartItemsList) delete cartItemsList[itemName];
        this.updateCartCounter(cartModel.cartQty-1);
    };

    this.getCarItemNode = function (itemName) {
        return document.getElementById(`cart-${itemName}`);
    };

    this.deleteOrder = function (orderId) {
        if(orderModel.orderList[orderId]){
            delete orderModel.orderList[orderId];
        }
        this.writeToLocal();
    }
    
    this.getPendingOrderNode = function (orderId) {
        return document.getElementById(`pend-order${orderId}`);
    }
    
    this.deletePendingOrder =  (orderId) => {
        this.deleteOrder(orderId);
        const nodeToDel = this.getPendingOrderNode(orderId);
    }
    
    this.onCategoryChange = function (newCategory) {
        if(newCategory === categoryModel.categoryLive) return;
        const listToDisplay = {};

        if(newCategory === categoryModel.all){
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

        itemListView.showItemsList(listToDisplay);

    }

    this.getSelectionNode = function (orderId) {
        return document.getElementById(`status-sel-${orderId}`);
    }

    this.onSelectionChanged = function (orderId) {
        newStatus = this.getSelectionNode(orderId).value;
        this.setOrderStatus(orderId, newStatus);
        writeLocal();
    }

    this.setOrderStatus = function(orderId, newStatus){
        orderModel.orderList[orderId].status = newStatus;
    }

    this.filterOrderList = function (status) {
        return orderModel.orderList.filter( (order) => {
            if(order) return order.status === status;
        })
    }

}

const itemListView = new function () {
    // this.init = function () {
    this.itemsListNode = document.getElementById("item-list");
    // }

    // this.init = function() {
    //
    // }

    this.showItemsList = function (listToDisplay) {
        const fragment = document.createDocumentFragment();

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

            addToCartNode.addEventListener("click", (itemName) => {
                controller.onAddToCart(itemName);
            })
            fragment.appendChild(itemNode);
        })

        this.itemsListNode.appendChild(fragment);
    }
}

const orderListView = new function () {
    this.pendingListNode = document.getElementById("pending-order-list");
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
               cb(order.orderid);
        });

        parentNode.appendChild(orderNode);
    }
}

const cartView = function () {
    this.cartListNode = document.getElementById("order-list");

    this.getItemQtyLabel = function (itemName) {
        return `qty-${itemName}`;
    }
    
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
                            
                            <input type="number" min="0" class="qty-number" id=${this.getItemQtyLabel(item.name)} value=${cartItem.qty} >
                            
                        </span>
                <button class="delete-cart-item pend-btns">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>`

        const deleteBtn = itemNode.getElementsByClassName("delete-cart-item")[0];
        deleteBtn.addEventListener("click", () => {
            controller.deleteCartItem(item.name)
        })
        cartListNode.appendChild(itemNode);
    }
}

const categoryView = new function () {
    this.categoryListNode = document.getElementById("categories-list");
    const fragment = document.createDocumentFragment();

    this.showCategories = function (categorylist) {
        categorylist.forEach((category) => {
            const categoryNode = document.createElement("li");
            const state = (category === categoryModel.categoryLive)?"select":"unselect";

            categoryNode.setAttribute("id",category);
            categoryNode.setAttribute("class", `category-blck ${state}`);
            categoryNode.innerHTML = `<a>${category}</a>`;

            categoryNode.addEventListener("click", (category) => {
                controller.onCategoryChange(category);
            })
            fragment.appendChild(categoryNode);
        })
        this.categoryListNode.appendChild(fragment);
    }
}

// itemListView.init();
controller.init();