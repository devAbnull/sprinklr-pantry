const STATUS_TYPES = {
    COMPLETED: "completed",
    PENDING: "pending",
    REJECTED: "rejected"
}

const orderModel = {
    orderList : []
}

orderModel.getOrderListFromLocal = function () {
    const listFromLocal = JSON.parse(localStorage.getItem("orderList"));
    if(!listFromLocal) {
        orderModel.orderList = [];
        return;
    }
    orderModel.orderList = listFromLocal.map( (orderStr)=> JSON.parse(orderStr));
}

const ControllerC = function () {
    this.init = function () {
        orderModel.getOrderListFromLocal();
        ordersView.render(orderModel.orderList);
    };

    this.writeToLocal = function() {
        localStorage.setItem("orderNo",orderModel.orderNo);
        const listToWrite = orderModel.orderList.map( (order) =>  JSON.stringify(order) );
        localStorage.setItem("orderList",JSON.stringify(listToWrite));
    };

    this.getSelectionNode = function (orderId) {
        return document.getElementById(`status-sel-${orderId}`);
    }

    this.setOrderStatus = function(orderId, newStatus){
        orderModel.orderList[orderId].status = newStatus;
    }

    this.onSelectionChanged = function (orderId) {
        newStatus = this.getSelectionNode(orderId).value;
        this.setOrderStatus(orderId, newStatus);
        this.writeToLocal();
    }
}

const OrdersViewC = function () {
    this.orderListNode = document.getElementById("admin-order-list");
    this.getStatus = function (status) {
        const complSel = (status == "pending")? "selected" : "";
        const pendSel = (status == "completed")? "selected" : "";
        const rejSel = (status == "rejected")?"selected":"";
        return [complSel, pendSel, rejSel];
    }

    this.render = function (listItems) {
        const fragment = document.createDocumentFragment();
        listItems.forEach( (order)=> {
            if(!order) return;
            const chkOrder = document.getElementById(`order-${order.orderid}`);
            if(!!chkOrder) return;

            const itemsInOrder = order.items;
            const items = Object.keys(itemsInOrder);
            const orderNode = document.createElement("li");

            date = new Date(order.timestamp)
            let complSel, pendSel, rejSel;
            [pendSel, complSel, rejSel] = this.getStatus(order.status);

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
                return `<li class="item-detail"><label class="item-name">${itemName}</label><label class="item-qty">${itemsInOrder[itemName].qty}</label></li>`
                }).join("")}
                </ul>
                <div class="order-time-status"><div class="order-time">${date.getHours() +":"+ date.getMinutes()}</div>
                    <select class="order-status" id="status-sel-${order.orderid}">
                        <option value="pending" ${pendSel}>Pending</option>
                        <option value="completed" ${complSel}>Completed</option>
                        <option value="rejected" ${rejSel}>Rejected</option>
                    </select>
                </div>
            </div>`
            const statusNode = orderNode.getElementsByClassName("order-status")[0];
            statusNode.addEventListener("change", ()=>{
                console.log("hey hey!!");
                controller.onSelectionChanged(order.orderid)
            });
            fragment.appendChild(orderNode)
        })
        this.orderListNode.appendChild(fragment);
    }
}

var ordersView = new OrdersViewC();
var controller = new ControllerC();
controller.init();