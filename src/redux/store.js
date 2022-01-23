import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
// import { routerMiddleware } from 'connected-react-router'
import { createRouterMiddleware } from '@lagunovsky/redux-react-router'
import createRootReducer, { browserHistory } from './reducers/index'
import thunk from 'redux-thunk'

export const history = createBrowserHistory()

const routerMiddleware = createRouterMiddleware(browserHistory)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// export default function configureStore(preloadedState) {
//   const store = createStore(
//     createRootReducer(history), // root reducer with router state
//     preloadedState,
//     composeEnhancers(
//     // compose(
//       applyMiddleware(
//         routerMiddleware(history), // for dispatching history actions
//         thunk,
//       ),
//     ),
//   )

//   return store
// }
export const store = createStore(
  createRootReducer,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware, // for dispatching history actions
      thunk,
    ),
  ),
)

// const store = createStore(createRootReducer, composeEnhancers(applyMiddleware(thunk)))

// export default store