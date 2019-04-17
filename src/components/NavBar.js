import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions/loginUser'
import { currentUserOffline } from '../redux/actions/loginUser'
import { isEmpty } from 'lodash'
import { Button, Icon, Typography, Layout, Row, Col } from 'antd';

const { Header } = Layout
const { Title, Text } = Typography

class NavBar extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleLogout = () => {
    const { currentUser, currentUserOffline} = this.props
    localStorage.clear()
    currentUser.status = "offline"
    currentUserOffline(currentUser)
  }

  render() {
    const { currentUser } = this.props
    return (
      <Header className="header">
        <Row type="flex" justify="space-between" align="middle">
          <Col span={12} offset={2}>
            <Title level={2} style={{ color: 'white' }}>
              Gym Buddies
            </Title>
          </Col>
          {isEmpty(currentUser) ? 
            <Col span={6}>
              <Text style={{ color: 'white', whiteSpace: 'nowrap' }}>
                Find a local gym buddy and reach your goals together!
              </Text>
            </Col>
            :
            <Col span={2} onClick={this.handleLogout}>
              <Button type="primary" ghost>
                <Text style={{ color: 'white' }}>
                  Logout
                </Text>
                <Icon
                  type="logout" 
                  style={{ color: '#0085fd', fontSize: 14 }} 
                />
              </Button>
            </Col>
          }
        </Row>
      </Header>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // logoutUser: () => { dispatch(logoutUser()) },
    currentUserOffline: (user) => { dispatch(currentUserOffline(user)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)