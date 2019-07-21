export const ActionConstant = {
  SHOW_LOADING: 'SHOW_LOADING',
  HIDE_LOADING: 'HIDE_LOADING',
  FETCH_REQUIRED_TRANSFER_WORKSPACE_SUCCESS: 'FETCH_REQUIRED_TRANSFER_WORKSPACE_SUCCESS',
  FETCH_REQUIRED_TRANSFER_WORKSPACE_FAIL: 'FETCH_REQUIRED_TRANSFER_WORKSPACE_FAIL',
  TRANSFER_OWNERSHIP_PENDING: 'TRANSFER_OWNDERSHIP_PENDING',
  TRANSFER_OWNERSHIP_SUCCESS: 'TRANSFER_OWNDERSHIP_SUCCESS',
  TRANSFER_OWNERSHIP_FAIL: 'TRANSFER_OWNDERSHIP_FAIL',
  TERMINATE_ACCOUNT_STATUS_SUCCESS: 'TERMINATE_ACCOUNT_STATUS_SUCCESS',
  TERMINATE_ACCOUNT_STATUS_FAIL: 'TERMINATE_ACCOUNT_STATUS_FAIL',
  TERMINATE_ACCOUNT_ERROR: 'TERMINATE_ACCOUNT_ERROR',
  RESET_TERMINATE_ACCOUNT_STATUS: 'RESET_TERMINATE_ACCOUNT_STATUS'
}

// application state
export const showLoadingAction = () => ({
  type: ActionConstant.SHOW_LOADING,
})

export const hideLoadingAction = () => ({
  type: ActionConstant.HIDE_LOADING,
})

export const fetchRequiredTransferWorkspaceSuccess = payload => {
  return {
    type: ActionConstant.FETCH_REQUIRED_TRANSFER_WORKSPACE_SUCCESS,
    payload,
  }
}

export const fetchRequiredTransferWorkspaceError = error => {
  return {
    type: ActionConstant.FETCH_REQUIRED_TRANSFER_WORKSPACE_FAIL,
    error,
  }
}

export const transferOwnershipPending = (user, workspace) => {
  return {
    type: ActionConstant.TRANSFER_OWNERSHIP_PENDING,
    user,
    workspace,
  }
}

export const transferOwnershipSuccess = (user, workspace) => {
  return {
    type: ActionConstant.TRANSFER_OWNERSHIP_SUCCESS,
    user,
    workspace,
  }
}

export const transferOwnershipFail = (user, workspace) => {
  return {
    type: ActionConstant.TRANSFER_OWNERSHIP_FAIL,
    user,
    workspace,
  }
}

export const terminateAccountStatusSuccess = () => {
  return {
    type: ActionConstant.TERMINATE_ACCOUNT_STATUS_SUCCESS,
  }
}

export const TerminateAccountStatusFail = () => {
  return {
    type: ActionConstant.TERMINATE_ACCOUNT_STATUS_FAIL,
  }
}

export const terminateAccountError = error => {
  return {
    type: ActionConstant.TERMINATE_ACCOUNT_ERROR,
    error,
  }
}

export const resetTerminateAccountStatus = () => {
  return {
    type: ActionConstant.RESET_TERMINATE_ACCOUNT_STATUS,
  }
}
