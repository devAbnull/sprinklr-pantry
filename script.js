const listItems = {
    "tea" : {
        "name": "tea",
        "category": "beverages",
        "img": "tea.jpg"
    },
    "coffee" : {
        "name": "coffee",
        "category": "beverages",
        "img": "coffee.jpg"
    },
    "eggs" : {
        "name": "eggs",
        "category": "snacks",
        "img": "eggs.jpg"
    },
    "mangojuice" : {
        "name": "mango juice",
        "category": "drinks",
        "img": "mangojuice.jpg"
    },
    "mango" : {
        "name": "mango",
        "category": "fruits",
        "img": "mango.jpg"
    },
    "orangejuice" : {
        "name": "orange juice",
        "category": "drinks",
        "img": "orangejuice.png"
    },
    "greentea" : {
        "name": "green tea",
        "category": "beverages",
        "img": "greentea.jpg"
    },
    "maggi": {
        "name": "maggi",
        "category": "snakcs",
        "img": "maggi.jpg"
    },
    "grapes": {
        "name": "grapes",
        "category" : "fruits",
        "img": "grapes.jpg"
    },
    "goodday" : {
        "name": "good day",
        "category" : "biscuits",
        "img": "goodday.jpg"
    },
    "blackcoffee" : {
        "name": "black coffee",
        "category": "beverages",
        "img": "blackcoffee.jpg"
    }

};

const categories = [ "all", "beverages", "fruits", "snacks", "drinks" ];

let itemsListNode = null;
let cartListNode = null;
let pendingListNode = null;
let orderListNode =  null;
let categoryListNode = null;

let cartItemsList = {};
let pendingOrderList = [];
let orderList = {};

let orderNo = 0;
let cartQty=0;
let date = null;
let categoryLive = "all";
let userDetails = {
    "name" : "Abhijit",
    "tableNo": 9
}

// function onLoadFunction() {
itemsListNode = document.getElementById("item-list");
cartListNode = document.getElementById("order-list");
pendingListNode = document.getElementById("pending-order-list");
categoryListNode = document.getElementById("categories-list");
showItemsList(listItems);
showPendingOrders();
showCategories();
setInterval(showPendingOrders, 1000)
// }

function onLoadAdmin() {
    orderListNode = document.getElementById("admin-order-list");
    setInterval(showOrders, 1000)
    showOrders();
}

function getOrderFromLocal() {
    const storedList = localStorage.getItem("orderList");
    const listOfStr = !!(storedList) ? JSON.parse(storedList) : {};

    orderList= {}
    Object.keys(listOfStr).forEach( (orderId) => {
        orderList[orderId] = JSON.parse(listOfStr[orderId]);
    })
    orderNo = localStorage.getItem("orderNo");
}

function writeToLocal() {
    let dataToStore = {};
    Object.keys(orderList).forEach( (orderId) => {
            let order = orderList[orderId];
            dataToStore[orderId] = JSON.stringify(order);
    } )
    localStorage.setItem("orderList", JSON.stringify(dataToStore));
    localStorage.setItem("orderNo",orderNo);
}

function showCategories() {
    categories.forEach((category) => {
        const categoryNode = document.createElement("li");

        categoryNode.setAttribute("id",category);
        const state = (category === categoryLive)?"select":"unselect";
        categoryNode.setAttribute("class", `category-blck ${state}`);
        categoryNode.setAttribute("accesskey", category);
        categoryNode.innerHTML = `<a accesskey=${category}>${category}</a>`;
        categoryNode.onclick = categoryChanged;
        categoryListNode.appendChild(categoryNode);
    })
}

