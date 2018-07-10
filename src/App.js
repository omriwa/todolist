import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './store.js';
import TodoList from './list_components/list.js';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <TodoList/>
        </div>
      </Provider>
    );
  }
}

export default App;
