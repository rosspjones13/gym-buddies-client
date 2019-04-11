import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { ActionCableConsumer } from 'react-actioncable-provider'
import { currentBuddyMessages } from '../redux/actions/currentUser'
import { Layout, Menu, Avatar } from 'antd'

const { Sider } = Layout

class BuddyList extends Component {
  showBuddy = buddy => {
    return buddy.requester.username === this.props.currentUser.user.username ? buddy.requestee : buddy.requester
  }

  render() {
    const { userBuddies, currentBuddyMessages } = this.props
    return (
      <Sider style={{ background: "#fff" }}>
        <Menu>
          {userBuddies.map(buddy => (
            <Menu.Item
            key={buddy.buddy.id} 
            onClick={() => currentBuddyMessages(buddy)}>
          
            <Link to={`/buddies/${buddy.buddy.id}`}>
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
    currentBuddyMessages: (buddy) => { dispatch(currentBuddyMessages(buddy)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuddyList)
