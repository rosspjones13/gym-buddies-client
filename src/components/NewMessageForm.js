import React, { Component } from 'react'
import { connect } from 'react-redux'
import { currentUserSubscription } from '../redux/actions'
import { postNewMessage } from '../redux/actions'
import { Layout, Form, Input, Button, Row, Col } from 'antd'

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
    const { buddyMessages, postNewMessage, currentUser } = this.props
    const newMessage = { buddy_id: buddyMessages.buddy_id, user_id: currentUser.id, content: message }
    postNewMessage(newMessage)
  }

  render() {
    return (
      <Footer style={{ background: "#fff" }}>
        <Row type="flex">
          <Col span={16} offset={4}>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Form.Item>
                <Input 
                  style={{ width: "50em" }} 
                  className="new-message" 
                  placeholder="Start typing..."
                  onChange={(e) => this.setState({message: e.target.value})}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="message-button">Send</Button>
              </Form.Item>
            </Form>
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
    buddyMessages: state.buddyMessages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    currentUserSubscription: (message) => { dispatch(currentUserSubscription(message)) },
    postNewMessage: (newMessage) => { dispatch(postNewMessage(newMessage)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageForm)