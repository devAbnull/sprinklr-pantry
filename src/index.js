import React, {Fragment, Component} from "react";
import ReactDOM from "react-dom";
import App from "./app";
import MODEL from "./helper";

// console.log(MODEL);
const CATEGORY_TYPES = MODEL.CATEGORY_TYPES;
const categoryModel = MODEL.categoryModel;
const itemListModel = MODEL.itemListModel;
// console.log("hey ther!!!")
//
// const CATEGORY_TYPES = {
//     ALL: "all",
//     BEVERAGES: "beverages",
//     FRUITS: "fruits",
//     SNACKS: "snacks",
//     DRINKS: "drinks"
// }
//
// const categoryModel =  {
//     categories : [CATEGORY_TYPES.ALL, CATEGORY_TYPES.BEVERAGES, CATEGORY_TYPES.DRINKS, CATEGORY_TYPES.FRUITS, CATEGORY_TYPES.SNACKS],
//     categoryLive : CATEGORY_TYPES.ALL
// }
//
// const itemListModel =  {
//     "tea" : {
//         "id":"tea",
//         "name": "tea",
//         "category": CATEGORY_TYPES.BEVERAGES,
//         "img": "tea.jpg"
//     },
//     "coffee" : {
//         "id": "coffee",
//         "name": "coffee",
//         "category": CATEGORY_TYPES.BEVERAGES,
//         "img": "coffee.jpg"
//     },
//     "eggs" : {
//         "id": "eggs",
//         "name": "eggs",
//         "category": CATEGORY_TYPES.SNACKS,
//         "img": "eggs.jpg"
//     },
//     "mangojuice" : {
//         "id": "mangojuice",
//         "name": "mango juice",
//         "category": CATEGORY_TYPES.DRINKS,
//         "img": "mangojuice.jpg"
//     },
//     "mango" : {
//         "id":"mango",
//         "name": "mango",
//         "category": CATEGORY_TYPES.FRUITS,
//         "img": "mango.jpg"
//     },
//     "orangejuice" : {
//         "id": "oraangejuice",
//         "name": "orange juice",
//         "category": CATEGORY_TYPES.DRINKS,
//         "img": "orangejuice.png"
//     },
//     "greentea" : {
//         "id": "greentea",
//         "name": "green tea",
//         "category": CATEGORY_TYPES.BEVERAGES,
//         "img": "greentea.jpg"
//     },
//     "maggi": {
//         "id": "maggi",
//         "name": "maggi",
//         "category": CATEGORY_TYPES.SNACKS,
//         "img": "maggi.jpg"
//     },
//     "grapes": {
//         "id": "grapes",
//         "name": "grapes",
//         "category" : CATEGORY_TYPES.FRUITS,
//         "img": "grapes.jpg"
//     },
//     "goodday" : {
//         "id": "goodday",
//         "name": "good day",
//         "category" : CATEGORY_TYPES.SNACKS,
//         "img": "goodday.jpg"
//     },
//     "blackcoffee" : {
//         "id": "blackcoffee",
//         "name": "black coffee",
//         "category": CATEGORY_TYPES.BEVERAGES,
//         "img": "blackcoffee.jpg"
//     }
// };

