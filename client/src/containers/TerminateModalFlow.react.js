import _ from 'lodash'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ConfirmEmailModal from './ConfirmEmailModal.react'
import FeedbackSurveyModal from './FeedbackSurveyModal.react'
import { terminateAccountError, resetTerminateAccountStatus } from '../actions'
import {
  fetchRelatedWorkspaces,
  transferOwnership,
  terminateAccount,
} from '../services/ApiService'
import { submitToSurveyMonkeyDeleteAccount } from '../services/SurveyService'
import * as LoadState from '../constants/LoadState'
import TransferModal from './TransferModal.react'
import { getRefsValues, rediectToHomepage } from '../utils/utils'

class TerminateModalFlow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeModal: 'transfer',
      transferData: [],
      feedbacks: [],
      comment: '',
      email: '',
    }
  }

  static propTypes = {
    user: React.PropTypes.object.isRequired, //
    loading: React.PropTypes.bool, //
    requiredTransferWorkspaces: React.PropTypes.array, //
    deleteWorkspaces: React.PropTypes.array, //
    fetchRelatedWorkspaces: React.PropTypes.func, //
    transferOwnershipStatus: React.PropTypes.object, //
    transferOwnership: React.PropTypes.func, //
    terminateAccount: React.PropTypes.func, //
    terminateAccountError: React.PropTypes.func, //
    terminateAccountStatus: React.PropTypes.object, //
    resetTerminateAccountStatus: React.PropTypes.func, //
    // rediectToHomepage: React.PropTypes.func, // dont need to be as pros anymore
  }

  componentDidMount() {
    this.props.fetchRelatedWorkspaces(this.props.user)
  }

  componentWillReceiveProps(nextProps) {
    if (LoadState.isLoaded(nextProps.terminateAccountStatus)) {
      // this.props.rediectToHomepage()
      rediectToHomepage()
    }
  }

  getTransferData = () => {
    console.log(this.props)
    const { workspaceId, toUserId, status } = this.props.transferOwnershipStatus
    const { transferData } = this.state
    const updateData = _.reduce(
      transferData,
      (result, assign) => {
        if (
          assign.workspaceId === workspaceId &&
          assign.toUser.id === toUserId
        ) {
          result.push(Object.assign({}, assign, { status }))
        } else {
          result.push(assign)
        }
        return result
      },
      []
    )
    return updateData
  }

  assignToUser = (workspace, user) => {
    const assigns = _.reject(
      this.getTransferData(),
      assign => assign.workspaceId === workspace.spaceId
    )
    this.setState({
      transferData: [
        ...assigns,
        {
          workspaceId: workspace.spaceId,
          toUser: user,
          ...LoadState.pending,
        },
      ],
    })
  }

  submitSurvey = () => {
    const feedbackRefs = getRefsValues(this.refs, 'feedbackForm')
    const surveyPayload = {
      feedbackRefs,
      comment: '',
    }
    submitToSurveyMonkeyDeleteAccount(surveyPayload)
  }

  onSetNextPage = () => {
    if (this.state.activeModal === 'transfer') {
      this.setState({ activeModal: 'feedback' })
    } else if (this.state.activeModal === 'feedback') {
      const feedbackRefs = getRefsValues(this.refs, 'feedbackForm')
      this.setState({
        activeModal: 'confirm',
        feedbacks: _.map(feedbackRefs, ref => ({
          reason: ref.key,
          comment: ref.value,
        })),
      })
      this.submitSurvey()
    }
  }

  onGoToPreviousStep = () => {
    if (this.state.activeModal === 'feedback') {
      this.setState({ activeModal: 'transfer' })
    }
    if (this.state.activeModal === 'confirm') {
      this.setState({ activeModal: 'feedback' })
    }
  }

  onAssignToUser = (workspace, toUser) => {
    this.props.transferOwnership(this.props.user, toUser, workspace)
    this.assignToUser(workspace, toUser)
  }

  onChangeComment = e => {
    this.setState({ comment: e.target.value })
  }

  onDeleteAccount = async () => {
    if (this.props.user.email === this.state.email) {
      const payload = {
        transferTargets: _.map(this.getTransferData(), assign => ({
          userId: assign.toUser._id,
          spaceId: assign.workspaceId,
        })),
        reason: this.state.feedbacks,
      }
      this.props.terminateAccount(payload)
    } else {
      const error = 'Invalid email'
      this.props.terminateAccountError(error)
    }
  }

  onTypeEmail = e => {
    this.setState({ email: e.target.value })
  }

  renderTransferModal() {
    console.log(this.props)
    return (
      <TransferModal
        getTransferData={this.getTransferData()}
        onSetNextPage={this.onSetNextPage}
        onAssignToUser={this.onAssignToUser}
        requiredTransferWorkspaces={this.props.requiredTransferWorkspaces}
        deleteWorkspaces={this.props.deleteWorkspaces}
        loading={this.props.loading}
        user={this.props.user}
      />
    )
  }

  renderFeedBackSurveyModel() {
    return (
      <FeedbackSurveyModal
        ref="feedbackForm"
        title="Why would you leave us?"
        onSubmit={this.onSetNextPage}
        onBackButton={this.onGoToPreviousStep}
        showCommentForm
        comment={this.state.comment}
        onChangeComment={this.onChangeComment}
      />
    )
  }

  renderConfirmEmailModal() {
    return (
      <ConfirmEmailModal
        onClickToDelete={this.onDeleteAccount}
        onBackButton={this.onGoToPreviousStep}
        email={this.state.email}
        onTypeEmail={this.onTypeEmail}
        terminateAccountStatus={this.props.terminateAccountStatus}
        resetTerminateAccountStatus={this.props.resetTerminateAccountStatus}
      />
    )
  }

  render() {
    switch (this.state.activeModal) {
      case 'transfer':
        return this.renderTransferModal()
      case 'feedback':
        return this.renderFeedBackSurveyModel()
      case 'confirm':
        return this.renderConfirmEmailModal()
    }
  }
}

const mapStateToProps = state => {
  // console.log(state)
  return {
    user: state.appState.user,
    loading: state.appState.loading,
    transferOwnershipStatus: state.appState.transferOwnershipStatus,
    requiredTransferWorkspaces: state.appState.requiredTransferWorkspaces,
    deleteWorkspaces: state.appState.deleteWorkspaces,
    terminateAccountStatus: state.appState.terminateAccountStatus,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchRelatedWorkspaces,
      transferOwnership,
      terminateAccount,
      terminateAccountError,
      resetTerminateAccountStatus,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TerminateModalFlow)
// export default TerminateModalFlow
