export const ActionConstant = {
  SHOW_LOADING: 'SHOW_LOADING',
  HIDE_LOADING: 'HIDE_LOADING',
}

// application state
export const showLoadingAction = () => ({
  type: ActionConstant.SHOW_LOADING,
})

export const hideLoadingAction = () => ({
  type: ActionConstant.HIDE_LOADING,
})
