import React, { Component, Fragment } from "react";
import * as _ from "lodash";
const Item = (props) => {
    // debugger
    return (
        <li className="item-card" id={props.name}>
            <div className="item-img-block">
                <img className="item-img" alt="no image to dislpay" src={`./images/${props.img}`} />
                <div className="overlay-img">
                <div className="add-cart">
                    <button className="add-cart-icon add-to-cart-node" onClick={()=>props.onAddToCart(props.name)}>
                        <div>Add to cart</div>
                    </button>
                    <button className="add-cart-icon quick-order-btn" onClick={()=>props.onOrderNow(props.name)}>
                        <div>Order Now</div>
                    </button>
                </div>
                </div>
            </div>
                <div className="item-content">
                    <div className="item-title"> {props.name}</div>
                    <div className="item-category">{props.category}</div>
                </div>
        </li>
    )
}

const ItemList = (props) => {
    let itemsArr = _.mapValues(props.itemsList, (item) => item);
    return (
        <ul id={"item-list"}>
            {_.map(
            itemsArr,
            (item) => {
                return (
                    <Item
                        key={item.name}
                        name={item.name}
                        category={item.category}
                        img={item.img}
                        onOrderNow={props.onOrderNow}
                        onAddToCart={props.onAddToCart}
                    />)
            })}
        </ul>
    )
}

export default ItemList;