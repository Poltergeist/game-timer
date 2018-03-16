import React from "react";
import { connect } from "react-redux";
import { startTimer, stopTimer } from "./reducers/timer";
import Time from "./Time";

const mapDispatchToProps = dispatch => {
  return {
    onStartTimer: game => dispatch(startTimer(game)),
    onStopTimer: game => dispatch(stopTimer(game))
  };
};

export default connect(null, mapDispatchToProps)(props => {
  const { name, id, timer = { total: 0 } } = props;

  const passed = Date.now() - timer.startTime;
  return (
    <div key={id}>
      <h1> {name} </h1>
      <div>
        Total: <Time time={timer.total} />
      </div>
      {timer.startTime ? (
        <div>
          Running: <Time time={passed} />
        </div>
      ) : null}
      {timer.startTime ? (
        <button onClick={() => props.onStopTimer({ id: timer.id, gameId: id })}>
          Stop Timer
        </button>
      ) : (
        <button onClick={() => props.onStartTimer({ name, id })}>
          Start Timer
        </button>
      )}
    </div>
  );
});
