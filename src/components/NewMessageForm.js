import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postNewMessage } from '../redux/actions/messages'
import { Layout, Form, Input, Button } from 'antd'

const { Footer } = Layout

class NewMessageForm extends Component {
  constructor() {
    super()
    this.state = {
      message: ""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { message } = this.state
    const { currentBuddy, postNewMessage, currentUser } = this.props
    const newMessage = { buddy_id: currentBuddy.buddy.id, user_id: currentUser.id, content: message }
    this.setState({
      message: ""
    })
    postNewMessage(newMessage)
  }

  render() {
    return (
      <Footer style={{ background: "#fff", textAlign: 'center' }}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input 
              style={{ width: "30em" }} 
              className="new-message" 
              placeholder="Start typing..."
              value={this.state.message}
              onChange={(e) => this.setState({message: e.target.value})}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="message-button">Send</Button>
          </Form.Item>
        </Form>
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