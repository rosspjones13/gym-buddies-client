import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postNewMessage } from '../redux/actions/messages'
import { Layout, Input, Row, Col } from 'antd'

const { Footer } = Layout
const Search = Input.Search

class NewMessageForm extends Component {
  constructor() {
    super()
    this.state = {
      message: ""
    }
  }

  handleSubmit = () => {
    const { message } = this.state
    const { currentBuddy, postNewMessage, currentUser } = this.props
    const newMessage = { buddy_id: currentBuddy.buddy.id, user_id: currentUser.id, content: message, read: false }
    this.setState({
      message: ""
    })
    postNewMessage(newMessage)
  }

  render() {
    return (
      <Footer 
        style={{ background: "#fff", textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}
      >
        <Row>
          <Col span={20} offset={2}>
            <Search 
              className="new-message" 
              placeholder="Start typing..."
              enterButton="Send"
              value={this.state.message}
              onChange={(e) => this.setState({message: e.target.value})}
              onSearch={() => this.handleSubmit()}
            />
          </Col>
        </Row>
      </Footer>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    userSubscription: state.userSubscription,
    currentBuddy: state.currentBuddy
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postNewMessage: (newMessage) => { dispatch(postNewMessage(newMessage)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageForm)