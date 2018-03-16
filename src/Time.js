import React from "react";

export default props => {
  const { time } = props;
  if (time < 1000) {
    return <span>00:00:00</span>;
  }
  const seconds = parseInt((time / 1000) % 60) || 0;
  const minutes = parseInt((time / (1000 * 60)) % 60) || 0;
  const hours = parseInt(time / (1000 * 60 * 60)) || 0;
  return (
    <span>
      {hours < 10 ? `0${hours}` : hours}:{minutes < 10
        ? `0${minutes}`
        : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </span>
  );
};
