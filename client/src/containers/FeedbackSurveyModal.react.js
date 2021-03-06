import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { feedbackSurveyItems } from '../constants/FeedbackSurveyItems'

class FeedbackSurveyModal extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    onBackButton: PropTypes.func,
    title: PropTypes.node,
    comment: PropTypes.string,
    onChangeComment: PropTypes.func,
  }

  constructor(props) {
    super(props)
    // this.state = this.setInitialState()
    this.state = {
      feedbackSurveyItems: this.setInitialState(),
      showCommentForm: true,
      isFocusCommentBox: false,
      // comment: '',
    }
  }

  setInitialState = () => {
    return _.chain(feedbackSurveyItems)
      .map(item => [item.stack, false])
      .fromPairs()
      .value()
  }

  hasAllUnchecked = () => {
    // const FeedbackSurveyItems = this.state
    const { feedbackSurveyItems } = this.state
    return (
      _.every(feedbackSurveyItems, val => val === false) &&
      !this.state.isFocusCommentBox
    )
  }

  onToggleFeedback(stack) {
    const updateFeedBackSurveyItems = Object.assign(
      {},
      this.state.feedbackSurveyItems,
      {
        [stack]: !this.state.feedbackSurveyItems[stack],
      }
    )
    this.setState({ feedbackSurveyItems: updateFeedBackSurveyItems })
  }

  onFocusCommentBox = () => {
    this.setState({
      isFocusCommentBox: !this.state.isFocusCommentBox,
    })
  }

  renderInputForm({ stack, canComment, placeHolder }) {
    const prefill = placeHolder && canComment ? placeHolder : ''
    return !this.state.feedbackSurveyItems[stack] ? null : (
      <div style={!canComment ? { display: 'none' } : null}>
        <input type="text" name={stack} ref={stack} placeholder={prefill} />
      </div>
    )
  }

  renderButtons() {
    return (
      <div>
        <button onClick={this.props.onBackButton}>Back</button>
        <button onClick={this.props.onSubmit} disabled={this.hasAllUnchecked()}>
          Next
        </button>
      </div>
    )
  }

  renderCommentForm() {
    if (!this.state.showCommentForm) {
      return
    }

    return (
      <div style={{ marginTop: '2rem' }}>
        Comments:
        <div>
          <textarea
            type="text"
            name="comment"
            style={
              this.state.isFocusCommentBox
                ? { border: '1px solid blue' }
                : { border: '1px solid black' }
            }
            onChange={this.props.onChangeComment}
            value={this.props.comment}
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>
          {_.map(feedbackSurveyItems, (item, key) => (
            <div key={key}>
              <label>
                <input
                  type="checkbox"
                  checked={this.state.feedbackSurveyItems[item.stack]}
                  onClick={() => this.onToggleFeedback(item.stack)}
                />
                {item.title}
              </label>
              {this.renderInputForm(item)}
            </div>
          ))}
        </div>
        {this.renderCommentForm()}
        {this.renderButtons()}
      </div>
    )
  }
}

export default FeedbackSurveyModal
