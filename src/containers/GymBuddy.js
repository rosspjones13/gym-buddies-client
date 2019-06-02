import React, { Component, Fragment } from 'react'
import Login from '../components/Login'
import NavBar from '../components/NavBar'
import MessageCable from '../cables/MessageCable'
import UserPage from './UserPage'
import MessagePage from './MessagePage'
import SearchPage from './SearchPage'
import GymPage from './GymPage'
import UserNav from '../components/UserNav'
import { connect } from 'react-redux'
import { fetchingLoggedUser } from '../redux/actions/loginUser'
import { currentUserOnline, currentUserOffline } from '../redux/actions/currentUser'
import { receiveBuddyMessages } from '../redux/actions/messages'
import { ActionCableConsumer } from 'react-actioncable-provider';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Layout, Spin } from 'antd'

const { Footer } = Layout

class GymBuddy extends Component {
  componentDidMount(){
    this.props.fetchingLoggedUser()
  }

  // handleConnected = () => {
  //   const { currentUser, currentUserOnline } = this.props
  //   currentUser.status = "online"
  //   currentUserOnline(currentUser)
  // }

  handleReceivedMessage = newMessage => {
    const { receiveBuddyMessages, userBuddies } = this.props
    let recieveMessage = userBuddies.find(buddy => buddy.buddy.id === newMessage.buddy_id)
    receiveBuddyMessages(recieveMessage.buddy.id, newMessage)
  };

  render() {
    const { currentUser, loading } = this.props
    return (
      <Layout style={{ height: '100vh' }}>
        <NavBar />
        {loading ? 
        <Spin size="large" style={{ marginTop: '200px', height: '100vh' }}/>
        :
          <Layout style={{ background: 'white' }}>
            <MessageCable />
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/profile"/>}/>
              <Route exact path="/profile" render={() => {
                  return isEmpty(currentUser) ? <Redirect to="/login" /> : (
                    <Fragment>
                      <UserNav />
                      <UserPage />
                    </Fragment>
                  )
                }}
              />
              <Route path="/messages" render={() => {
                  return isEmpty(currentUser) ? <Redirect to="/login" /> : (
                    <Fragment>
                      <UserNav />
                      <MessagePage />
                    </Fragment>
                  )
                }}
              />
              <Route path="/search" render={() => {
                  return isEmpty(currentUser) ? <Redirect to="/login" /> : (
                    <Fragment>
                      <UserNav />
                      <SearchPage />
                    </Fragment>
                  )
                }}
              />
              <Route path="/gym-map" render={() => {
                  return isEmpty(currentUser) ? <Redirect to="/login" /> : (
                    <Fragment>
                      <UserNav />
                      <GymPage />
                    </Fragment>
                  )
                }}
              />
              <Route exact path="/login" render={() => {
                  return !isEmpty(currentUser) ? <Redirect to="/profile" /> : <Login />
                }}
              />
            </Switch>
          </Layout>
        }
        <Footer style={{ textAlign: 'center', padding: 0, background: '#021428', color: '#f2f2f3a6' }}>
          Gym Buddies ©2019 Created by The Boss
        </Footer>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    loading: state.loading,
    userBuddies: state.userBuddies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchingLoggedUser: () => { dispatch(fetchingLoggedUser()) },
    currentUserOnline: (user) => { dispatch(currentUserOnline(user)) },
    receiveBuddyMessages: (buddy_id, newMessage) => { dispatch(receiveBuddyMessages(buddy_id, newMessage)) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GymBuddy))