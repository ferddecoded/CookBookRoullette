import React from "react";

const RecipePage = (props) => {
    {console.log(props)}
    return <div>
        <div className="mainRecipe">
          <h3>{props.data.name}</h3>

          <div className="mainRecipeHolder">
            <div className="mainRecipeDisplay">
              <div className="mainRecipeInfo">
                <aside className="left">
                  <div className="mainRecipeImg">
                    <img src={props.data.img} alt="" />
                  </div>
                </aside>
                <aside className="right">

                  <h4>
                    <span>Cook Time</span> {props.data.cookTime}
                  </h4>

                  <h4>
                    <span>Serving Size</span> {props.data.servingSize}
                  </h4>
                  <h4>
                    <span>Calories</span> {props.data.calories}
                  </h4>
                </aside>
              </div>
              <div className="bottom">
                <h5>
                  <span className="moreInfo">For Recipe Information</span> <a
                    href={props.data.url}
                  >
                    Jump to Recipe
                  </a>
                </h5>
              </div>
            </div>
            <div className="ingredientList">
              <ul>
                {props.data.ingredients.map((ingredient, i) => {
                  return <li className={ingredient.completed === true ? "completed" : null} key={i}>
                      <i className={ingredient.completed === true ? "fa fa-check-square-o" : "fa fa-square-o"} onClick={() => props.toggleCompleted(props.data.key, i)} />
                      <p> {ingredient.name}</p>
                    </li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>;
}

export default RecipePage;