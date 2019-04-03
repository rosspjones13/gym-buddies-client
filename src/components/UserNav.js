import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleMenu } from '../redux/actions'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout

class UserNav extends Component {
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
              <Icon type="team" />
              <span>Buddies</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/messages">
                <Icon type="message" />
                <span>Messages</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="security-scan" />
              <span>Search</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Icon
          className="trigger"
          type={menuCollapse ? 'menu-unfold' : 'menu-fold'}
          size="small"
          onClick={toggleMenu}
          style={{ background: '#fff', maxHeight: 20, fontSize: 20, marginTop: '10px' }}
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
    toggleMenu: () => { dispatch(toggleMenu()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNav)