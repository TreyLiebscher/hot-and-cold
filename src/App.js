import React, { Component } from 'react';
import './App.css';
import Button from './Button'

const min = 1;
const max = 100;
let guesses = [];

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
      guessHistory: guesses
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
    event.preventDefault();
    const { lastGeneratedNumber, userProvidedNumber } = this.state

    //Saving answers
    guesses.push(userProvidedNumber);
    this.setState({guessHistory: guesses})

    //Comparing Answers
    if ('' + lastGeneratedNumber === userProvidedNumber) {
      this.setState({ isGuessed: true, message: 'You Win!' })
    } else if (Math.abs(('' + lastGeneratedNumber) - userProvidedNumber) <= 5) {
      this.setState({ message: 'Hot' })
    } else if (Math.abs(('' + lastGeneratedNumber) - userProvidedNumber) <= 10) {
      this.setState({ message: 'Warm' })
    } else{
      //TODO generate another, start once over
      this.setState({ message: 'Cold' })
    }
  }

  handleStartOver(event) {
    event.preventDefault();
    guesses = [];
    this.setState({
      lastGeneratedNumber: getRandomNumber(),
      userProvidedNumber: '',
      isValid: null,
      isGuessed: false,
      message: '',
      guessHistory: guesses
    });
  }

  render() {

    const { isValid, message, isGuessed, guessHistory } = this.state

    const guesses = guessHistory.map((guess, index) =>
    <p key={index} className="previousGuess">
        {guess}
    </p>
    );

    const buttonProps = {
      onClick: this.handleGuess.bind(this),
      disabled: !isValid,
    }

    const guessNumberProps = guessHistory.length;

    const validationStr = isValid === null ? null : (isValid ? null : `Please enter a number between ${min} and ${max}`)

    const startOverBtn = isGuessed ? (<button onClick={this.handleStartOver.bind(this)}>Start over</button>) : null

    return (
      <div className="appHolder">
        <div className="App">
          <h1 className="hotOrColdTitle">Hot or Cold</h1>
          <p>Guess a number between 1-100</p>
          <p>{message} {startOverBtn}</p>
          <p>{validationStr}</p>
          <input value={this.state.userProvidedNumber} onChange={this.handleInput.bind(this)} />
          <Button {...buttonProps} />
          <div className="guessHistoryList">{guesses}</div>
          <div className="guessCounter">
            <p> Guess Number {guessNumberProps}</p>
          </div>
          {/* <pre>{JSON.stringify(this.state, 2, 2)}</pre> */}
        </div>
      </div>
    );
  }
}

export default App;
