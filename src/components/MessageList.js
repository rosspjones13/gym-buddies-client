import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActionCableConsumer } from 'react-actioncable-provider';
import { receiveBuddyMessages } from '../redux/actions/messages'
import { isEmpty } from 'lodash'
import { Layout, List, Avatar, Row, Col } from 'antd'

const { Content } = Layout

class MessageList extends Component {
  scrollToBottom = () => {
    const { currentBuddy } = this.props
    if (!isEmpty(currentBuddy.messages)) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  formatDate(date) {
    let newD = new Date(date)
    return `${newD.toLocaleTimeString()} ${newD.toLocaleDateString()}`
  }

  handleReceivedMessage = newMessage => {
    const { receiveBuddyMessages, currentBuddy } = this.props
    receiveBuddyMessages(currentBuddy.buddy.id, newMessage)
  };
  
  render() {
    const { currentBuddy, userBuddies } = this.props
    return (
      <Content style={{ background: "#fff" }}>
        <ActionCableConsumer
          channel={{ channel: 'MessagesChannel', buddy: currentBuddy.buddy.id }}
          onReceived={this.handleReceivedMessage}
        />
        {isEmpty(currentBuddy.messages) ? null :
        <Row type="flex" align="top">
          <Col span={16} offset={4}>
            <div style={{ height: "75vh", overflow: "auto", display: "flex", flexDirection: "column-reverse" }}>
              <List
                style={{ maxWidth: "75em", justifySelf: 'center' }}
                dataSource={currentBuddy.messages}
                renderItem={message => (
                  <List.Item key={message.id}>
                    <List.Item.Meta
                      avatar={<Avatar style={{ color: '#0d5fe5', backgroundColor: '#b3cbf2' }}>{message.username.first_name[0]}</Avatar>}
                      title={message.content}
                      description={message.username.first_name}
                      />
                    <div>@{this.formatDate(message.created_at)}</div>
                    <div style={{ float: "left", clear: "both" }}
                      ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
        }
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentBuddy: state.currentBuddy,
    userBuddies: state.userBuddies,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    receiveBuddyMessages: (buddy_id, newMessage) => {dispatch(receiveBuddyMessages(buddy_id, newMessage))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
