import React, { Component } from 'react'
import { connect } from 'react-redux'
import BuddyList from '../components/BuddyList'
import MessageList from '../components/MessageList'
import NewMessageForm from '../components/NewMessageForm'
import { ActionCableConsumer } from 'react-actioncable-provider';
import { receiveBuddyMessages } from '../redux/actions/messages'
import { isEmpty } from 'lodash'
import { Layout } from 'antd'

const { Content } = Layout

class MessagePage extends Component {
  handleReceivedMessage = newMessage => {
    const { receiveBuddyMessages, userBuddies } = this.props
    let recieveMessage = userBuddies.find(buddy => buddy.buddy.id === newMessage.buddy_id)
    receiveBuddyMessages(recieveMessage.buddy.id, newMessage)
  };

  render() {
    const { currentBuddy, currentUser } = this.props
    return (
      <Layout style={{ background: "#fff" }}>
        <ActionCableConsumer
          channel={{ channel: 'MessagesChannel', buddy: currentUser.id }}
          onReceived={this.handleReceivedMessage}
        />
        {isEmpty(currentBuddy) ? <Content></Content> :
        <Layout style={{ background: "#fff" }}>
          <MessageList />
          <NewMessageForm />
        </Layout>
      }
        <BuddyList />
      </Layout>
    )
  }
}


const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    userBuddies: state.userBuddies,
    currentBuddy: state.currentBuddy
  }
}

const mapDispatchToProps = dispatch => {
  return {
    receiveBuddyMessages: (buddy_id, newMessage) => { dispatch(receiveBuddyMessages(buddy_id, newMessage)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage)
