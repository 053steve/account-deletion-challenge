import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import './index.css'
import MockDataProvider from './MockDataProvider.react'
import TerminateModalFlow from './containers/TerminateModalFlow.react'

import rootReducer from './reducers'

const middlewares = [thunk]

const store = createStore(rootReducer, applyMiddleware(...middlewares))
// console.log(store.getState())
ReactDOM.render(
  // <MockDataProvider>
  <Provider store={store}>
    <TerminateModalFlow />
  </Provider>,
  // </MockDataProvider>,
  document.getElementById('root')
)

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
