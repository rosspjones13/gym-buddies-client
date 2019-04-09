import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import BuddyList from '../components/BuddyList'
import MessageList from '../components/MessageList'
import NewMessageForm from '../components/NewMessageForm'
import { isEmpty } from 'lodash'
import { Layout } from 'antd'
import { ActionCableConsumer } from 'react-actioncable-provider';

const { Content } = Layout

class UserPage extends Component {
  constructor() {
    super()
    // this.bottom = React.createRef()
  }

  // componentDidUpdate() {
  //   this.bottom.current.scrollIntoView();
  // }

  handleReceivedBuddy = response => {
    console.log('received buddy info')
  }

  render() {
    let { buddyMessages, currentUser } = this.props
    return (
      <Layout style={{ background: "#fff" }}>
      <ActionCableConsumer
        channel={{ channel: 'BuddiesChannel', user: currentUser.id }}
        onReceived={this.handleReceivedBuddy}
      />
        Buddies
        {isEmpty(buddyMessages) ? <Content></Content> : 
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
    buddyMessages: state.buddyMessages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // fetchingBuddyMessages: (buddy) => { dispatch(fetchingBuddyMessages(buddy)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
