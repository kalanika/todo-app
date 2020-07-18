import React, { Component } from "react";
import "./App.css";
import List from "./components/List";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      items: []
    };
  }

  render() {
    return (
      <div className="container"
      style={{
        backgroundColor: '#ADD8E6'
      
      }}
      >
        
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h1 className="text-center">Todo List App </h1>
            <List />
          </div>
        </div>
      </div>
    );
  }
}

export default App;