import React, { Component } from 'react';
import './App.css';
import GymBuddy from './containers/GymBuddy'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ActionCableProvider } from 'react-actioncable-provider'
import { cableUrl } from './constants/keys'

import store from './redux/store'

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <ActionCableProvider url={cableUrl}>
            <GymBuddy />
          </ActionCableProvider>
        </Provider>
      </Router>
    )
  }
}

export default App;
