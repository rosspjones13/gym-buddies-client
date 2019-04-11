import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions/loginUser'
import { Menu, Icon, Typography, Layout } from 'antd';

const { Header } = Layout
const { Title } = Typography

class NavBar extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleLogout = () => {
    localStorage.clear()
    this.props.logoutUser()
  }

  render() {
    return (
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item>
            <Title level={2} style={{ float: 'center', color: 'white' }}>Gym Buddies</Title>
          </Menu.Item>
          <Menu.Item style={{ float: 'right' }} onClick={this.handleLogout}>
            <Icon type="setting" theme="filled" spin="true" style={{ fontSize: 20}}/>
          </Menu.Item>
        </Menu>
      </Header>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => { dispatch(logoutUser()) },
  }
}

export default connect(null, mapDispatchToProps)(NavBar)