import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";
import { isEmpty } from "lodash";
import { receiveBuddyMessages } from "../redux/actions/messages";
import { currentUserOnline } from "../redux/actions/currentUser";

class MessageCable extends Component {
  // handleConnected = () => {
  //   const { currentUser, currentUserOnline } = this.props
  //   currentUser.status = "online"
  //   currentUserOnline(currentUser)
  // }

  handleReceivedMessage = (newMessage) => {
    const { receiveBuddyMessages } = this.props;
    receiveBuddyMessages(newMessage.message.buddy_id, newMessage.message);
  };

  render() {
    const { currentUser } = this.props;
    return isEmpty(currentUser) ? null : (
      <ActionCableConsumer
        channel={{ channel: "MessagesChannel", user: currentUser.id }}
        onReceived={this.handleReceivedMessage}
        // onConnected={this.handleConnected}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    userBuddies: state.userBuddies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    currentUserOnline: (user) => {
      dispatch(currentUserOnline(user));
    },
    receiveBuddyMessages: (buddy_id, message) => {
      dispatch(receiveBuddyMessages(buddy_id, message));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageCable);
