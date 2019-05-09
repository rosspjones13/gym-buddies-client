import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { currentBuddyMessages } from '../redux/actions/currentUser'
import { deleteBuddy, updateBuddyStatus } from '../redux/actions/buddies'
import { Layout, List, Avatar, Badge, Icon, Dropdown, Menu } from 'antd'

const { Sider } = Layout

class BuddyList extends Component {
  constructor() {
    super()
    this.state = {
      selectedBuddy: {}
    }
    this.menu = (
    <Menu onClick={this.handleMenuSelect}>
      <Menu.Item key="1"><Icon type="delete" theme="twoTone" />Remove Buddy</Menu.Item>
      <Menu.Item key="2">
        <Icon type="stop" theme="twoTone"twoToneColor="#ea0404"/>Block Buddy
      </Menu.Item>
    </Menu>
    )
  }
  
  handleMenuClick = buddy => {
    this.setState({
      selectedBuddy: buddy
    })
  }

  handleMenuSelect = value => {
    const { selectedBuddy } = this.state
    const { deleteBuddy, updateBuddyStatus } = this.props
    if (value.key === "1") {
      deleteBuddy(selectedBuddy)
    }
    else {
      selectedBuddy.buddy.buddy_type = "blocked"
      updateBuddyStatus(selectedBuddy)
    }
  }

  showBuddy = buddy => {
    return buddy.requester.username === this.props.currentUser.username ? buddy.requestee : buddy.requester
  }

  sortBuddyNameList = buddies => {
    return buddies.sort((userA, userB) => {
      var buddyA = this.showBuddy(userA)
      var buddyB = this.showBuddy(userB)
      var nameA = buddyA.first_name.toUpperCase(); // ignore upper and lowercase
      var nameB = buddyB.first_name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    })
  }

  filterBuddyStatusList = userBuddies => {
    let online = userBuddies.filter(user => this.showBuddy(user).status === "online")
    let offline = userBuddies.filter(user => this.showBuddy(user).status === "offline")
    let sorted = [...this.sortBuddyNameList(online), ...this.sortBuddyNameList(offline)]
    return sorted.filter(buddy => buddy.buddy.buddy_type !== "blocked")
  }

  render() {
    const { userBuddies, currentBuddyMessages, currentUser } = this.props
    const { menu, showBuddy } = this
    let sortedBuddies = this.filterBuddyStatusList(userBuddies)
    return (
      <Sider style={{ background: "#fff", height: "95vh", overflow: "auto" }}>
        <List>
          {sortedBuddies.map(buddy => (
            <Fragment key={buddy.buddy.id}>
              <List.Item
                style={{ height: '6vh' }}
              >
                <List.Item.Meta
                  onClick={() => currentBuddyMessages(buddy)}
                  avatar={<Badge count={buddy.messages.filter(message => !message.read && message.username.username !== currentUser.username).length}>
                    <Avatar style={{ color: '#0d5fe5', backgroundColor: '#b3cbf2', marginRight: '5px' }}>
                      {showBuddy(buddy).first_name[0]}
                      {showBuddy(buddy).last_name[0]}
                    </Avatar>
                    <Dropdown trigger={['click']} overlay={menu} onClick={() => this.handleMenuClick(buddy)}>
                      <Icon type="more" style={{ fontSize: 18 }} />
                    </Dropdown>
                  </Badge>}
                  title={showBuddy(buddy).first_name}
                  description={<Badge
                    status={showBuddy(buddy).status === "offline" ? "default" : "success"}
                    text={showBuddy(buddy).status}
                  />}
                />
              </List.Item>
            </Fragment>
          ))}
        </List>
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
    currentBuddyMessages: (buddy) => { dispatch(currentBuddyMessages(buddy)) },
    deleteBuddy: (buddy) => { dispatch(deleteBuddy(buddy)) },
    updateBuddyStatus: (buddy) => { dispatch(updateBuddyStatus(buddy)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuddyList)
