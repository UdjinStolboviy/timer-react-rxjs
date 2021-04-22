import React, { useEffect, useState } from "react";
import { interval, Subject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import PlayCircleFilledWhiteOutlinedIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import ReplayOutlinedIcon from "@material-ui/icons/ReplayOutlined";
import PauseCircleOutlineOutlinedIcon from "@material-ui/icons/PauseCircleOutlineOutlined";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Stardos Stencil', cursive",
      fontSize: "50px",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

function Timer() {
  const classes = useStyles();
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");

  let clicks = [];
  let timeout;

  // const stream$ = new Observable((observe) => {
  //   const unsubscribeTimer = new Subject();
  //   interval(1000)
  //     .pipe(takeUntil(unsubscribeTimer))
  //     .subscribe(() => {
  //       if (status === "run") {
  //         setSec((val) => val + 1000);
  //       }
  //     });
  // });

  useEffect(() => {
    interval(1000).subscribe(() => {
      if (status === "run") {
        myObservable.subscribe();
      } else {
        takeUntil(myObservable);
      }
    });
  }, [status]);

  let myObservable = new Observable((observ) => {
    setTimeout(() => {
      observ.next(setSec((val) => val + 1000));
    }, 1000);

    observ.complete();
  });

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
      } else {
        start();
      }
    }, 300);
  }

  return (
    <div className={classes.root}>
      <span> {new Date(sec).toISOString().slice(11, 19)}</span>

      <Button
        variant="contained"
        color="primary"
        startIcon={<PlayCircleFilledWhiteOutlinedIcon />}
        size="large"
        onClick={start}
      >
        Start
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<CancelOutlinedIcon />}
        size="large"
        onClick={stop}
      >
        Stop
      </Button>

      <Button
        variant="outlined"
        startIcon={<ReplayOutlinedIcon />}
        size="large"
        onClick={reset}
      >
        Reset
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<PauseCircleOutlineOutlinedIcon />}
        size="large"
        onClick={clickHandler}
      >
        Wait
      </Button>
    </div>
  );
}

export default Timer;
