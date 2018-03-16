import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./index.css";
import reducers from "./reducers";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { addGame } from "./reducers/games";
import { addTimer } from "./reducers/timer";

let store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const apiToken = localStorage.getItem("apiToken");
const spreadsheet = localStorage.getItem("spreadsheet");

if (spreadsheet) {
  fetch(
    `https://spreadsheets.google.com/feeds/list/${spreadsheet}/2/public/values?alt=json`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      return json.feed.entry;
    })
    .then((entries = []) => {
      return entries
        .map(entry => {
          return { name: entry.gsx$name.$t, id: entry.gsx$id.$t };
        })
        .map(addGame)
        .forEach(store.dispatch);
    });

  fetch(
    `https://spreadsheets.google.com/feeds/list/${spreadsheet}/1/public/values?alt=json`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      return json.feed.entry;
    })
    .then((entries = []) => {
      return entries
        .map(entry => {
          return {
            gameId: entry.gsx$gameid.$t,
            id: entry.gsx$id.$t,
            startTime: entry.gsx$starttime.$t,
            stopTime: entry.gsx$stoptime.$t
          };
        })
        .map(addTimer)
        .forEach(store.dispatch);
    });
}
ReactDOM.render(
  <Provider store={store}>
    <App hasApiToken={!!apiToken} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
