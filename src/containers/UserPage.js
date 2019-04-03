import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleMenu } from '../redux/actions'
import { Layout, Icon } from 'antd'

const { Content } = Layout

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
