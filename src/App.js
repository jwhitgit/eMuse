import React, { Component } from "react";
import query from "query-string";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header.js";
import Songs from "./components/songs/Songs";
import Welcome from "./components/Welcome/Welcome.js";
import Login from "./components/login/Login";
import { saveToken, getToken } from "./services/spotify-service";
import LyricFinder from "./components/layout/LyricFinder";
import Lyrics from "./components/tracks/Lyrics";
import { Provider } from "./context";
import About from "./components/Views/About/About";
import Contact from "./components/Views/Contact/Contact";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false
    };
  }

  componentDidMount() {
    const savedAccessToken = getToken();
    const { access_token } = query.parse(window.location.hash);
    if (access_token && access_token !== savedAccessToken) {
      saveToken(access_token);
      this.setState({ isAuthorized: true });
      console.log("Authorization granted");
    }
  }

  render() {
    const { isAuthorized } = this.state;
    return (
      <div className="App">
        <Provider>
          <Router>
            <Header/>
            <Switch>
              <Route exact path="/" component={isAuthorized ? Songs : Login} />
              <Route exact path="/callback" component={Songs} />
              <Route exact path="/lyrics" component={LyricFinder} />
              <Route exact path="/lyrics/track/:id" component={Lyrics} />
              {/* New routes for tab are below this line */}
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
