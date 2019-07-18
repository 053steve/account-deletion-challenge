import { ActionConstant } from '../actions'

const appStateInit = {
  isLoading: true,
}

const appReducer = (state = appStateInit, action) => {
  switch (action.type) {
    case ActionConstant.SHOW_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      })
    case ActionConstant.HIDE_LOADING:
      return Object.assign({}, state, {
        isLoading: false,
      })
    default:
      return state
  }
}

export default appReducer
