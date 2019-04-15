import React, { Component } from 'react'
import { connect } from 'react-redux'
import BuddyList from '../components/BuddyList'
import MessageList from '../components/MessageList'
import NewMessageForm from '../components/NewMessageForm'
import { isEmpty } from 'lodash'
import { Layout } from 'antd'

const { Content } = Layout

class MessagePage extends Component {
  render() {
    let { currentBuddy } = this.props
    return (
      <Layout style={{ background: "#fff" }}>
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