function showItemsList(listToShow) {
    Object.keys(listToShow).forEach((itemName) => {
        const item = listToShow[itemName];
        const itemNode = document.createElement("li");

        itemNode.setAttribute("id", item["name"]);
        itemNode.setAttribute("class", "item-card")

        itemNode.innerHTML = `
        <div class="item-img-block">
            <img class="item-img" alt="no image to dislpay" src="./images/${item.img}" />
            <div class="overlay-img">
                <div class="add-cart">
                    <button class="add-cart-icon" onclick=addToCart("${itemName}") >
                        <div>Add to cart</div>
                    </button>
                    <button class="add-cart-icon" onclick=quickOrder("${itemName}")>
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
        itemsListNode.appendChild(itemNode)

    })
}

function showOrders() {
    let sortedOrder = {};

    getOrderFromLocal();
    sortedOrder = orderList;

    // let sortedOrder = orderList.sort(function (order1, order2) { return order1.timestamp > order2.timestamp })

    Object.keys(sortedOrder).forEach((orderId) => {
        let statusSel;
        let order = orderList[orderId];
        let chkOrderId = 0;
        // console.log(orderList.length);
        // orderList.map( (order)=>{
        //     console.log("checkorderid",chkOrderId);
        //     if(chkOrderId !== order.orderid && chkOrderId<orderList.length){
        //         const orderDel = document.getElementById(`order-${order.orderid}`);
        //         console.log("missing order",order.orderid);
        //         if(orderDel) orderListNode.removeChild(orderDel);
        //     }
        //
        //     chkOrderId++;
        // } )
        const chkOrder = document.getElementById(`order-${order.orderid}`);
        if(!!chkOrder) return;


        const itemsInOrder = order.items;
        const items = Object.keys(itemsInOrder);
        const orderNode = document.createElement("li");
        const complSel = (order.status == "pending")? "selected" : "";
        const pendSel = (order.status == "completed")? "selected" : "";
        const rejSel = (order.status == "rejected")?"selected":"";
        date = new Date(order.timestamp)

        orderNode.setAttribute("class", `order ${order.status}`);
        orderNode.setAttribute("id", `order-${order.orderid}`);
        orderNode.innerHTML = `
        <div class="usr-block">
            <div class="user-details">
                <label class="username">${order.user.name}</label>
                <label class="user-table">Table: ${order.user.tableNo}</label>
            </div>
            <img class="usr-img" alt="no image to dislpay" src="https://thumb9.shutterstock.com/display_pic_with_logo/2696557/477419116/stock-vector-user-line-icon-on-black-background-477419116.jpg" />
        </div>
        <div class="order-details">
            <ul class="order-items"><label class="order-label">Order:</label>
            ${items.map(
                itemName => {
                    console.log(itemName)
                    return `<li class="item-detail"><label class="item-name">${listItems[itemName].name}</label><label class="item-qty">${itemsInOrder[itemName].qty}</label></li>`
            }).join("")}
            </ul>
            <div class="order-time-status"><div class="order-time">${date.getHours() +":"+ date.getMinutes()}</div>
                <select class="order-status" id="status-sel-${order.orderid}" onchange={selectionChanged(${order.orderid})}>
                    <option value="pending" ${pendSel}>Pending</option>
                    <option value="completed" ${complSel}>Completed</option>
                    <option value="rejected" ${rejSel}>Rejected</option>
                </select>
            </div>
        </div>`

        orderListNode.appendChild(orderNode)
    })
}

function getPendOrderClass(orderid){
    return `pend-order${orderid}`
}

function showPendingOrders() {
    getOrderFromLocal();
    debugger
    if(!orderList) return;
    // debugger
    pendingOrderList = {};
    Object.keys(orderList).forEach((orderId) => {
        let order = orderList[orderId];
        if(order.status === "pending")
            pendingOrderList[orderId] = order;
        else if(order.status === "completed"){
            // debugger;
            removeNode = document.getElementById(getPendOrderClass(order.orderid));
            if(removeNode)
                pendingListNode.removeChild(removeNode);
        }

    })

    Object.keys(pendingOrderList).forEach((orderId) => {
        let order = pendingOrderList[orderId];
        updatePendingOrder(order);
    })


}

function updatePendingOrder(order) {
    const orderNode = document.createElement("li");
    const itemsInOrder = order.items;
    const items = Object.keys(itemsInOrder);
    date = new Date(order.timestamp)

    console.log(itemsInOrder[1])
    if(document.getElementById(getPendOrderClass(order.orderid))) return;

    orderNode.setAttribute("id",`pend-order${order.orderid}`);
    orderNode.setAttribute("class", "item-pend-card");
    console.log(listItems[items[0]].name)

    nonZeroFlg = (items.length===1)? "non-zero-flg" :"";
    orderNode.innerHTML = `
         <div class="pend-content">
            <ul class="items">
                ${items.map(itemName => {
                return `<li class="item-name"><div class="item-name-only">${listItems[itemName].name}</div><span class="item-qty"> ${itemsInOrder[itemName].qty}</span></li>`
                }).join("")}
            </ul>
         </div>
         <div class="time-remove">
            ${date.getHours() +":"+ date.getMinutes()}
            <button class="order-list-btn delete-btn" onclick={deletePendingOrder(${order.orderid})}>Delete</button>
         </div>`

    pendingListNode.appendChild(orderNode);
}

//
//
// function updateCompletedOrder(order) {
//     const orderNode = document.createElement("li");
//     const itemsInOrder = order.items;
//     const items = Object.keys(itemsInOrder);
//     date = new Date(order.timestamp)
//
//     console.log(itemsInOrder[1])
//     orderNode.setAttribute("id",`pend-order${order.orderid}`);
//     orderNode.setAttribute("class", "item-pend-card");
//     console.log(listItems[items[0]].name)
//
//     nonZeroFlg = (items.length===1)? "non-zero-flg" :"";
//     orderNode.innerHTML = `
//          <div class="pend-content">
//             <ul class="items">
//                 ${items.map(itemName => {
//         return `<li class="item-name">${listItems[itemName].name}<span class="item-qty"> ${itemsInOrder[itemName].qty}</span></li>`
//     }).join("")}
//             </ul>
//          </div>
//          <div class="time-remove">
//             ${date.getHours() +":"+ date.getMinutes()}
//             <button class="order-list-btn reorder-btn" onclick={reOrder(${order.orderid})}>Reorder</button>
//          </div>`
//
//     if (completeListNode.childElementCount === 0)
//         completeListNode.appendChild(orderNode) ;
//     else
//         completeListNode.insertBefore(orderNode, pendingListNode.childNodes[0]);
// }



function addToCart(itemName) {
    if(!cartItemsList[itemName]){
        const item = listItems[itemName];
        // console.log(item)
        cartItem = { qty: 1, name: itemName};
        cartItemsList[itemName] = cartItem;
        const itemNode = document.createElement("li");
        itemNode.setAttribute("id",`cart-${itemName}`);
        itemNode.setAttribute("class","cart-item");
        itemNode.innerHTML = `
            <img class="cart-item-img" src="./images/${item["img"]}"/>
                <span class="cart-item-title">${item["name"]}</span>
                <span class="order-qty">
                            <label class="qty-label">Qty:</label>
                            
                            <input type="number" min="0" class="qty-number" id="qty-${itemName}" value=${cartItem.qty} >
                            
                        </span>
                <button class="delete-cart-item pend-btns" onclick={deleteCartItem("${itemName}")}>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>`
        cartListNode.appendChild(itemNode);
        updateCounter();
    }

    else {
        alert("item already in cart!");
    }
}

function updateCounter(){
    document.getElementById("cart-qty").innerText = ++cartQty;
}

function addToOrderList(itemsToOrder) {
    if(!orderNo)orderNo= 2;
    const order = {
        orderid: orderNo,
        items: itemsToOrder,
        timestamp: Date.now(),
        status: "pending",
        user: userDetails
    }

    orderList[orderNo] = order;
    orderNo++;
    console.log("order",orderNo);
    location.href = "#";
    // debugger;
    updatePendingOrder(order);
    writeToLocal();
}

function quickOrder(itemName) {
    let quickCart = {};
    quickCart[itemName] = {
            qty: 1, name: itemName
        }
    addToOrderList(quickCart);
}

function onPlaceOrder() {
    Object.keys(cartItemsList).forEach((itemName) => {
        cartItemsList[itemName].qty = document.getElementById(`qty-${itemName}`).value;
        // console.log()
    })
    if(Object.keys(cartItemsList).length === 0)return;
    addToOrderList(cartItemsList);
    clearCart();
}

function clearCart() {
    cartItemsList = {};
    cartListNode.innerHTML="";
    cartQty=-1;
    updateCounter();
}

function deleteCartItem(itemName) {
    delete cartItemsList[itemName];
    console.log(cartItemsList);
    const nodeToDel = document.getElementById(`cart-${itemName}`);
    cartListNode.removeChild(nodeToDel)
    cartQty = cartQty -2;
    updateCounter();
}

function deletePendingOrder(orderid) {
    console.log(orderList)
    delete orderList[orderid];
    const nodeToDel = document.getElementById(`pend-order${orderid}`);
    pendingListNode.removeChild(nodeToDel)
    writeToLocal();
}

function categoryChanged(event) {
    const newCategory = event.target.accessKey;
    if(newCategory === categoryLive) return;

    const categoryToSelect  = document.getElementById(newCategory);
    const categoryToUnselect = document.getElementById(categoryLive);
    let listToShow = {};
    let filteredList = [];

    categoryToSelect.setAttribute("class", "category-blck select");
    categoryToUnselect.setAttribute("class", "category-blck unselect");
    categoryLive= newCategory;
    if(newCategory != "all") {
            filteredList = Object.keys(listItems).filter((item) => {
                return listItems[item].category === categoryLive;
        })

            filteredList.forEach((item) => {
                listToShow[item] = listItems[item];
        })
    }
    else{
        listToShow = listItems;
    }
    console.log(listToShow);
    itemsListNode.innerHTML = "";
    showItemsList(listToShow);
}

function selectionChanged(orderId) {
    const orderNode = document.getElementById(`order-${orderId}`);
    const selectionNode = document.getElementById(`status-sel-${orderId}`);
    const status = selectionNode.value;
    orderList[orderId].status = status;
    orderNode.setAttribute("class", `order ${status}`)
    writeToLocal();
}
