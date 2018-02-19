import React, { Component, Fragment } from "react";
import * as _ from "lodash";

const ItemList = (props) => {
   return (
       <Fragment>
       {
           _.map(props.itemsArr, (itemName)=> {
              return <li key={itemName} className="item-name"><div className="item-name-only">{itemName}</div><span className="item-qty"> {props.itemsInOrder[itemName].qty}</span></li>
           })
       }
       </Fragment>
   )
}

const Order = (props) => {
    const itemsInOrder = props.items;
    const itemsArr = Object.keys(itemsInOrder);
    const date = new Date(props.timestamp)
    // debugger
    return (
        <li id={`pend-order${props.orderid}`} className="item-pend-card">
            <div className="pend-content">
                <ul className="items">
                    <ItemList itemsArr={itemsArr} itemsInOrder={itemsInOrder} />
                </ul>
            </div>
            <div className="time-remove">
                {date.getHours() +":"+ date.getMinutes()}
                <button className={`order-list-btn ${props.btnClass}`} onClick={()=> props.cb(props.orderid) } >{props.btnLabel}</button>
            </div>
        </li>
    )
}

const OrderList  = (props) => {

    return (
        <Fragment>
        {
            _.map(props.orderList, (order) => {
                return (<Order
                    key={order.orderid}
                    items = {order.items}
                    orderid = {order.orderid}
                    btnLabel = {props.btnLabel}
                    btnClass = {props.btnClass}
                    timestamp = {order.timestamp}
                    cb = {props.cb}
                />)
            })
        }
        </Fragment>
    )
}

export default OrderList;