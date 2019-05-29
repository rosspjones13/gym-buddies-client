import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
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
      <Header 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10vw' }}
      >
        <Text
          style={{ color: 'white', fontSize: '2.5em', margin: 0 }}
        >
          Gym Buddies
        </Text>
        <Fragment>
          {isEmpty(currentUser) ? 
            <Text style={{ color: 'white', fontSize: '1.25em', whiteSpace: 'nowrap' }}>
              Find a local gym buddy and reach your goals together!
            </Text>
            :
            <div>
              <Text style={{ color: 'white', fontSize: '1.25em', marginRight: '1vw' }}>
                Hi, {currentUser.first_name}!
              </Text>
              <Button onClick={this.handleLogout} type="primary" ghost>
                <Text style={{ color: 'white' }}>
                  Logout
                </Text>
                <Icon
                  type="logout" 
                  style={{ color: '#0085fd', fontSize: 14 }} 
                  />
              </Button>
            </div>
          }
        </Fragment>
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
    currentUserOffline: (user) => { dispatch(currentUserOffline(user)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)