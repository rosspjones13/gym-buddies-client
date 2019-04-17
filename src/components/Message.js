import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateReadMessage } from '../redux/actions/messages'
import { List, Avatar } from 'antd'
import { isEmpty } from 'lodash'

class Message extends Component {
  scrollToBottom = () => {
    const { currentBuddy } = this.props
    if (!isEmpty(currentBuddy.messages)) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }

  componentDidMount() {
    const { message, updateReadMessage, currentUser } = this.props
    this.scrollToBottom();
    if (!message.read && currentUser.username !== message.username.username) {
      message.read = true
      updateReadMessage(message)
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  formatDate(date) {
    let newD = new Date(date)
    return `${newD.toLocaleTimeString()} ${newD.toLocaleDateString()}`
  }

  render() {
    const { message } = this.props
    return (
      <List.Item key={message.id}>
        <List.Item.Meta
          avatar={<Avatar style={{ color: '#0d5fe5', backgroundColor: '#b3cbf2' }}>{message.username.first_name[0]}</Avatar>}
          title={message.content}
          description={message.username.first_name}
        />
        <div>@{this.formatDate(message.created_at)}</div>
        <div style={{ float: "left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </List.Item>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentBuddy: state.currentBuddy,
    userBuddies: state.userBuddies,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateReadMessage: (message) => { dispatch(updateReadMessage(message)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)
// export default Message