import React, { Component, Fragment } from "react";
import * as _ from "lodash";

const CategoryList = (props) => {
    return (
        <Fragment>
            {_.map(props.categoryList, (category) => {
                const state = (category === props.categoryLive)?"select":"unselect";
                return (
                    <li key={category} id={category} className={`category-blck ${state}`} onClick={() => props.onCategoryChange(category)}>
                        <a>{category}</a>
                    </li>
                )
            })}
        </Fragment>
    )
}

export default CategoryList;