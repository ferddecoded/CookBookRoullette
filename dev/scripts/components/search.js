import React from "react";

const Search = () => {
    return (
        <form action="" onSubmit={this.getRecipeCatalog} className="searchForm wrapper">
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
    )
}

export default Search;