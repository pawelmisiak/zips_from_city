import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theText: "Nothing to display",
      zips: []
    };
  }

  cityLook(event) {
    if (event.key === "Enter") {
      const text = document.getElementById("inputHolder").value.toUpperCase();
      let city = "";

      fetch(`http://ctp-zip-api.herokuapp.com/city/${text}`)
        .then(result => {
          return result.json();
        })
        .then(r => {
          console.log(r[2]);
          city = r;
          this.setState({ zips: city });
        })
        .catch(() => {
          console.log("error");
          this.setState({ zips: "No Such City" });
        });
    }
    return;
  }
  getZips() {
    return this.state.zips.map(zip => <li>{zip}</li>);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Lets find the city you are looking for</h3>

          <label>Enter City:</label>
          <input
            type="text"
            id="inputHolder"
            onKeyPress={e => {
              this.cityLook(e);
            }}
          />
          {/* <p className="output">{this.state.zips}</p> */}
          <ol className="output">{this.getZips()}</ol>
        </header>
      </div>
    );
  }
}

export default App;