const orderModel = {
    orderList: [],
    orderNo: Number(localStorage.getItem("orderNo")) || 0 ,


    getOrderListFromLocal() {
        const listFromLocal = JSON.parse(localStorage.getItem("orderList"));
        if (!listFromLocal) {
            this.orderList = [];
            return;
        }
        this.orderList = listFromLocal.map((orderStr) => JSON.parse(orderStr));
    }
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


const ControllerC = function() {

}

ControllerC.prototype.init = function() {
    orderModel.getOrderListFromLocal();
    const completedOrderList = this.getCompletedOrders();
    const pendingOrderList = this.getPendingOrders();
    let x = document.getElementById('root');
    // debugger

    this.onPlaceOrder = this.onPlaceOrder.bind(this);
    this.getCartItemQty = this.getCartItemQty.bind(this);
    this.addToOrderList = this.addToOrderList.bind(this);
    this.onOrderNow = this.onOrderNow.bind(this);
    this.deletePendingOrder = this.deletePendingOrder.bind(this);

    ReactDOM.render(
        <App
            pendingOrderList = {pendingOrderList}
            completedOrderList={completedOrderList}
            getItem = {this.getItem}
            getcategoryLive={this.getcategoryLive}
            onAddToCart={this.onAddToCart}
            onCategoryChange={this.onCategoryChange}
            deleteCartItem={this.deleteCartItem}
            onPlaceOrder={this.onPlaceOrder}
            onOrderNow={this.onOrderNow}
            getCategories={this.getCategories}
            getDeletebtn={this.getDeletebtn}
            deletePendingOrder={this.deletePendingOrder}
            getReorderBtn={this.getReorderBtn}
            reorder={this.reorder}
        />,
        x);
    // categoryView.showCategories(categoryModel.categories);
    // itemListView.showItemsList(itemListModel);

    // orderListView.showOrderList(pendingOrderList, pendingOrderModel.deleteBtnObj, this.deletePendingOrder, orderListView.pendingListNode);
    // orderListView.showOrderList(completedOrderList, completedOrderModel.reOrderBtnObj, this.reorder, orderListView.completedListNode);

}

ControllerC.prototype.getItemList = function() {
    return itemListModel;
}

ControllerC.prototype.getCategories = function(){
    return categoryModel.categories;
}

ControllerC.prototype.getItemLists = function(){
    return itemListModel;
}

ControllerC.prototype.getDeletebtn = function() {
    return pendingOrderModel.deleteBtnObj
}

ControllerC.prototype.getReorderBtn = function() {
    return completedOrderModel.reOrderBtnObj;
}

ControllerC.prototype.pushToOrderList = function(order) {
    orderModel.orderList.push(order);
}

ControllerC.prototype.writeToLocal = function() {
    localStorage.setItem("orderNo",orderModel.orderNo);
    const listToWrite = orderModel.orderList.map( (order) =>  JSON.stringify(order) );
    localStorage.setItem("orderList",JSON.stringify(listToWrite));
}

ControllerC.prototype.updateCartList = function(cartItem) {
    cartModel.cartItemsList[cartItem.name] = cartItem.qty;
}

ControllerC.prototype.getItem = function(itemName) {
    return  itemListModel[itemName];
}

ControllerC.prototype.updateCartCounter = function(newValue) {
    cartModel.cartQty = newValue;
    // cartView.setCartCounterLabel(cartModel.cartQty);
}

ControllerC.prototype.updateOrderNo = function(newValue) {
    orderModel.orderNo = newValue;
}

ControllerC.prototype.getCartItemNode = function(itemName) {
    return document.getElementById(`cart-${itemName}`);
}

ControllerC.prototype.getPendingOrderNode = function(orderId) {
    return document.getElementById(`pend-order${orderId}`);
}

ControllerC.prototype.onCategoryChange = function(newCategory) {
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

ControllerC.prototype.getcategoryLive = function() {
    return categoryModel.categoryLive;
}

ControllerC.prototype.getPendingOrders = function(){
    return this.filterOrderList(pendingOrderModel.status);
}

ControllerC.prototype.getCompletedOrders = function(){
    return this.filterOrderList(completedOrderModel.status);
}

ControllerC.prototype.filterOrderList = function(status) {
    return orderModel.orderList.filter( (order) => {
        if(order) return order.status === status;
        return;
    })
}

ControllerC.prototype.onPlaceOrder = function() {
    debugger
    console.log(this);
    for(let itemName in cartModel.cartItemsList){
        cartModel.cartItemsList[itemName] ={ qty: this.getCartItemQty(itemName), name: itemName};
    }
    this.addToOrderList(cartModel.cartItemsList);
    this.clearCart();
    document.location.href="#";
}

    ControllerC.prototype.getCartItemQty = function(itemName) {
    return document.getElementById(`qty-${itemName}`).value;
}

ControllerC.prototype.reorder = function(orderId) {
    const itemList = orderModel.orderList[orderId].items;
    this.addToOrderList(itemList);
}

ControllerC.prototype.clearCart = function() {
    Object.keys(cartModel.cartItemsList).forEach((item) => {
        delete cartModel.cartItemsList[item];
    })
    // this.updateCartCounter(0);

}

ControllerC.prototype.deleteCartItem = function(itemName) {
    // const cartItemNode =  this.getCartItemNode(itemName);
    if(itemName in cartModel.cartItemsList) delete cartModel.cartItemsList[itemName];
    return cartModel.cartItemsList;
    // cartView.cartListNode.removeChild(cartItemNode);
    // this.updateCartCounter(cartModel.cartQty-1);
}

ControllerC.prototype.deleteOrder = function(orderId) {
    if(orderModel.orderList[orderId]){
        delete orderModel.orderList[orderId];
        console.log(orderModel.orderList);
    }

    this.writeToLocal();
}

ControllerC.prototype.deletePendingOrder = function(orderId) {
    this.deleteOrder(orderId);
    // const nodeToDel = this.getPendingOrderNode(orderId);
    // orderListView.pendingListNode.removeChild(nodeToDel);
}

ControllerC.prototype.onAddToCart = function(itemName) {
    const cartItem = { qty: 1, name: itemName};
    if(!cartModel.cartItemsList[itemName]){
        cartModel.cartItemsList[itemName] = cartItem;
    }
    return cartItem;
}

ControllerC.prototype.addToOrderList = function(itemsToOrder) {
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
}

ControllerC.prototype.onOrderNow = function(itemName) {
    const quickCart = {};
    quickCart[itemName] = {
        qty: 1, name: itemName
    }
    console.log(this);
    this.addToOrderList(quickCart);
}

const controller = new ControllerC();
ControllerC.constructor = ControllerC;
controller.init();
// export default controller;