import React, { Component } from 'react';
import './App.css';
import GymBuddy from './containers/GymBuddy'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ActionCableProvider } from 'react-actioncable-provider'

import store from './redux/store'

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <ActionCableProvider url={'ws://localhost:3000/cable'}>
            <GymBuddy />
          </ActionCableProvider>
        </Provider>
      </Router>
    )
  }
}

export default App;
