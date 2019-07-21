import {
  fetchRequiredTransferWorkspaceSuccess,
  fetchRequiredTransferWorkspaceError,
  transferOwnershipPending,
  transferOwnershipSuccess,
  transferOwnershipFail,
  terminateAccountStatusSuccess,
  TerminateAccountStatusFail,
} from '../actions'

export const fetchRelatedWorkspaces = user => {
  return async dispatch => {
    const response = await window.fetch(
      `https://us-central1-tw-account-deletion-challenge.cloudfunctions.net/fetchWorkspaces?userId=${user._id}`,
      {
        mode: 'cors',
      }
    )
    const data = await response.json()
    if (data) {
      dispatch(fetchRequiredTransferWorkspaceSuccess(data))
    } else {
      dispatch(fetchRequiredTransferWorkspaceError('some error'))
    }
  }
}

export const transferOwnership = (fromUser, toUser, workspace) => {
  return async dispatch => {
    dispatch(transferOwnershipPending(toUser, workspace))
    const response = await window.fetch(
      'https://us-central1-tw-account-deletion-challenge.cloudfunctions.net/checkOwnership',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workspaceId: workspace.spaceId,
          fromUserId: fromUser._id,
          toUserId: toUser._id,
        }),
      }
    )
    if (response.status === 200) {
      dispatch(transferOwnershipSuccess(toUser, workspace))
    } else {
      dispatch(transferOwnershipFail(toUser, workspace))
    }
  }
}

export const terminateAccount = payload => {
  return async dispatch => {
    const response = await window.fetch(
      'https://us-central1-tw-account-deletion-challenge.cloudfunctions.net/terminateAccount',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )
    if (response.status === 200) {
      dispatch(terminateAccountStatusSuccess())
    } else {
      dispatch(TerminateAccountStatusFail())
    }
  }
}
