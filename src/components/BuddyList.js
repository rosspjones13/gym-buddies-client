import React, { Component } from 'react'
import { connect } from 'react-redux'
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
            onClick={() => currentBuddyMessages(buddy.messages)}>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            {this.showBuddy(buddy).first_name}
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
    currentBuddyMessages: (messages) => { dispatch(currentBuddyMessages(messages)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuddyList)
