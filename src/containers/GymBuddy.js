import React, { Component, Fragment } from 'react'
import Login from '../components/Login'
import NavBar from '../components/NavBar'
import UserPage from './UserPage'
import MessagePage from './MessagePage'
import UserNav from '../components/UserNav'
import { connect } from 'react-redux'
import { fetchingLoggedUser } from '../redux/actions'
import { isEmpty } from 'lodash'
import { Layout, Spin } from 'antd'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'

const { Footer } = Layout

class GymBuddy extends Component {
  componentDidMount(){
    this.props.fetchingLoggedUser()
  }

  render() {
    const { currentUser, loading } = this.props
    return (
      <Layout style={{ height: '100vh' }}>
        <NavBar />
        {loading ? 
        <Spin size="large" style={{ marginTop: '200px', height: '100vh' }}/>
        :
          <Layout style={{ background: 'white' }}>
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
              <Route exact path="/messages" render={() => {
                  return isEmpty(currentUser) ? <Redirect to="/login" /> : (
                    <Fragment>
                      <UserNav />
                      <MessagePage />
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
        <Footer style={{ textAlign: 'center', background: '#fff' }}>
          Gym Buddies ©2019 Created by The Boss
        </Footer>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchingLoggedUser: () => { dispatch(fetchingLoggedUser()) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GymBuddy))