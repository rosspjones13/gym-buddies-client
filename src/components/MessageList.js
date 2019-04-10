import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActionCableConsumer } from 'react-actioncable-provider';
import { receiveBuddyMessages } from '../redux/actions/messages'
import { Layout, List, Avatar, Row, Col } from 'antd'

const { Content } = Layout

class MessageList extends Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
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
    this.props.receiveBuddyMessages(newMessage)
  };

  findUserName = user_id => {
    debugger
    return user_id
  } 
  
  render() {
    const { currentBuddy } = this.props
    return (
      <Content style={{ background: "#fff" }}>
        <ActionCableConsumer
          channel={{ channel: 'MessagesChannel', buddy: currentBuddy.buddy.id }}
          onReceived={this.handleReceivedMessage}
        />
        <Row type="flex" align="top">
          <Col span={16} offset={4}>
            <div style={{ height: "60em", overflow: "auto", display: "flex", flexDirection: "column-reverse" }}>
              <List
                style={{ maxWidth: "75em", justifySelf: 'center' }}
                dataSource={currentBuddy.messages}
                renderItem={message => (
                  <List.Item key={message.id}>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
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
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentBuddy: state.currentBuddy
  }
}

const mapDispatchToProps = dispatch => {
  return {
    receiveBuddyMessages: (newMessage) => {dispatch(receiveBuddyMessages(newMessage))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
