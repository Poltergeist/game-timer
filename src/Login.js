import React, { Component } from "react";

export class Login extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    localStorage.setItem("spreadsheet", this.spreadsheet.value);
    localStorage.setItem("apiToken", this.apiToken.value);
    document.location.href = document.location.href;
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label htmlFor="spreadsheet">Spreadsheet:</label>
          <input
            type="text"
            name="spreadsheet"
            id="spreadsheet"
            ref={input => (this.spreadsheet = input)}
          />
        </div>
        <div>
          <label htmlFor="apiToken">Api Token:</label>
          <input
            type="text"
            name="apiToken"
            id="apiToken"
            ref={input => (this.apiToken = input)}
          />
        </div>
        <button>Submit</button>
      </form>
    );
  }
}

export default Login;
