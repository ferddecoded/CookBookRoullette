import React from "react";

const RecipePage = (props) => {
    {console.log(props)}
    return (
        <div>
            <div className="mainRecipe">
                <h2>{props.data.name}</h2>

                <div className="mainRecipeDisplay">
                    <aside>
                       <img src={props.data.img} alt=""/>
                    </aside>
    
                    <ul className="ingredientList">
                        {props.data.ingredients.map((ingredient, i) => {
                            return(
                                <li className="" key={i}>{ingredient.name} <button onClick={() => props.toggleCompleted(props.data.key, i)}><i className="fa fa-times"></i></button></li>
                            )
                        })}
                    </ul>
                </div>

            </div>
            </div>
    )
}

export default RecipePage;