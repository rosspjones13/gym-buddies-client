import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { receiveBuddyMessages } from '../redux/actions/messages'
import { currentUserOnline } from '../redux/actions/currentUser'
import { toggleMenu } from '../redux/actions/menu'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout

class UserNav extends Component {
  // handleReceivedBuddy = () => {
  //   debugger
  //   const { receiveBuddyMessages, currentBuddy } = this.props
  //   receiveBuddyMessages(buddy_id, newMessage)
  // }
  
  handleConnected = () => {
    const { currentUser, currentUserOnline } = this.props
    currentUser.status = "online"
    currentUserOnline(currentUser)
  }

  render() {
    const { menuCollapse, toggleMenu } = this.props
    return (
      <Fragment>
        <Sider
          trigger={null}
          collapsible
          collapsed={menuCollapse}
          style={{ height: '88vh', background: '#fff' }}
        >
          <Menu theme="light" mode="inline">
            <Menu.Item key="1">
              <Link to="/profile">
                <Icon type="calendar" theme="twoTone" twoToneColor="#f45642" style={{ fontSize: 24 }} />
                <span>My Workouts</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" onClick={this.handleMessageClick}>
              <Link to="/messages">
                <Icon type="message" theme="twoTone" style={{ fontSize: 24 }}/>
                <span>Messages</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/search">
                <Icon type="smile" theme="twoTone" twoToneColor="#ccbe02" style={{ fontSize: 24 }}/>
                <span>Find Buddies</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/gym-map">
                <Icon type="environment" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: 24 }}/>
                <span>Gym Check-in</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Icon
          className="trigger"
          type={menuCollapse ? 'caret-right' : 'caret-left'}
          size="small"
          onClick={toggleMenu}
          style={{ background: '#fff', maxHeight: 20, fontSize: 20, marginTop: '12px' }}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuCollapse: state.menuCollapse,
    userBuddies: state.userBuddies,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => { dispatch(toggleMenu()) },
    receiveBuddyMessages: (buddy_id, newMessage) => { dispatch(receiveBuddyMessages(buddy_id, newMessage)) },
    currentUserOnline: (user) => { dispatch(currentUserOnline(user)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNav)