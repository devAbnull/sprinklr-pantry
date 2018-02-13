import React, { Component, Fragment } from "react";
import * as _ from "lodash";

const CartItem = (props) => {
    const item = props.getItem(props.name);

    const getCartLabel = function(itemName) {
        return `cart-${itemName}`;
    }


    const getItemQtyLabel = function(itemName) {
        return `qty-${itemName}`;
    }

    return
    (<li id={getCartLabel(item.name)} className="cart-item" >
            <img className="cart-item-img" src={`./images/${item["img"]}`}/>
            <span className="cart-item-title">{item["name"]}</span>
            <span className="order-qty">
                <label className="qty-label">Qty:</label>
                <input type="number" min="0" className="qty-number" id={getItemQtyLabel(item.name)} value={props.qty} />
            </span>
            <button className="delete-cart-item pend-btns" onClick={()=>props.deleteCartItem(item.name)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
        </li>)

}

const CartList = (props) => {
    return (
        _.map(props.cartItemList, (cartItem) => {
            <CartItem
                key = {`cart-${cartItem.name}`}
                name = {cartItem.name}
                getItem={props.getItem}
                qty = {cartItem.qty}
                deleteCartItem = {props.deleteCartItem}
            />
        })
    )

}

const Cart = (props) => {
    return (
        <div class="popup">
            <a class="close" href="#">&times;</a>
            <div class="popup-content">
                <h3>Order summary</h3>
                <ul id="order-list">
                    <CartList
                        cartItemList={props.cartItemsList}
                        deleteCartItem = {props.onDeleteItemCart}
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