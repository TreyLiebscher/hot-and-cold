import React, { Component } from 'react';
import './App.css';
import Button from './Button'

const min = 1;
const max = 100;

function getRandomNumber() {
  return Math.floor(Math.random() * max) + min;
}


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lastGeneratedNumber: getRandomNumber(),
      userProvidedNumber: '',
      isValid: null,
      isGuessed: false,
      message: '',
    }
  }

  handleInput(event) {
    const value = event.target.value
    const numValue = parseInt(value, 10);
    let isValid = !isNaN(value)
    if (numValue < min || numValue > max) {
      isValid = false
    }

    this.setState({
      userProvidedNumber: value,
      isValid,
    })
  }

  handleGuess(event) {
    event.preventDefault()
    const { lastGeneratedNumber, userProvidedNumber } = this.state
    if ('' + lastGeneratedNumber === userProvidedNumber) {
      this.setState({ isGuessed: true, message: 'Lucky bastard!' })
    } else {
      //TODO generate another, start once over
      this.setState({ message: 'Not by far!' })
    }
  }

  render() {

    const { isValid, message, isGuessed } = this.state

    const buttonProps = {
      onClick: this.handleGuess.bind(this),
      disabled: !isValid,
    }

    const validationStr = isValid === null ? null : (isValid ? null : `Please enter a number between ${min} and ${max}`)

    const startOverBtn = isGuessed ? (<button>Start over</button>) : null

    return (

      <div className="App">
        <p>{message} {startOverBtn}</p>
        <p>{validationStr}</p>
        <input value={this.state.userProvidedNumber} onChange={this.handleInput.bind(this)} />
        <Button {...buttonProps} />
        <pre>{JSON.stringify(this.state, 2, 2)}</pre>
      </div>
    );
  }
}

export default App;
