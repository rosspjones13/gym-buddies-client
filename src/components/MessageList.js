import React, { Component } from 'react'
import { connect } from 'react-redux'
// import ActionCable from 'action-cable-react-jwt'
import { currentUserSubscription } from '../redux/actions'
import { Layout, List, Avatar, Row, Col } from 'antd'
import NewMessageForm from './NewMessageForm';
import { ActionCableConsumer } from 'react-actioncable-provider';

const { Content } = Layout

class MessageList extends Component {
  // constructor(params) {
    
  // }
  formatDate(date) {
    let newD = new Date(date)
    return `${newD.toLocaleTimeString()} ${newD.toLocaleDateString()}`
  }

  handleReceivedMessage = response => {
    debugger
    
  };
  
  render() {
    const { buddyMessages } = this.props
    return (
      <Content style={{ background: "#fff" }}>
        <ActionCableConsumer
          channel={{ channel: 'MessagesChannel', buddy: buddyMessages.buddy_id }}
          onReceived={this.handleReceivedMessage}
        />
        <Row type="flex" align="top">
          <Col span={16} offset={4}>
            <div style={{ height: "60em", overflow: "auto", display: "flex", flexDirection: "column-reverse" }}>
              <List
                style={{ maxWidth: "75em", justifySelf: 'center' }}
                dataSource={buddyMessages.messages}
                renderItem={message => (
                  <List.Item key={message.id}>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={message.content}
                      description={"USER FIRSTNAME"}
                      />
                    <div>@{this.formatDate(message.created_at)}</div>
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
    buddyMessages: state.buddyMessages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
