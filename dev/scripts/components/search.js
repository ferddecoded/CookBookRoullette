import React from "react";

const Search = () => {
    return (
      <div className="searchContainer">

      <section className="searchContainerHolder">
        <div className="searchCloseButton button">
          
        </div>

        <form action="" onSubmit={this.getRecipeCatalog} className="searchContainerForm">
          <label>
            What kind of recipes will you be looking for today?
            {/* give user select option to select the typ of cuisine they're interested that correlates with the recipes */}
            <select value={this.state.cuisine} onChange={this.cuisineChange}>
              <option value="american">american</option>
              <option value="chinese">chinese</option>
              <option value="japanese">japanese</option>
              <option value="mexican">mexican</option>
              <option value="barbecue">barbecue</option>
              <option value="indian">indian</option>
            </select>
          </label>
          <input type="submit" value="submit"/>
        </form>

        <div className="searchCloseButton button">
          <i className="fa fa-times"></i>
        </div>
      </section>

      <div className="searchContainerResults">
        {this.state.recipeCatalog.map((recipe) => {
          return (
            <RecipeCard data={recipe} key={recipe.id} recipeChange={this.recipeChange} addRecipe={this.addRecipe}/>
          )
        })}
      </div>

    </div>
    )
}

export default Search;