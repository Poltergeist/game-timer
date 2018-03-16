import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./App.module.css";

import Game from "./Game";
import Login from "./Login";

export class App extends Component {
  render() {
    let { games, hasApiToken } = this.props;

    if (!hasApiToken) {
      return <Login />;
    }
    games = games.map((game, index) => {
      const { id, name, timer } = game;
      return <Game key={index} id={id} name={name} timer={timer} />;
    });
    return <div className={styles.App}>{games}</div>;
  }
}

const mapStateToProps = state => {
  return {
    games: state.games.map(game => {
      return { ...game, timer: state.timer[game.id] };
    })
  };
};

App.defaultProps = {
  hasApiToken: false,
  games: []
};

export default connect(mapStateToProps)(App);
