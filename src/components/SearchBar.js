import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { Row, Col, Icon, Input, Radio, Typography, Card, Avatar } from 'antd'

const { Meta } = Card
const { Text } = Typography
const Search = Input.Search

class SearchBar extends Component {
  constructor(props) {
    super()
    this.state = {
      searchType: "username",
      searchText: "",
      userResults: []
    }
  }

  onInputChange = value => {
    this.setState({
      searchText: value.target.value
    })
  }

  onSearchChange = value => {
    this.setState({
      searchType: value.target.value
    })
  }

  handleSearch = value => {
    let usersFound = this.filterUsers()
    
    this.setState({
      searchText: "",
      userResults: usersFound,
      loading: false
    })
  }

  filterUsers = () => {
    const { allUsers, currentUser } = this.props
    const { searchType, searchText } = this.state
    if (searchType === "username") {
      return allUsers.filter(user => user.username.toLowerCase().includes(searchText.toLowerCase()) && user.id !== currentUser.id)
    }
    else if (searchType === "location") {
      return allUsers.filter(user => user.location === parseInt(searchText) && user.id !== currentUser.id)
    }
    else {
      return allUsers.filter(user => user.id !== currentUser.id && (user.first_name.toLowerCase().includes(searchText.toLowerCase()) || user.last_name.toLowerCase().includes(searchText.toLowerCase())))
    }
  }

  render() {
    let { currentBuddy, currentUser, allUsers } = this.props
    let { searchType, userResults } = this.state
    return (
      <Col style={{ marginTop: '20px' }}>
        <Row>
          <Col span={24}>
            Search By:
            <Radio.Group 
              style={{ marginLeft: '20px' }}
              onChange={this.onSearchChange} 
              defaultValue="username"
            >
              <Radio.Button value="username">Username</Radio.Button>
              <Radio.Button value="full name">Full Name</Radio.Button>
              <Radio.Button value="location">Zip Code</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          {isEmpty(allUsers) ? null :
            <Col span={24}>
              <Search
                placeholder={`Search by ${searchType}...`}
                style={{ marginTop: "20px" }}
                onChange={this.onInputChange}
                onSearch={this.handleSearch}
                enterButton="Find" 
                size="large"
                suffix={<Icon type="search"/>}
              />
            </Col>
          }
        </Row>
        <Row type="flex">
          {isEmpty(userResults) ?
            null
             :
            userResults.map(user => {  
              return (
              <Col key={user.id} span={8}>
                <Card
                  style={{ marginTop: "20px" }}
                  title={`${user.username}`}
                  extra={<Icon type="user-add" onClick={this.sendRequest}/>}
                >
                  <Meta
                    avatar={<Avatar style={{ color: '#0d5fe5', backgroundColor: '#b3cbf2' }}>{user.first_name[0]}</Avatar>}
                    title={`${user.first_name} ${user.last_name}`}
                    description={`Zip: ${user.location}`}
                  />
                </Card>
              </Col>
              )
            })
          }
        </Row>
      </Col>
    )
  }
}


const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    userBuddies: state.userBuddies,
    currentBuddy: state.currentBuddy,
    allUsers: state.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // fetchingcurrentBuddy: (buddy) => { dispatch(fetchingcurrentBuddy(buddy)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)