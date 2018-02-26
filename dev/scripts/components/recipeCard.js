import React from "react";

const RecipeCard = (props) => {
  
    return (
      <div className="recipeContainer">
        <div className="recipeContainerContent">
          <div className="headerContainer">
            <h2>{props.data.name}</h2>
          </div>
          <div className="imageHolder">
            <img src={props.data.images[0].imageUrlsBySize["360"]} alt=""/>
          </div>
        </div>
        <div>
          <button onClick={() => props.addRecipe(props.data)}>Select Recipe</button>
        </div>
      </div>
    )
}

export default RecipeCard;