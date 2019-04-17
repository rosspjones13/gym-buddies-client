import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
    const { userBuddies, currentBuddyMessages } = this.props
    const { menu } = this
    let sortedBuddies = this.filterBuddyStatusList(userBuddies)
    return (
      <Sider style={{ background: "#fff", height: "85vh", overflow: "auto" }}>
        <List>
          {sortedBuddies.map(buddy => (
            <List.Item
              key={buddy.buddy.id} 
              >
            <Link to={`/messages/${buddy.buddy.id}`}>
              <List.Item.Meta
                onClick={() => currentBuddyMessages(buddy)}
                avatar={<Avatar style={{ color: '#0d5fe5', backgroundColor: '#b3cbf2', marginRight: '5px' }}>
                  {this.showBuddy(buddy).first_name[0]}
                </Avatar>}
                title={this.showBuddy(buddy).first_name}
                description={<Badge 
                  status={this.showBuddy(buddy).status === "offline" ? "default" : "success"}
                  text={this.showBuddy(buddy).status}
                />}
              />
            </Link>
              <Dropdown trigger={['click']} overlay={menu} onClick={() => this.handleMenuClick(buddy)}>
                <Icon type="more" style={{ position: 'absolute', marginLeft: '10vw', fontSize: 20 }} />
              </Dropdown>
            </List.Item>
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
