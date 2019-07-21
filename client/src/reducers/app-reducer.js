import { ActionConstant } from '../actions'
import * as LoadState from '../constants/LoadState'

const appStateInit = {
  user: {
    _id: 'user1',
    name: 'Ross Lynch',
    email: 'ross@example.com',
  },
  loading: true,
  err: null,
  requiredTransferWorkspaces: [],
  deleteWorkspaces: [],
  transferOwnershipStatus: {
    workspaceId: null,
    toUserId: null,
    ...LoadState.pending,
  },
  terminateAccountStatus: {},
}

const appReducer = (state = appStateInit, action) => {
  switch (action.type) {
    case ActionConstant.SHOW_LOADING:
      return Object.assign({}, state, {
        loading: true,
      })
    case ActionConstant.HIDE_LOADING:
      return Object.assign({}, state, {
        loading: false,
      })
    case ActionConstant.FETCH_REQUIRED_TRANSFER_WORKSPACE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        requiredTransferWorkspaces: action.payload.requiredTransferWorkspaces,
        deleteWorkspaces: action.payload.deleteWorkspaces,
      })
    case ActionConstant.FETCH_REQUIRED_TRANSFER_WORKSPACE_FAIL:
      return Object.assign({}, state, {
        error: action.error,
      })
    case ActionConstant.TRANSFER_OWNERSHIP_PENDING:
      return Object.assign({}, state, {
        transferOwnershipStatus: {
          workspaceId: action.workspace.spaceId,
          toUserId: action.user._id,
          // ...LoadState.isLoading,
        },
      })
    case ActionConstant.TRANSFER_OWNERSHIP_SUCCESS:
      return Object.assign({}, state, {
        transferOwnershipStatus: {
          workspaceId: action.workspace.spaceId,
          toUserId: action.user._id,
          // ...LoadState.completed,
        },
      })
    case ActionConstant.TRANSFER_OWNERSHIP_FAIL:
      return Object.assign({}, state, {
        transferOwnershipStatus: {
          workspaceId: action.workspace.spaceId,
          toUserId: action.user._id,
          // ...LoadState.error,
        },
      })
    case ActionConstant.TERMINATE_ACCOUNT_STATUS_SUCCESS:
      return Object.assign({}, state, {
        terminateAccountStatus: LoadState.handleLoaded(),
      })
    case ActionConstant.TERMINATE_ACCOUNT_STATUS_FAIL:
      return Object.assign({}, state, {
        terminateAccountStatus: LoadState.handleLoadFailedWithError(
          'Error deleting account'
        )(state.terminateAccountStatus),
      })
    case ActionConstant.TERMINATE_ACCOUNT_ERROR:
      return Object.assign({}, state, {
        terminateAccountStatus: LoadState.handleLoadFailedWithError(
          action.error
        )(state.terminateAccountStatus),
      })
    case ActionConstant.RESET_TERMINATE_ACCOUNT_STATUS:
      return Object.assign({}, state, {
        terminateAccountStatus: LoadState.pending,
      })
    default:
      return state
  }
}

export default appReducer
