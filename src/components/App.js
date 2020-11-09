import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.timerId = undefined;
    this.state = { time: 0, x: 0, y: 0, start: false };
    this.handleStart = this.handleStart.bind(this);
    this.handleMovement = this.handleMovement.bind(this);
    this.gameWon = this.gameWon.bind(this);
  }

  gameWon() {
    if (this.state.x === 250 && this.state.y === 250) {
      return true;
    }
    return false;
  }

  handleMovement(event) {
    if (this.state.x === 250 && this.state.y === 250) {
      return;
    }
    const keyPressed = event.key;
    if (keyPressed === "ArrowRight") {
      this.setState({ x: this.state.x + 5 });
    } else if (keyPressed === "ArrowLeft") {
      this.setState({ x: this.state.x - 5 });
    } else if (keyPressed === "ArrowUp") {
      this.setState({ y: this.state.y - 5 });
    } else if (keyPressed === "ArrowDown") {
      this.setState({ y: this.state.y + 5 });
    }
    if (this.gameWon()) {
      document.removeEventListener("keydown", this.handleMovement);
      clearInterval(this.timerId);
    }
  }

  handleStart() {
    this.setState({ start: true });
    document.addEventListener("keydown", this.handleMovement);
    this.timerId = setInterval(
      () => this.setState({ time: this.state.time + 1 }),
      1000
    );
  }

  componentDidMount() {}

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  initialRender() {
    if (this.state.start) {
      return (
        <>
          <div
            className="ball"
            style={{ left: this.state.x + "px", top: this.state.y + "px" }}
          ></div>
          <div className="hole"></div>
          <div className="heading-timer">{this.state.time}</div>
        </>
      );
    } else {
      return (
        <>
          <div className="ball" style={{ left: "0px", right: "0px" }}></div>
          <div className="hole"></div>
          <div className="heading-timer">0</div>
          <button className="start" onClick={this.handleStart}>
            start{" "}
          </button>
        </>
      );
    }
  }

  render() {
    return <>{this.initialRender()}</>;
  }
}

export default Timer;
