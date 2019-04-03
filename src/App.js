import React, { Component } from 'react';
import './App.css';
import GymBuddy from './containers/GymBuddy'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <GymBuddy />
        </Provider>
      </Router>
    )
  }
}

export default App;
