import React, { Component, Fragment } from "react";
import * as _ from "lodash";

const getCartLabel = function(itemName) {
    return `cart-${itemName}`;
}


const getItemQtyLabel = function(itemName) {
    return `qty-${itemName}`;
}


const CartItem = (props) => {
    const item = props.getItem(props.name);
    debugger
    console.log("hey ther!!")

    return (<li id={getCartLabel(item.id)} className="cart-item" >
            <img className="cart-item-img" src={`./images/${item["img"]}`}/>
            <span className="cart-item-title">{item["name"]}</span>
            <span className="order-qty">
                <label className="qty-label">Qty:</label>
                <input type="number" min="0" className="qty-number" id={getItemQtyLabel(item.id)} value={props.qty} />
            </span>
            <button className="delete-cart-item pend-btns" onClick={()=>props.deleteCartItem(item.id)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
        </li>)

}

const CartList = (props) => {
    return (
        <Fragment>
            {_.map(
            props.cartItemList,
            (cartItem) =>
            {

            return (<CartItem
                key = {`cart-${cartItem.name}`}
                name = {cartItem.name}
                getItem={props.getItem}
                qty = {cartItem.qty}
                deleteCartItem = {props.deleteCartItem}
                />
            )
            }

        )}
        </Fragment>
    )

}

const Cart = (props) => {
    console.log(props.cartItemsList)
    return (
        <div class="popup">
            <a class="close" href="#">&times;</a>
            <div class="popup-content">
                <h3>Order summary</h3>
                <ul id="order-list">
                    <CartList
                        cartItemList={props.cartItemList}
                        deleteCartItem = {props.onDeleteItemCart}
                        getItem={props.getItem}
                    />
                </ul>
                <button class="add-new-item-btn" onClick={() =>document.location.href="#"}>Add new items</button>
                <button class="place-order-btn" onClick={props.onPlaceOrder}>
                    <div>Place Order</div>
                </button>
            </div>
        </div>
    )
}

export default Cart;