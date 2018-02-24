import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import RecipeCard from "./components/recipeCard.js";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB9vOpf-4iBA9xJr2NjdLXspIBnEK1C6U0",
  authDomain: "cookbook-roullette.firebaseapp.com",
  databaseURL: "https://cookbook-roullette.firebaseio.com",
  projectId: "cookbook-roullette",
  storageBucket: "cookbook-roullette.appspot.com",
  messagingSenderId: "643053793175"
};
firebase.initializeApp(config);



const apiURL = "https://api.yummly.com/v1/api/recipes";
const apiKey = "b59144f2a0892b6d83b52b82c11e91f5";
const apiID = "64714897";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cuisine: '',
      recipeCatalog: [],
      recipes: []
    }

    this.cuisineChange = this.cuisineChange.bind(this);
    this.getRecipeCatalog = this.getRecipeCatalog.bind(this);
    this.displayRecipeCatalog = this.displayRecipeCatalog.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }

  cuisineChange(e) {
    console.log(e.target.value)
    
    this.setState({
      cuisine: e.target.value
    })
  }

 addRecipe(value) {
   //we copy the array in order to change that value when it renders
  console.log(value);

  let recipeData = {
    name: value.name,
    cookTime: value.totalTime,
    ingredients: value.ingredientLines,
    servingSize: value.numberOfServings,
    url: value.attribution.url
  }
  
  console.log(recipeData)
  
  const recipeState = Array.from(this.state.recipes);
  
  //look 
  const duplicateRecipe = this.state.recipes.find((item) => recipeData.url === item.url);
  // const duplicateRecipe = this.state.recipes.find(function(item) {
  //   console.log(item);
  //   return recipeData.url === item.url;
  // })
  // console.log(duplicateRecipe === undefined);
  if (duplicateRecipe === undefined) {
    //then set state
    recipeState.push(recipeData);
    this.setState({
      recipes: recipeState
    })
    //update firebase
    const dbref = firebase.database().ref("/recipes");
    dbref.push(recipeData);
  } else {
    console.log("error")
  }
  

  // let newRecipeState = recipeState.filter((recipe) => {
  //   return recipe !== value
  // })
  
  // newRecipeState.push(value);
  // this.setState({
  //   recipes: newRecipeState
  // })

  // console.log(this.state.recipes.find((item) => value === item));

  // const dbref = firebase.database().ref("/recipes");
  // newRecipeState.forEach((recipe) => {
  //   dbref.push(recipe)
  // })

  // for (let i = 0; i < recipeState.length; i++) {
  //   if (recipeState[i] !== value) {
  //     newRecipeState.push(value);
  //   }
  // }
 }

  getRecipeCatalog(e) {
    e.preventDefault();
    const newState = Array.from(this.state.recipeCatalog);
    let recipes;
    axios.get(apiURL, {
      params: {
        _app_id: "3a0b16d3",
        _app_key: 'faa48eb9d0f5e7c9d642a58e0147bc85',
        format: 'json',
        requirePictures: true,
        'allowedCuisine[]': `cuisine^cuisine-${this.state.cuisine}`,
        "allowedCourse[]": "course^course-Main Dishes"
      }
    })
    .then((res) => {
      // console.log(res);
      const recipeData = res.data.matches;
      console.log(recipeData);
      let recipeId = recipeData.map((recipe) => {
        return recipe.id
      })
      console.log(recipeId);
      recipes = recipeId.map((recId) => {  
        return axios.get(`https://api.yummly.com/v1/api/recipe/${recId}`, {
          params: {
            _app_id: apiID,
            _app_key: apiKey,
            format: 'json',
          }
        });
      })
      Promise.all(recipes).then(results => {
        let recipeCatalog = [];
        // console.log(results)
        results.forEach(res => {
          // console.log(res.data)
          recipeCatalog.push(res.data)
        })
        this.setState({
          recipeCatalog: recipeCatalog
        })
        console.log(recipeCatalog)
      })
     
    })
  }

  displayRecipeCatalog(recipes) {
    console.log(recipes);
  }
  
  componentDidMount() {
    const dbref = firebase.database().ref("/recipes");
    dbref.on("value", (snapshot) => {
      // console.log("hey");
      console.log(snapshot.val());
      const data = snapshot.val();
      const state = [];
      for(let key in data) {
        //console logs the individual key of each peice of data
        // console.log(key);
        //this get the information for the corresponding key
        // console.log(data[key]);
        //here we use the value stored in the key variable
        //to access the object stored at that location
        //then we add a new property to that object called key
        //and assign it the value of, key
        data[key].key = key;
        state.push(data[key]);
      }
      // console.log(state);
      // this.setState({
      //   todos:state
      // });
    })
  }

  //where we grab user input
  render() {
    return (
      <div>
        {/* <Header /> */}
        <section>
          <form action="" onSubmit={this.getRecipeCatalog} className="wrapper">
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
          <div className="searchContainer wrapper">
            {this.state.recipeCatalog.map((recipe) => {
              return (
                <RecipeCard data={recipe} key={recipe.id} recipeChange={this.recipeChange} addRecipe={this.addRecipe}/>
              )
            })}
          </div>
        </section>

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
