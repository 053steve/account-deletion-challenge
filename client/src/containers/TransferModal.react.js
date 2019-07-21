import PropTypes from 'prop-types'
import React from 'react'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { connect } from 'react-redux'
import { transferOwnership } from '../services/ApiService'
import { setTransferData } from '../actions'
import { TransferOwnershipModal } from '../components/TransferOwnershipModal.react'
import { WorkspaceGroupRows } from '../components/WorkSpaceGroupRows.react'
import AssignOwnership from './AssignOwnership.react'
import * as LoadState from '../constants/LoadState'
import { getTransferData } from '../utils/utils'

class TransferModal extends React.PureComponent {

  static propTypes = {
    getTransferData: PropTypes.func,
    onSetNextPage: PropTypes.func,
    requiredTransferWorkspaces: PropTypes.array,
    deleteWorkspaces: PropTypes.array,
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    transferOwnership: PropTypes.func,
    transferData: PropTypes.array,
    transferOwnershipStatus: React.PropTypes.object,
    setTransferData: React.PropTypes.func,
  }

  assignToUser = (workspace, user) => {
    const assigns = _.reject(
      this.props.getTransferData(),
      assign => assign.workspaceId === workspace.spaceId
    )
    this.props.setTransferData(assigns, user, workspace)
  }

  onAssignToUser = (workspace, toUser) => {
    this.props.transferOwnership(this.props.user, toUser, workspace)
    this.assignToUser(workspace, toUser)
  }

  render() {
    const transferData = this.props.getTransferData()
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
            transferData={transferData}
            onAssignToUser={this.onAssignToUser}
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

const mapStateToProps = state => {
  console.log(state)
  return {
    user: state.appState.user,
    transferData: state.appState.transferData,
    transferOwnershipStatus: state.appState.transferOwnershipStatus,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      transferOwnership,
      setTransferData,
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferModal)
// export default TransferModal
