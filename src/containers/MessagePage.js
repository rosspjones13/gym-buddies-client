import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchingBuddyMessages } from '../redux/actions'
import BuddyList from '../components/BuddyList'
import MessageList from '../components/MessageList'
import { isEmpty } from 'lodash'
import { Form, Layout, Input, Button, Row, Col } from 'antd'

const { Content } = Layout

class UserPage extends Component {
  render() {
    const { userBuddies, buddyMessages } = this.props

    return (
      <Layout style={{ background: "#fff" }}>
        Buddies
        {isEmpty(buddyMessages) ? <Content></Content> :
        <MessageList />
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
