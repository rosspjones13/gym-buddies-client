import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";
import { isEmpty } from "lodash";
// import { receiveBuddyMessages } from "../redux/actions/messages";
import { currentUserOnline } from "../redux/actions/currentUser";
import { currentUserOffline } from "../redux/actions/loginUser";

class MessageCable extends Component {
  // handleConnected = () => {
  //   const { currentUser, currentUserOnline } = this.props
  //   currentUser.status = "online"
  //   currentUserOnline(currentUser)
  // }

  handleReceivedStatus = (user) => {
    const { receiveUserStatus } = this.props;
    // receiveUserStatus(buddy_id, user);
  };

  render() {
    const { currentUser } = this.props;
    return isEmpty(currentUser) ? null : (
      <ActionCableConsumer
        channel={{ channel: "StatusChannel" }}
        onReceived={this.handleReceivedStatus}
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
    currentUserOffline: (user) => {
      dispatch(currentUserOffline(user));
    },
    // receiveUserStatus: (buddy_id, user) => {
    //   dispatch(receiveUserStatus(buddy_id, user));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageCable);
