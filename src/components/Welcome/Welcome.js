import React, { Component } from "react";

import "./Welcome.css";

// https://agilewarrior.wordpress.com/2017/10/10/how-to-hide-elements-the-reactjs-way/
// used for disappearance of jumbotron

class Welcome extends Component {
  constructor() {
    super();
    this.state = { isHidden: false };
    this.handleChange = this.handleChange.bind(this);

    this.welcomeInstance = (
      <div className="jumbotron">
        <h1 className="display-4">eMuse</h1>
        <p className="lead">
        Don't get mixed up with the noise.
        </p>
        <hr className="my-4" />
      </div>
    );
  }
  handleChange(event) {
    this.setState({ isHidden: true });
  }

  showInput = () => {
    this.setState({ validForm: true });
  };

  render() {
    const style = this.state.isHidden ? { display: "none" } : {};
    const validForm = !this.state.validForm;

    return validForm ? (
      <div style={style}>{this.welcomeInstance}</div>
    ) : (
      <div>
        <h4 className="song-header"> Choose your songs! </h4>
      </div>
    );
  }
}

export default Welcome;
