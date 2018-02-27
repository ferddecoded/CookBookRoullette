import React from "react";
import RecipePage from "./recipePage.js";

const FaveRecipe = (props) => {
    console.log(props.data)
    return (
      <div className="faveContainer">
        <div className="faveContainerContent">
            <div className="headerContainer">
                <h3>{props.data.name}</h3>
            </div>
            <div className="imageHolder">
                <img src={props.data.img} alt=""/>
            </div>
        </div>
        <div className="faveButtonHolder">
            <button onClick={() => props.updateIndex(props.recipeIndex)}>View Recipe</button>
            <i onClick={() => props.removeRecipe(props.data)} className="fa fa-times"></i>
        </div>
      </div>
    )
  }


//create a function that puts recipe index into this.state.recipeIndex
//in app render, take this.state.recipes[this.state.recipeIndex]
//when rendering, account 

export default FaveRecipe;