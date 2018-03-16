import uuid from "uuid";
const START_TIMER = Symbol("START_TIMER");
const STOP_TIMER = Symbol("STOP_TIMER");
const ADD_TIMER = Symbol("ADD_TIMER");

export const addTimer = timer => {
  return {
    type: ADD_TIMER,
    ...timer
  };
};
const apiToken = localStorage.getItem("apiToken");

export const startTimer = game => {
  const id = uuid();
  fetch(
    `https://script.google.com/macros/s/${apiToken}/exec?id=${id}&gameId=${
      game.id
    }&startTimer=true`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if (json.result === "success") {
        return;
      }
      throw new Error("Network response was not ok.");
    })
    .catch(error => console.error(error));
  return {
    type: START_TIMER,
    ...game,
    gameId: game.id,
    id: id
  };
};
export const stopTimer = timer => {
  fetch(
    `https://script.google.com/macros/s/${apiToken}/exec?id=${
      timer.id
    }&stopTimer=true`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if (json.result === "success") {
        return;
      }
      throw new Error("Network response was not ok.");
    })
    .catch(error => console.error(error));
  return {
    type: STOP_TIMER,
    gameId: timer.gameId
  };
};

export default function(state = {}, action) {
  if (action.type === START_TIMER) {
    const { id, gameId } = action;
    const startTime = Date.now();
    const newState = {
      ...state
    };
    newState[gameId] = {
      ...newState[gameId],
      startTime,
      id
    };
    return newState;
  }
  if (action.type === STOP_TIMER) {
    const { gameId } = action;
    const stopTime = Date.now();
    const newState = {
      ...state
    };
    newState[gameId] = {
      total: newState[gameId].total + (stopTime - newState[gameId].startTime)
    };
    return newState;
  }
  if (action.type === ADD_TIMER) {
    const { id, gameId, startTime, stopTime } = action;
    const newState = {
      ...state
    };
    if (!newState[gameId]) {
      newState[gameId] = { total: 0 };
    }
    if (stopTime) {
      newState[gameId] = {
        ...newState[gameId],
        total: newState[gameId].total + (stopTime - startTime)
      };
      return newState;
    }
    newState[gameId] = {
      ...newState[gameId],
      startTime,
      id
    };

    return newState;
  }
  return state;
}
