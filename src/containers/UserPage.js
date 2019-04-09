import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Layout } from 'antd'


class UserPage extends Component {
  render() {
    return (
      <span>UserPage</span>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    collapsed: state.menuCollapse
  }
}

export default connect(mapStateToProps)(UserPage)
