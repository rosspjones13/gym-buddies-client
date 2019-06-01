import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateReadMessage } from '../redux/actions/messages'
import { List, Avatar } from 'antd'

class Message extends Component {
  componentDidMount() {
    const { message, updateReadMessage, currentUser } = this.props
    if (!message.read && currentUser.username !== message.username.username) {
      message.read = true
      updateReadMessage(message)
    }
  }

  formatDate(date) {
    let newD = new Date(date)
    return <div style={{ textAlign: 'right', paddingRight: '1vw' }}>
            <p style={{ marginBottom: 0 }}>{newD.toLocaleTimeString()}</p>
            <p style={{ marginBottom: 0 }}>{newD.toLocaleDateString()}</p>
          </div>
  }

  render() {
    const { message } = this.props
    return (
      <List.Item key={message.id}>
        <List.Item.Meta
          style={{ alignItems: 'center' }}
          avatar={<Avatar style={{ color: '#0d5fe5', backgroundColor: '#b3cbf2' }}>{message.username.first_name[0]}</Avatar>}
          title={message.content}
          description={message.username.first_name}
        />
        <div>{this.formatDate(message.created_at)}</div>
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