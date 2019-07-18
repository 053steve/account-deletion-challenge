import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import MockDataProvider from './MockDataProvider.react'
import TerminateModalFlow from './containers/TerminateModalFlow.react'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import rootReducer from './reducers'

// const store = createStore(rootReducer)

ReactDOM.render(
  <MockDataProvider>
    {props => <TerminateModalFlow {...props} />}
  </MockDataProvider>,
  document.getElementById('root')
)

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
