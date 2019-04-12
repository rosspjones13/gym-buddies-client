import React, { Component } from 'react'
import { connect } from 'react-redux'
import BuddyList from '../components/BuddyList'
import MessageList from '../components/MessageList'
import NewMessageForm from '../components/NewMessageForm'
import { isEmpty } from 'lodash'
import { Layout } from 'antd'
import { ActionCableConsumer } from 'react-actioncable-provider';

const { Content } = Layout

class MessagePage extends Component {
  handleReceivedBuddy = response => {
    console.log('received buddy info')
  }

  render() {
    let { currentBuddy, currentUser } = this.props
    return (
      <Layout style={{ background: "#fff" }}>
      <ActionCableConsumer
        channel={{ channel: 'BuddiesChannel', user: currentUser.id }}
        onReceived={this.handleReceivedBuddy}
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
    // fetchingcurrentBuddy: (buddy) => { dispatch(fetchingcurrentBuddy(buddy)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage)
