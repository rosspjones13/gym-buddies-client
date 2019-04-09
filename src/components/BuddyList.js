import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { currentBuddyMessages } from '../redux/actions'
import { Layout, Menu, Avatar } from 'antd'

const { Sider } = Layout

class BuddyList extends Component {
  showBuddy = buddy => {
    return buddy.get_requester.id === this.props.currentUser.id ? buddy.get_requestee : buddy.get_requester
  }

  render() {
    const { userBuddies, currentBuddyMessages } = this.props
    return (
      <Sider style={{ background: "#fff" }}>
        <Menu>
          {userBuddies.map(buddy => (
            <Menu.Item
            key={buddy.id} 
            onClick={() => currentBuddyMessages(buddy.id, buddy.messages)}>
          
            <Link to={`/buddies/${buddy.id}`}>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              {this.showBuddy(buddy).first_name}
            </Link>
       
          </Menu.Item>
          ))}
        </Menu>
      </Sider>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    userBuddies: state.userBuddies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    currentBuddyMessages: (buddy_id, messages) => { dispatch(currentBuddyMessages(buddy_id, messages)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuddyList)
