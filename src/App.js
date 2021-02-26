import "./App.css";

function Timer() {
  return (
    <div className="app">
      <span> 12:13:14</span>
      <button className="button-start">Start</button>
      <button className="button-stop">Stop</button>
      <button className="button-reset">Reset</button>
      <button className="button-wait">Wait</button>
    </div>
  );
}

export default Timer;
