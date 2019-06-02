import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { receiveBuddyMessages } from '../redux/actions/messages'
import Message from './Message'
import { isEmpty } from 'lodash'
import { Layout, List } from 'antd'

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

  render() {
    const { currentBuddy } = this.props
    return (
      <Content style={{ background: "#fff" }}>
        {isEmpty(currentBuddy.messages) ? null :
        <Fragment>
          <div style={{ height: "77vh", overflow: "auto", display: "flex", flexDirection: "column-reverse" }}>
            <List
              style={{ justifySelf: 'center' }}
              dataSource={currentBuddy.messages}
              renderItem={message => (
                <Message message={message} />
              )}
            />
          </div>
          <div style={{ float: "left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </Fragment>
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
