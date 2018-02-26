import React from "react";

class RecipePage extends React.Component {
    constructor() {
        super();
        this.state = {
            poop: ''
        }
    }

    componentDidMount() {
        this.setState({
            poop: this.props
        })
    }
    
    render() {
        console.log(this.props.data)
      return (
        <h2>{this.props.data}</h2>
      )
    }
  }

export default RecipePage;