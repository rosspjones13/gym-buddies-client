import React, { Component } from 'react'
import { connect } from 'react-redux'
import WorkoutCalendar from '../components/WorkoutCalendar'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { currentUserOnline } from '../redux/actions/currentUser'
import { Layout, Row, Col } from 'antd'

const { Content } = Layout

class UserPage extends Component {
  formatDate = (date) => {
    return new Date(date).toLocaleDateString()
  }

  // formatAchievement = (goal) => {
  //   if(goal.goal_type === "time"){
  //     let minutes = Math.floor(goal.measurable_achievement / 60)
  //     let seconds = goal.measurable_achievement - minutes * 60
  //     return `${minutes}:${seconds < 10 ? `0${seconds}`: seconds}/mile`
  //   }
  //   else {
  //     return `${goal.measurable_achievement}lbs`
  //   }
  // }

  handleConnected = () => {
    const { currentUser, currentUserOnline } = this.props
    currentUser.status = "online"
    currentUserOnline(currentUser)
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render() {
    return (
      <Layout style={{ background: '#fff'}}>
        <ActionCableConsumer
          channel={{ channel: 'BuddiesChannel' }}
          onConnected={this.handleConnected}
        />
        <Content style={{ alignSelf: 'center', textAlign: 'center' }}>
          <Row type="flex" justify="space-around" style={{ marginTop: '30px', justifyContent: 'middle' }}>
            {/* <Col span={3}>
              {userGoals.map(goal => {
                let goal_type = this.capitalizeFirstLetter(goal.goal_type) + ' Goal'
                return (
                  <Card
                    key={goal.id}
                    title={goal_type}
                    style={{ textAlign: 'center' }}
                    actions={[<Icon type="edit" />, <Icon type="ellipsis" />]}
                  >
                    <p>{this.formatAchievement(goal)}</p>
                    <p>by: {this.formatDate(goal.achieve_date)}</p>
                  </Card>
                )
              })}
            </Col> */}
            <Col span={20}>
              <WorkoutCalendar />
            </Col>
          </Row>
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
    currentUserOnline: (user) => { dispatch(currentUserOnline(user)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
