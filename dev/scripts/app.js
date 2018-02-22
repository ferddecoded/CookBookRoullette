import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

const apiURL = "https://api.yummly.com/v1/api/recipes";
const apiKey = "b59144f2a0892b6d83b52b82c11e91f5";
const apiID = "64714897";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cuisine: '',
      recipes: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.getRecipes = this.getRecipes.bind(this);
  }

  handleChange(e) {
    console.log("handling the change");
    
    console.log(e.target.value)
    
    this.setState({
      cuisine: e.target.value
    })
  }


  getRecipes(e) {
    e.preventDefault();
    axios.get(apiURL, {
      params: {
        _app_id: "3a0b16d3",
        _app_key: 'faa48eb9d0f5e7c9d642a58e0147bc85',
        format: 'json',
        'allowedCuisine[]': `cuisine^cuisine-${this.state.cuisine}`
  
      }
    })
    .then((res) => {
      console.log(res);
        const recipeData = res.data.matches;
    })
  }




  componentDidMount() {
  }

  //where we grab user input
  render() {
    return (
      <div>
        <form action="" onSubmit={this.getRecipes}>
          <label>
            What kind of recipes will you be looking for today?
            {/* give user selecvt option to select the typ of cuisine they're interested that correlates with the recipes */}
            <select value={this.state.cuisine} onChange={this.handleChange}>
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
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
