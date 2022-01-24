import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewMessage } from "../redux/actions/messages";
import { Layout, Input } from "antd";

const { Footer } = Layout;
const Search = Input.Search;

class NewMessageForm extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
    };
  }

  handleSubmit = () => {
    const { message } = this.state;
    const { currentBuddy, postNewMessage, currentUser } = this.props;
    const newMessage = {
      buddy_id: currentBuddy.buddy.id,
      user_id: currentUser.id,
      content: message,
      read: false,
    };
    this.setState({
      message: "",
    });
    postNewMessage(newMessage);
  };

  render() {
    return (
      <Footer
        style={{
          background: "#fff",
          padding: "0px 0px 6vh",
        }}
      >
        <Search
          style={{ verticalAlign: 0 }}
          className="new-message"
          placeholder="Start typing..."
          enterButton="Send"
          value={this.state.message}
          onChange={(e) => this.setState({ message: e.target.value })}
          onSearch={() => this.handleSubmit()}
        />
      </Footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    userSubscription: state.userSubscription,
    currentBuddy: state.currentBuddy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postNewMessage: (newMessage) => {
      dispatch(postNewMessage(newMessage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageForm);
