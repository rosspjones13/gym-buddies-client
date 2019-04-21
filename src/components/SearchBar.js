import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendBuddyRequest, updateUserBuddies } from '../redux/actions/buddies'
import { isEmpty } from 'lodash'
import { Row, Col, Icon, Input, Radio, Typography, Card, Avatar } from 'antd'

const { Meta } = Card
const { Title } = Typography
const Search = Input.Search

class SearchBar extends Component {
  constructor(props) {
    super()
    this.state = {
      searchType: "username",
      searchText: "",
      userResults: [],
      noResults: false
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
      noResults: isEmpty(usersFound) ? true : false
    })
  }

  sendRequest = user => {
    const { currentUser, sendBuddyRequest, updateUserBuddies } = this.props
    const { userResults } = this.state
    sendBuddyRequest(user, currentUser)
    updateUserBuddies({
      buddy: {
        requester_id: currentUser.id,
        requestee_id: user.id,
        buddy_type: "pending"
      },
      requester: {
        id: currentUser.id,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        username: currentUser.username,
        status: currentUser.status
      },
      requestee: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        status: user.status
      },
      messages: []
    })
    let updateResults = userResults.filter(result => result.id !== user.id)
    this.setState({
      userResults: updateResults
    })
  }

  filterUsers = () => {
    const { allUsers, currentUser, userBuddies } = this.props
    const { searchType, searchText } = this.state
    let myBuddyIds = []
    userBuddies.forEach(buddy => {
      if (currentUser.id === buddy.buddy.requestee_id) {
        myBuddyIds.push(buddy.requester.id)
      }
      else {
        myBuddyIds.push(buddy.requestee.id)
      }
    })
    let foundUsers = []
    if (searchType === "username") {
      foundUsers =  allUsers.filter(user =>user.username.toLowerCase().includes(searchText.toLowerCase()) && user.id !== currentUser.id)
    }
    else if (searchType === "location") {
      foundUsers = allUsers.filter(user => user.location === parseInt(searchText) && user.id !== currentUser.id)
    }
    else {
      foundUsers = allUsers.filter(user => user.id !== currentUser.id && (user.first_name.toLowerCase().includes(searchText.toLowerCase()) || user.last_name.toLowerCase().includes(searchText.toLowerCase())))
    }
    return foundUsers.filter(user => !myBuddyIds.includes(user.id))
  }

  render() {
    let { allUsers } = this.props
    let { searchType, userResults, searchText, noResults } = this.state
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
                style={{ marginTop: "20px", width: '60vw' }}
                value={searchText}
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
          {noResults ? <Title level={4} style={{ color: 'red' }}>No results or new buddies found!</Title> : null}
          {isEmpty(userResults) ?
            null
             :
            userResults.map(user => {
              return (
              <Col key={user.id} span={5} offset={2}>
                <Card
                  style={{ marginTop: "20px" }}
                  title={`${user.username}`}
                  extra={<Icon type="user-add" onClick={() => this.sendRequest(user)}/>}
                >
                  <Meta
                      avatar={<Avatar style={{ color: '#0d5fe5', backgroundColor: '#b3cbf2' }}>{user.first_name[0]}{user.last_name[0]}</Avatar>}
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
    sendBuddyRequest: (user, currentUser) => { dispatch(sendBuddyRequest(user, currentUser)) },
    updateUserBuddies: (buddy) => { dispatch(updateUserBuddies(buddy)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)