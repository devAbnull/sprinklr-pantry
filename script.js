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
let orderList = [];

let orderNo = 0;
let cartQty=0;
let date = null;
let categoryLive = "all";
let userDetails = {
    "name" : "Abhijit",
    "tableNo": 9
}

function onLoadFunction() {
    itemsListNode = document.getElementById("item-list");
    cartListNode = document.getElementById("order-list");
    pendingListNode = document.getElementById("pending-order-list");
    categoryListNode = document.getElementById("categories-list");
    showItemsList(listItems);
    showPendingOrders();
    showCategories();
}

function onLoadAdmin() {
    orderListNode = document.getElementById("admin-order-list");
    showOrders();
}

function showCategories() {
    categories.map((category) => {
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
    Object.keys(listToShow).map((itemName) => {
        // console.log(x)
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
    let sortedOrder = orderList.sort(function (order1, order2) { return order1.timestamp <= order2.timestamp })
    console.log(orderList)
    sortedOrder.map((order) => {
        const itemsInOrder = order.items;
        const items = Object.keys(itemsInOrder);
        const orderNode = document.createElement("li");

        orderNode.setAttribute("class", `order ${order.status}`);

        orderNode.innerHTML = `
        <div class="usr-block">
            <div class="user-details">
                <label class="username">${order.user.name}</label>
                <label class="user-table">${order.user.tableNo}</label>
            </div>
            <img class="usr-img" alt="no image to dislpay" src="https://thumb9.shutterstock.com/display_pic_with_logo/2696557/477419116/stock-vector-user-line-icon-on-black-background-477419116.jpg" />
        </div>
        <div class="order-details">
            <ul class="order-items"><label class="order-label">Order:</label>
            ${items.map(
                itemName => {
                    return `<li class="item-detail"><label class="item-name">${listItems[itemName].name}</label><label class="item-qty">${itemsInOrder[itemName].qty}</label></li>`
            })}
                <li class="item-detail"><label class="item-name">Coffee</label><label class="item-qty">1</label></li>
                <li class="item-detail"><label class="item-name">Good day</label><label class="item-qty">1</label></li>
            </ul>
            <div class="order-time-status"><div class="order-time">20:10</div>
                <select class="order-status">
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
        </div>`

        orderListNode.appendChild(orderNode)
    })
}

function showPendingOrders() {
    pendingOrderList = orderList.filter((order) => {
        return order.status === "pending";
    })

    pendingOrderList.map((order) => {
        updatePendingOrder(order);
    })
}

function updatePendingOrder(order) {
    const orderNode = document.createElement("li");
    const itemsInOrder = order.items;
    const items = Object.keys(itemsInOrder);
    date = new Date(order.timestamp)
    console.log(itemsInOrder[1])
    orderNode.setAttribute("id",`pend-order${order.orderid}`);
    orderNode.setAttribute("class", "item-pend-card");
    console.log(listItems[items[0]].name)

    nonZeroFlg = (items.length===1)? "non-zero-flg" :"";
    orderNode.innerHTML = `
         <div class="item-pend-heading">
            <div class="item-pend-title">${listItems[items[0]].name}<label class="plus-qty-label ${nonZeroFlg}"> +${items.length-1}</label></div>
            <div class="item-pend-time">${date.getHours() +":"+ date.getMinutes()}</div>
            <button class="delete-item pend-btns">
                <i class="fa fa-trash" aria-hidden="true" onclick={deletePendingOrder(${order.orderid})}></i>
            </button>
        </div>
        <div class="item-pend-content">
            <ul class="items">
                ${items.map(
        itemName => {
            return  `<li class="item-name">${listItems[itemName].name}<span class="item-qty">  ${itemsInOrder[itemName].qty}</span></li>`
        }
        )}
            </ul>
        </div>`

    if (pendingListNode.childElementCount === 0)
        pendingListNode.appendChild(orderNode) ;
    else
        pendingListNode.insertBefore(orderNode, pendingListNode.childNodes[0]);
}


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
    const order = {
        orderid: orderNo,
        items: itemsToOrder,
        timestamp: Date.now(),
        status: "pending",
        user: userDetails
    }
    orderList.push(order);
    orderNo++;
    location.href = "#";
    updatePendingOrder(order);
}

function quickOrder(itemName) {
    let quickCart = {};
    quickCart[itemName] = {
            qty: 1, name: itemName
        }
    addToOrderList(quickCart);
}

function addNewOrder() {
    Object.keys(cartItemsList).map((itemName) => {
        cartItemsList[itemName].qty = document.getElementById(`qty-${itemName}`).value;
        // console.log()
    })
    addToOrderList(cartItemsList);
    clearCart();
}

function clearCart() {
    cartItemsList = [];
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
    delete orderList[orderid];
    const nodeToDel = document.getElementById(`pend-order${orderid}`);
    pendingListNode.removeChild(nodeToDel)
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

            filteredList.map((item) => {
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
