
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
        // categoryView.showCategories(categoryModel.categories);
        // itemListView.showItemsList(itemListModel);

        // orderListView.showOrderList(pendingOrderList, pendingOrderModel.deleteBtnObj, this.deletePendingOrder, orderListView.pendingListNode);
        // orderListView.showOrderList(completedOrderList, completedOrderModel.reOrderBtnObj, this.reorder, orderListView.completedListNode);

    };

    this.getItemList = function () {
        return itemListModel;
    }

    this.getCategories = function(){
        return categoryModel.categories;
    }

    this.getItemLists = function(){
        return itemListModel;
    }

    this.getDeletebtn = function() {
        return pendingOrderModel.deleteBtnObj
    }

    this.getReorderBtn = function () {
        return completedOrderModel.reOrderBtnObj;
    }

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
        // cartView.setCartCounterLabel(cartModel.cartQty);
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
            for(let itemName in itemListModel){
                const item = itemListModel[itemName];
                if(item.category === newCategory){
                    listToDisplay[itemName] = item;
                }
            }
        }
        categoryModel.categoryLive = newCategory;
        return listToDisplay;

    }

    this.getcategoryLive = function () {
        return categoryModel.categoryLive;
    }

    this.getPendingOrders = function (){
        return this.filterOrderList(pendingOrderModel.status);
    }

    this.getCompletedOrders = function (){
        return this.filterOrderList(completedOrderModel.status);
    }

    this.filterOrderList = function (status) {
        return orderModel.orderList.filter( (order) => {
            if(order) return order.status === status;
        })
    }

    this.onPlaceOrder = function () {
        for(let itemName in cartModel.cartItemsList){
            cartModel.cartItemsList[itemName] ={ qty: this.getCartItemQty(itemName), name: itemName};
        }
        this.addToOrderList(cartModel.cartItemsList);
        this.clearCart();
        document.location.href="#";
    };

    this.getCartItemQty = function(itemName) {
        return document.getElementById(`qty-${itemName}`).value;
    }

    this.reorder = function (orderId) {
        const itemList = orderModel.orderList[orderId].items;
        this.addToOrderList(itemList);
    }

    this.clearCart = function () {
        Object.keys(cartModel.cartItemsList).forEach((item) => {
            delete cartModel.cartItemsList[item];
        })
        // this.updateCartCounter(0);

    };

    this.deleteCartItem = function (itemName) {
        // const cartItemNode =  this.getCartItemNode(itemName);
        if(itemName in cartModel.cartItemsList) delete cartModel.cartItemsList[itemName];
        return cartModel.cartItemsList;
        // cartView.cartListNode.removeChild(cartItemNode);
        // this.updateCartCounter(cartModel.cartQty-1);
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
        // const nodeToDel = this.getPendingOrderNode(orderId);
        // orderListView.pendingListNode.removeChild(nodeToDel);
    }

    this.onAddToCart = function (itemName) {
        const cartItem = { qty: 1, name: itemName};
        if(!cartModel.cartItemsList[itemName]){
            cartModel.cartItemsList[itemName] = cartItem;
        }
        return cartItem;
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
        // orderListView.addNewOrder(order, orderListView.pendingListNode , pendingOrderModel.deleteBtnObj, this.deletePendingOrder);
        this.writeToLocal();
    };

    this.onOrderNow = function (itemName) {
        const quickCart = {};
        quickCart[itemName] = {
            qty: 1, name: itemName
        }
        console.log(this);
        this.addToOrderList(quickCart);
    };
}

const controller = new ControllerC();
controller.init();
export default controller;