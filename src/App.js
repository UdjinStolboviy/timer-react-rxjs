import "./App.css";
import React, { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

function Timer() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");

  let clicks = [];
  let timeout;

  useEffect(() => {
    const unsubscribeTimer = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribeTimer))
      .subscribe(() => {
        if (status === "run") {
          setSec((val) => val + 1000);
        }
      });
    return () => {
      unsubscribeTimer.next();
      unsubscribeTimer.complete();
    };
  }, [status]);

  const start = React.useCallback(() => {
    setStatus("run");
  }, []);

  const stop = React.useCallback(() => {
    setStatus("stop");
    setSec(0);
  }, []);

  const reset = React.useCallback(() => {
    setSec(0);
    setStatus("run");
  }, []);

  const wait = React.useCallback(() => {
    setStatus("wait");
  }, []);

  function clickHandler(event) {
    event.preventDefault();
    clicks.push(new Date().getTime());
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      if (
        clicks.length > 1 &&
        clicks[clicks.length - 1] - clicks[clicks.length - 2] < 300
      ) {
        wait();
        // console.log("hi");
      } else {
        start();
      }
    }, 300);
  }

  return (
    <div className="app">
      <span> {new Date(sec).toISOString().slice(11, 19)}</span>
      <button className="button-start" onClick={start}>
        Start
      </button>
      <button className="button-stop" onClick={stop}>
        Stop
      </button>
      <button className="button-reset" onClick={reset}>
        Reset
      </button>
      <button className="button-wait" onClick={clickHandler}>
        Wait
      </button>
    </div>
  );
}

export default Timer;
