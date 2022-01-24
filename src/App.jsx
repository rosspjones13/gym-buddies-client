import React from "react";
import "./App.css";
import GymBuddy from "./containers/GymBuddy";
// import { BrowserRouter as Router } from 'react-router-dom'
// import { ConnectedRouter as Router } from 'connected-react-router'
import { ReduxRouter as Router } from "@lagunovsky/redux-react-router";
import { Provider } from "react-redux";
import { ActionCableProvider } from "react-actioncable-provider";
import { cableUrl } from "./constants/keys";
// import configureStore, { history } from './redux/store'
import { store, history } from "./redux/store";

// import store from './redux/store'
// const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <ActionCableProvider url={cableUrl}>
        <Router history={history} store={store} children={<GymBuddy />} />
        {/* <GymBuddy /> */}
        {/* </Router> */}
      </ActionCableProvider>
    </Provider>
  );
};

export default App;
