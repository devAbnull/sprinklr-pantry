import React, {Fragment, Component} from "react";
// import ReactDOM from "react-dom";
import * as _ from "lodash";

import ItemList from "./itemlist";
import CategoryList from "./categorylist";
import OrderList from "./orderlist";
import Cart from "./cart";

//
// const ItemListViewC = function () {
//     // this.init = function () {
//     this.itemsListNode = document.getElementById("item-list");
//
//     this.showItemsList = function (listToDisplay) {
//         const fragment = document.createDocumentFragment();
//         ReactDOM.render(<ItemList list={listToDisplay} />,this.itemsListNode);
//     //     Object.keys(listToDisplay).forEach( (itemName)=>{
//     //         const item = listToDisplay[itemName];
//     //     const itemNode = document.createElement("li");
//     //
//     //     itemNode.setAttribute("id", item["name"]);
//     //     itemNode.setAttribute("class", "item-card")
//     //
//     //     itemNode.innerHTML = `
//     //         <div class="item-img-block">
//     //             <img class="item-img" alt="no image to dislpay" src="./images/${item.img}" />
//     //             <div class="overlay-img">
//     //                 <div class="add-cart">
//     //                     <button class="add-cart-icon add-to-cart-node">
//     //                         <div>Add to cart</div>
//     //                     </button>
//     //                     <button class="add-cart-icon quick-order-btn">
//     //                         <div>Order Now</div>
//     //                     </button>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //         <div class="item-content">
//     //             <div class="item-title">
//     //                 ${item.name}
//     //             </div>
//     //             <div class="item-category">
//     //                 ${item.category}
//     //             </div>
//     //         </div>`
//     //
//     //     const quickOrderNode = itemNode.getElementsByClassName("quick-order-btn")[0];
//     //     const addToCartNode = itemNode.getElementsByClassName("add-to-cart-node")[0];
//     //
//     //     quickOrderNode.addEventListener("click", () => {
//     //         controller.onOrderNow(itemName);
//     // })
//     //
//     //     addToCartNode.addEventListener("click", () => {
//     //         controller.onAddToCart(itemName);
//     // })
//     //     fragment.appendChild(itemNode);
//     // })
//     //
//     //     this.itemsListNode.appendChild(fragment);
//     }
//
// }
//
// const OrderListViewC = function () {
//     this.pendingListNode = document.getElementById("pending-order-list");
//     this.completedListNode = document.getElementById("order-completed-list");
//
//     this.showOrderList = function (listToShow, buttonObj, cb, parentNode) {
//     //     const fragment = document.createDocumentFragment();
//     //     listToShow.forEach( (order) => {
//     //         this.addNewOrder(order, fragment, buttonObj, cb)
//     // })
//     //     parentNode.appendChild(fragment);
//         ReactDOM.render(
//             <OrderList
//                 orderList = {listToShow}
//                 btnLabel = {buttonObj.label}
//                 btnClass = {buttonObj.className}
//                 cb = {cb}
//             />,
//             parentNode);
//     }
//
//     // this.addNewOrder = function (order, parentNode, buttonObj, cb){
//     //     const orderNode = document.createElement("li");
//     //     const itemsInOrder = order.items;
//     //     const items = Object.keys(itemsInOrder);
//     //     const date = new Date(order.timestamp)
//     //     orderNode.setAttribute("id",`pend-order${order.orderid}`);
//     //     orderNode.setAttribute("class", "item-pend-card");
//     //
//     //     orderNode.innerHTML = `
//     //          <div class="pend-content">
//     //             <ul class="items">
//     //                 ${items.map(itemName => {
//     //         return `<li class="item-name"><div class="item-name-only">${itemName}</div><span class="item-qty"> ${itemsInOrder[itemName].qty}</span></li>`
//     //     }).join("")}
//     //             </ul>
//     //          </div>
//     //          <div class="time-remove">
//     //             ${date.getHours() +":"+ date.getMinutes()}
//     //             <button class="order-list-btn ${buttonObj.className}">${buttonObj.label}</button>
//     //          </div>`
//     //
//     //     const btnNode = orderNode.getElementsByClassName("order-list-btn")[0];
//     //     btnNode.addEventListener("click", () => {
//     //         cb.call(controller, order.orderid);
//     // });
//     //
//     //     parentNode.appendChild(orderNode);
//     // }
// }
//
// const CartViewClass = function () {
//     this.cartListNode = document.getElementById("order-list");
//     const placeOrderBtn = document.getElementsByClassName("place-order-btn")[0];
//     // placeOrderBtn.addEventListener("click", () => controller.onPlaceOrder());
//     // this.getItemQtyLabel = function (itemName) {
//     //     return `qty-${itemName}`;
//     // }
//     //
//     // this.getCartItemQty = function (itemName){
//     //     return document.getElementById(`qty-${itemName}`).value;
//     // };
//     //
//     // this.setCartCounterLabel = function (newValue) {
//     //     document.getElementById("cart-qty").innerText = newValue;
//     // }
//     //
//     // this.addNewCartItem = function (cartItem) {
//     //     const item = controller.getItem(cartItem.name);
//     //     const itemNode = document.createElement("li");
//     //
//     //     itemNode.setAttribute("id",`cart-${item.name}`);
//     //     itemNode.setAttribute("class","cart-item");
//     //     itemNode.innerHTML = `
//     //         <img class="cart-item-img" src="./images/${item["img"]}"/>
//     //             <span class="cart-item-title">${item["name"]}</span>
//     //             <span class="order-qty">
//     //                         <label class="qty-label">Qty:</label>
//     //
//     //                         <input type="number" min="0" class="qty-number" id=${this.getItemQtyLabel(cartItem.name)} value=${cartItem.qty} >
//     //
//     //                     </span>
//     //             <button class="delete-cart-item pend-btns">
//     //                 <i class="fa fa-trash" aria-hidden="true"></i>
//     //             </button>`
//     //
//     //     const deleteBtn = itemNode.getElementsByClassName("delete-cart-item")[0];
//     //     deleteBtn.addEventListener("click", () => {
//     //         controller.deleteCartItem(item.name)
//     // })
//     //     this.cartListNode.appendChild(itemNode);
//     // }
// }
//
// const CategoryViewClass = function () {
//     this.categoryListNode = document.getElementById("categories-list");
//     const fragment = document.createDocumentFragment();
//
//     this.showCategories = function (categorylist) {
//         ReactDOM.render(
//             <CategoryList
//                 categoryList={categorylist}
//                 onCategoryChange = {controller.onCategoryChange}
//                 categoryLive = {controller.getcategoryLive()}
//             />,
//             this.categoryListNode
//             )
//     //     categorylist.forEach((category) => {
//     //         const categoryNode = document.createElement("li");
//     //     const state = (category === categoryModel.categoryLive)?"select":"unselect";
//     //
//     //     categoryNode.setAttribute("id",category);
//     //     categoryNode.setAttribute("class", `category-blck ${state}`);
//     //     categoryNode.innerHTML = `<a>${category}</a>`;
//     //
//     //     categoryNode.addEventListener("click", () => {
//     //         controller.onCategoryChange(category);
//     // })
//     //     fragment.appendChild(categoryNode);
//     // })
//     //     this.categoryListNode.appendChild(fragment);
//     }
// }


