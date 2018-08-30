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
      userProvidedNumber: ''
    }
  }
  
  handleInput(event){
    this.setState({
      userProvidedNumber: event.target.value
    })
  }
  
  render() {

    const buttonProps = {
      onClick: this.handleInput.bind(this),
    }


    return (
      
      <div className="App">
        <input value={this.state.userProvidedNumber} onChange={this.handleInput.bind(this)}/>
        <Button />
        <pre>{JSON.stringify(this.state,2,2)}</pre>
      </div>
    );
  }
}

export default App;
