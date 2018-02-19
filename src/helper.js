// import React, { Component, Fragment } from "react";
const CATEGORY_TYPES = {
    ALL: "all",
    BEVERAGES: "beverages",
    FRUITS: "fruits",
    SNACKS: "snacks",
    DRINKS: "drinks"
}

const categoryModel =  {
    categories : [CATEGORY_TYPES.ALL, CATEGORY_TYPES.BEVERAGES, CATEGORY_TYPES.DRINKS, CATEGORY_TYPES.FRUITS, CATEGORY_TYPES.SNACKS],
    categoryLive : CATEGORY_TYPES.ALL
}

const itemListModel =  {
    "tea" : {
        "id":"tea",
        "name": "tea",
        "category": CATEGORY_TYPES.BEVERAGES,
        "img": "tea.jpg"
    },
    "coffee" : {
        "id": "coffee",
        "name": "coffee",
        "category": CATEGORY_TYPES.BEVERAGES,
        "img": "coffee.jpg"
    },
    "eggs" : {
        "id": "eggs",
        "name": "eggs",
        "category": CATEGORY_TYPES.SNACKS,
        "img": "eggs.jpg"
    },
    "mangojuice" : {
        "id": "mangojuice",
        "name": "mango juice",
        "category": CATEGORY_TYPES.DRINKS,
        "img": "mangojuice.jpg"
    },
    "mango" : {
        "id":"mango",
        "name": "mango",
        "category": CATEGORY_TYPES.FRUITS,
        "img": "mango.jpg"
    },
    "orangejuice" : {
        "id": "oraangejuice",
        "name": "orange juice",
        "category": CATEGORY_TYPES.DRINKS,
        "img": "orangejuice.png"
    },
    "greentea" : {
        "id": "greentea",
        "name": "green tea",
        "category": CATEGORY_TYPES.BEVERAGES,
        "img": "greentea.jpg"
    },
    "maggi": {
        "id": "maggi",
        "name": "maggi",
        "category": CATEGORY_TYPES.SNACKS,
        "img": "maggi.jpg"
    },
    "grapes": {
        "id": "grapes",
        "name": "grapes",
        "category" : CATEGORY_TYPES.FRUITS,
        "img": "grapes.jpg"
    },
    "goodday" : {
        "id": "goodday",
        "name": "good day",
        "category" : CATEGORY_TYPES.SNACKS,
        "img": "goodday.jpg"
    },
    "blackcoffee" : {
        "id": "blackcoffee",
        "name": "black coffee",
        "category": CATEGORY_TYPES.BEVERAGES,
        "img": "blackcoffee.jpg"
    }
};
const MODEL = {
    CATEGORY_TYPES,
    categoryModel,
    itemListModel
}

export default MODEL;

