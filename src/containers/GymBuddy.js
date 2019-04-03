import React, { Component } from 'react'
import Login from '../components/Login'
import NavBar from '../components/NavBar'
import UserPage from './UserPage'
import { connect } from 'react-redux'
import { fetchingUsers } from '../redux/actions'
import { isEmpty } from 'lodash'
import { Layout } from 'antd'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'

class GymBuddy extends Component {
  componentDidMount(){
    this.props.fetchingUsers()
  }

  render() {
    const { currentUser } = this.props
    return (
      <Layout>
        <NavBar />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/profile"/>}/>
          <Route exact path="/profile" render={() => {
              return isEmpty(currentUser) ? <Redirect to="/login" /> : <UserPage />
            }}
          />
          <Route exact path="/login" render={() => {
              return !isEmpty(currentUser) ? <Redirect to="/profile" /> : <Login />
            }}
          />
        </Switch>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchingUsers: () => { dispatch(fetchingUsers()) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GymBuddy))