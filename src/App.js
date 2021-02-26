import "./App.css";
import React, { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

function Timer() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");

  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === "run") {
          setSec((val) => val + 1000);
        }
      });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
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
  }, []);

  const wait = React.useCallback(() => {
    setStatus("wait");
  }, []);
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
      <button className="button-wait" onClick={wait}>
        Wait
      </button>
    </div>
  );
}

export default Timer;
