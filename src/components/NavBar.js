import React, { Component } from 'react'
import { Menu, Icon, Typography, Layout } from 'antd';
import '../App.css'

const { Header } = Layout
const { Title } = Typography

class NavBar extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px'}}
        >
          <Menu.Item>
            <Title level={2} style={{ float: 'center', color: 'white' }}>Gym Buddies</Title>
          </Menu.Item>
          <Menu.Item style={{ float: 'right' }}>
            <Icon type="setting" theme="filled"/>
          </Menu.Item>
        </Menu>
      </Header>
    )
  }
}

// const WrappedNavBar = Form.create({ name: 'normal_NavBar' })(NavBar);

export default NavBar