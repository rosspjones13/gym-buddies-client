import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchingUserBuddies } from '../redux/actions/currentUser'
import { toggleMenu } from '../redux/actions/menu'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout

class UserNav extends Component {
  handleMessageClick = () => {
    this.props.fetchingUserBuddies()
  }


  render() {
    const { menuCollapse, toggleMenu } = this.props
    return (
      <Fragment>
        <Sider
          trigger={null}
          collapsible
          collapsed={menuCollapse}
          style={{ height: '90vh', background: '#fff' }}
        >
          <Menu theme="light" mode="inline">
            <Menu.Item key="1">
              <Icon type="team" spin={true}/>
              <span>Buddies</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={this.handleMessageClick}>
              <Link to="/buddies">
                <Icon type="message" spin={true}/>
                <span>Messages</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="security-scan" spin={true}/>
              <span>Search</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Icon
          className="trigger"
          type={menuCollapse ? 'menu-unfold' : 'menu-fold'}
          size="small"
          onClick={toggleMenu}
          style={{ background: '#fff', maxHeight: 20, fontSize: 20, marginTop: '12px' }}
          spin={true}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuCollapse: state.menuCollapse
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchingUserBuddies: () => { dispatch(fetchingUserBuddies()) },
    toggleMenu: () => { dispatch(toggleMenu()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNav)