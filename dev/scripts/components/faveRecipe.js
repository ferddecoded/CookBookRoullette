import React from "react";
import RecipePage from "./recipePage.js";

const FaveRecipe = (props) => {
    console.log(props.data)
    return (
      <div className="faveContainer">
        <h2>{props.data.name}</h2>
        <div className="imageHolder"><img src={props.data.img} alt=""/></div>
        <div><button onClick={() => <RecipePage data={props.data} />}>View Recipe</button></div>
        <div><button onClick={() => props.removeRecipe(props.data)}>Delete Recipe</button></div>
      </div>
    )
  }


export default FaveRecipe;