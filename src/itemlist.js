import React, { PureComponent, Component, Fragment } from "react";
import * as _ from "lodash";
import MODEL from "./helper";

const Item = (props) => {
    // debugger
    return (
        <li className="item-card" id={props.name}>
            <div className="item-img-block">
                <img className="item-img" alt="no image to dislpay" src={`./images/${props.img}`} />
                <div className="overlay-img">
                <div className="add-cart">
                    <button className="add-cart-icon add-to-cart-node" onClick={() => props.onAddToCart(props.id)}>
                        <div>Add to cart</div>
                    </button>
                    <button className="add-cart-icon quick-order-btn" onClick={() => props.onOrderNow(props.id)}>
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

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {status: "loading"};
    }

    componentWillReceiveProps(newProps){
        if(newProps.categoryLive !== this.props.categoryLive){
            this.setState({status:"loading"})
            this.fetchListToShow(newProps.categoryLive);
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.status !== nextState.status;
    }

    filterList(newCategory){
        let listToDisplay = {};
        let itemListModel =  MODEL.itemListModel;
        console.log(newCategory)
        if(newCategory === MODEL.CATEGORY_TYPES.ALL){
            console.log("all")
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
        return listToDisplay;
    }

    fetchListToShow = () => {
        // this.setState({status})
        const p = new Promise(
            (res) => setTimeout(
                ()=>{
                    const listToDisplay = this.filterList(this.props.categoryLive);
                    // console.log("loll",listToDisplay);
                    res(listToDisplay)
                }
                ,1000 + Math.random()*1000
            )
        )
            .then(this.fetchCalllback)
    }

    fetchCalllback = (list) => {
        console.log("resolved",list);
        // listToShow(res, this.props.);
        const itemsArr = _.mapValues(list, (item) => item);
        this.setState({
            status:"completed",
            listToDisplay : itemsArr
        })

    }

    componentDidMount(){
        this.fetchListToShow(this.state.categoryLive);
    }

    render() {
        const props = this.props;

        return (
            <Fragment>
                {this.state.status==="loading"
                    ? <div>Loading</div>
                    :
                <ul id={"item-list"}>
                    {_.map(
                    this.state.listToDisplay,
                    (item) => {
                        return (
                            <Item
                                {...item}
                                key={item.id}
                                onOrderNow={props.onOrderNow}
                                onAddToCart={props.onAddToCart}
                            />)
                    })}
                </ul>}
            </Fragment>
        )
    }
}

export default ItemList;