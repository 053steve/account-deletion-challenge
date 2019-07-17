import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import {
  TransferOwnershipModal,
  WorkspaceGroupRows,
} from './TransferOwnershipModal.react'
import AssignOwnership from './AssignOwnership.react'

class TransferModal extends React.PureComponent {
  static propTypes = {
    getTransferData: PropTypes.array,
    onAssignToUser: PropTypes.func,
    onSetNextPage: PropTypes.func,
    requiredTransferWorkspaces: PropTypes.array,
    deleteWorkspaces: PropTypes.array,
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
  }


  render() {
    const transferData = this.props.getTransferData
    const totalAssigned = transferData.length
    const totalWorkspaceRequiredTransfer = this.props.requiredTransferWorkspaces
      .length
    const totalWorkspaceDelete = this.props.deleteWorkspaces.length
    const disabledNextPage =
      totalAssigned < totalWorkspaceRequiredTransfer || this.props.loading
    return (
      <TransferOwnershipModal
        nextPage={this.props.onSetNextPage}
        loading={this.props.loading}
        disabledNextPage={disabledNextPage}
      >
        <WorkspaceGroupRows
          workspaces={this.props.requiredTransferWorkspaces}
          groupTitle="The following workspaces require ownership transfer:"
          shouldDisplay={totalWorkspaceRequiredTransfer > 0}
        >
          <AssignOwnership
            user={this.props.user}
            transferData={this.props.getTransferData}
            onAssignToUser={this.props.onAssignToUser}
          />
        </WorkspaceGroupRows>
        <WorkspaceGroupRows
          workspaces={this.props.deleteWorkspaces}
          groupTitle="The following workspaces will be deleted:"
          shouldDisplay={totalWorkspaceDelete > 0}
        />
      </TransferOwnershipModal>
    )
  }
}

export default TransferModal
