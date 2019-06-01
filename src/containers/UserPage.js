import React, { Component } from 'react'
import { connect } from 'react-redux'
import WorkoutCalendar from '../components/WorkoutCalendar'
import { Layout } from 'antd'

const { Content } = Layout

class UserPage extends Component {
  formatDate = (date) => {
    return new Date(date).toLocaleDateString()
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render() {
    return (
      <Layout style={{ background: '#fff' }}>
        <Content style={{ textAlign: 'center' }}>
          <WorkoutCalendar />
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    userBuddies: state.userBuddies,
    collapsed: state.menuCollapse
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
