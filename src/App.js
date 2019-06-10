import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theText: "Nothing to display"
    };
  }

  cityLook() {
    const text = document.getElementById("inputHolder").value;
    let city = "";
    if (text.length < 5) {
      return this.state.theText;
    } else if (text.length === 5) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${text}`)
        .then(result => {
          return result.json();
        })
        .then(r => {
          console.log(r[0].City);
          city = r[0].City;
          this.setState({ theText: city });
        })
        .catch(() => {
          console.log("error");
          this.setState({ theText: "No Such City" });
        });
    }
    return;
  }

  render() {
    return (
      <div className="App">
        <h1>Hi there</h1>
        <header className="App-header">
          <h3>Lets find the city you are looking for</h3>
          <form>
            <label>Zip Code: </label>
            <input
              type="text"
              id="inputHolder"
              onChange={e => {
                this.cityLook();
              }}
            />
            <p>{this.state.theText}</p>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
