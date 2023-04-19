// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    fullTime: 25,
    runningSecond: 0,
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.intervalId)
  }

  reduceTimer = () => {
    const {fullTime} = this.state
    if (fullTime > 0) {
      this.setState(prevState => ({
        fullTime: prevState.fullTime - 1,
      }))
    }
  }

  increaseTimer = () => {
    const {fullTime} = this.state
    this.setState(prevState => ({
      fullTime: prevState.fullTime + 1,
    }))
  }

  changeTime = () => {
    const {isTimerRunning, fullTime, runningSecond} = this.state
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
    const isTimerCompleted = runningSecond * 60 === fullTime
    if (isTimerCompleted) {
      this.setState((isTimerRunning: false))
      this.clearTimer()
    }
    if (isTimerRunning) {
      this.clearTimer()
      this.setState({isTimerRunning: false})
    } else {
      this.intervalId = setInterval(() => {
        this.startTimerCountDown()
      }, 1000)
    }
  }

  startTimerCountDown = () => {
    const {isTimerRunning, fullTime, runningSecond} = this.state
    this.setState(prevState => ({
      runningSecond: prevState.runningSecond + 1,
    }))
  }

  resetTime = () => {
    const {isTimerRunning, fullTime, runningSecond} = this.state
    this.setState({
      isTimerRunning: false,
      fullTime: 25,
      runningSecond: 0,
    })
    this.clearTimer()
  }

  convertTimeToTimer = () => {
    const {fullTime, runningSecond} = this.state
    const timeInSeconds = fullTime * 60 - runningSecond
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    const minutesInString = minutes > 9 ? minutes : `0${minutes}`
    const secondsInString = seconds > 9 ? seconds : `0${seconds}`
    // console.log(typeof minutesInString)
    // console.log(secondsInString)
    return `${minutesInString}:${secondsInString}`
  }

  render() {
    const {isTimerRunning, fullTime, runningSecond} = this.state
    const imageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altName = isTimerRunning ? 'pause icon' : 'play icon'
    console.log(altName)
    const runningState = isTimerRunning ? 'Pause' : 'Start'
    const insideRunningState = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <div className="app-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="bottom-container">
            <div className="timer-image-container">
              <h1 className="timing-display">{this.convertTimeToTimer()}</h1>
              <p>{insideRunningState}</p>
            </div>
            <div className="bottom-right-container">
              <div className="time-operation-container">
                <div className="start">
                  <button
                    className="btn-style"
                    type="button"
                    onClick={this.changeTime}
                  >
                    <img src={imageUrl} alt={altName} className="icon-style" />
                  </button>
                  <p>{runningState}</p>
                </div>
                <div className="start">
                  <button
                    className="btn-style"
                    type="button"
                    onClick={this.resetTime}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="icon-style"
                    />
                  </button>
                  <p>Reset</p>
                </div>
              </div>
              <p className="set-timer-text"> Set Timer Limit</p>
              <div className="select-time-container">
                <button
                  type="button"
                  className="btn-style add-less"
                  onClick={this.reduceTimer}
                >
                  -
                </button>
                <p>{fullTime}</p>

                <button
                  type="button"
                  className="btn-style add-less"
                  onClick={this.increaseTimer}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
