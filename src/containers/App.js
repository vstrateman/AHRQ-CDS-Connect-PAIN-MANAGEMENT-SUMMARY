import React, { Component } from 'react';
import Header from '../components/Header';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        {this.props.children}
      </div>
    );
  }
}
