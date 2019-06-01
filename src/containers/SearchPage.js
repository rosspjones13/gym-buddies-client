import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchBar from '../components/SearchBar'
import { fetchingUsers } from '../redux/actions/allUsers'
import { Layout, Typography } from 'antd'

const { Content } = Layout
const { Title } = Typography

class SearchPage extends Component {
  componentDidMount() {
    this.props.fetchingUsers()
  }

  handleReceivedBuddy = response => {
    console.log('received buddy info')
  }

  render() {
    return (
      <Layout style={{ background: "#fff" }}>
        <Content style={{ alignSelf: 'center', textAlign: 'center' }}>
          <Title level={4}>Find a Workout Buddy</Title>
          {/* <Requests /> */}
          <SearchBar />
        </Content>
      </Layout>
    )
  }
}


const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchingUsers: () => { dispatch(fetchingUsers()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)