class App extends Component {
    constructor(props){
        super(props);
        this.onAddToCart = this.onAddToCart.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onOrderNow = this.onOrderNow.bind(this);
        this.state = {
            cartqty: 0,
            cartItemsList: [],
            categoryLive: this.props.getcategoryLive(),
            listToShow: this.props.itemList
        }
        // debugger
    }

    onAddToCart(itemName) {
        const cartitem = this.props.onAddToCart(itemName);
        this.setState((prevState => {
            const newCartList = prevState.cartItemsList.slice();
            newCartList.push(cartitem);
            return {
                cartqty: prevState.cartqty +1,
                cartItemsList: newCartList
            }

        }))
    }

    onCategoryChange(newCategory) {
        this.setState({
            categoryLive: newCategory
        })
    }

    onDeleteItemCart(itemName) {
        const newCartList = this.props.deleteCartItem(itemName);
        this.setState(prevState => {
            return {
                cartqty: prevState.cartqty -1,
                cartItemsList: newCartList
            }
        })
    }

    onPlaceOrder() {
        this.props.onPlaceOrder();
        this.setState(
            {cartqty: 0, cartItemsList: []}
        )
    }

    onOrderNow(itemName) {
        this.props.onOrderNow(itemName)
    }

    render(){
        return (
            <Fragment>
            <header>
                <div class="main-header"><img className="logo" alt="no image to dislpay" src="https://media.glassdoor.com/sqll/427532/sprinklr-squarelogo-1461344438537.png" />
                    Sprinklr Pantry
                    <a class="user-name" href="#profile-popup">Hi, Abhijit</a>
                </div>
                <nav class="categories-nav">
                    <ul id="categories-list">
                        <CategoryList
                            categoryList={this.props.getCategories()}
                            onCategoryChange = {this.onCategoryChange}
                            categoryLive = {this.state.categoryLive}
                        />
                    </ul>
                    <a class="btn cart-icon show-cart" href="#cart-popup">
                        <i class="fa fa-shopping-cart show-cart-icon" aria-hidden="true"></i><label class="cart-label">Cart({this.state.cartqty})</label>
                    </a>
                </nav>

            </header>
            <main class="content">
                <section class="left-section">
                    <ItemList
                        onOrderNow={this.onOrderNow}
                        onAddToCart={this.onAddToCart}
                        categoryLive = {this.state.categoryLive}
                    />
                </section>
                <section class="right-section">
                    <div class="pending-order-list-blck">
                        <h2>Pending</h2>
                        <ul id="pending-order-list" class="item-list">
                            <OrderList
                                orderList={this.props.pendingOrderList}
                                btnLabel = {this.props.getDeletebtn().label}
                                btnClass = {this.props.getDeletebtn().className}
                                cb = {this.props.deletePendingOrder}
                            />
                        </ul>
                    </div>
                    <div class="order-completed-list-blck">
                    <h2>Order History</h2>
                    <ul id="order-completed-list">
                        <OrderList
                            orderList={this.props.completedOrderList}
                            btnLabel = {this.props.getReorderBtn().label}
                            btnClass = {this.props.getReorderBtn().className}
                            cb = {this.props.reorder}
                        />
                    </ul>
                    </div>
                </section>
            </main>
        <div id="cart-popup" class="overlay">
            <Cart
                cartItemList={this.state.cartItemsList}
                deleteCartItem = {this.onDeleteItemCart}
                getItem={this.props.getItem}
                onPlaceOrder = {this.props.onPlaceOrder}
            />
        </div>
        <div id="profile-popup" class="overlay">
            <div class="popup user-details-update">
                <a class="close" href="#">&times;</a>
                <h3 class="profile-heading">Profile</h3>
                <img class="usr-img" src="https://thumb9.shutterstock.com/display_pic_with_logo/2696557/477419116/stock-vector-user-line-icon-on-black-background-477419116.jpg" />
                <table>
                <tr class="update-name-blck">
                <td>Name</td>
                <td><input type="text" value="Abhijit" className="user-name-txt"/></td>
                </tr>
                <tr class="update-table-blck">
                    <td>Table</td>
                    <td><input type="number" value="9" className="user-name-table" /></td>
                </tr>
                </table>
                <button class="order-list-btn save-btn">Save</button>
                <button class="order-list-btn cancel-btn">Cancel</button>
            </div>
            <button class="order-list-btn reorder-btn">Reorder</button>
        </div>
            </Fragment>
        )
    }

}

export default App;
// itemListView.init();
// var categoryView = new CategoryViewClass();
// var cartView = new CartViewClass();
// var itemListView = new ItemListViewC();
// var orderListView = new OrderListViewC();
// var controller = new ControllerC();
// controller.init();
