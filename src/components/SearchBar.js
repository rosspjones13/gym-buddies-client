import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { sendBuddyRequest, updateUserBuddies } from "../redux/actions/buddies";
import { isEmpty } from "lodash";
import {
  Input,
  Radio,
  Typography,
  Card,
  Avatar,
  Badge,
  Popconfirm,
  message,
} from "antd";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Title } = Typography;
const Search = Input.Search;

class SearchBar extends Component {
  constructor(props) {
    super();
    this.state = {
      searchType: "username",
      searchText: "",
      userResults: [],
      noResults: false,
    };
  }

  onInputChange = (value) => {
    this.setState({
      searchText: value.target.value,
    });
  };

  onSearchChange = (value) => {
    this.setState({
      searchType: value.target.value,
    });
  };

  handleSearch = (value) => {
    let usersFound = this.filterUsers();

    this.setState({
      searchText: "",
      userResults: usersFound,
      noResults: isEmpty(usersFound) ? true : false,
    });
  };

  sendRequest = (user) => {
    const { currentUser, sendBuddyRequest, updateUserBuddies } = this.props;
    const { userResults } = this.state;
    message.success(`Added ${user.first_name} to buddies!`);
    sendBuddyRequest(user, currentUser);
    updateUserBuddies({
      buddy: {
        requester_id: currentUser.id,
        requestee_id: user.id,
        buddy_type: "pending",
      },
      requester: {
        id: currentUser.id,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        username: currentUser.username,
        status: currentUser.status,
      },
      requestee: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        status: user.status,
      },
      messages: [],
    });
    let updateResults = userResults.filter((result) => result.id !== user.id);
    this.setState({
      userResults: updateResults,
    });
  };

  filterUsers = () => {
    const { allUsers, currentUser, userBuddies } = this.props;
    const { searchType, searchText } = this.state;
    let myBuddyIds = [];
    userBuddies.forEach((buddy) => {
      if (currentUser.id === buddy.buddy.requestee_id) {
        myBuddyIds.push(buddy.requester.id);
      } else {
        myBuddyIds.push(buddy.requestee.id);
      }
    });
    let foundUsers = [];
    if (searchType === "username") {
      foundUsers = allUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(searchText.toLowerCase()) &&
          user.id !== currentUser.id
      );
    } else {
      foundUsers = allUsers.filter(
        (user) =>
          user.id !== currentUser.id &&
          (user.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchText.toLowerCase()))
      );
    }
    return foundUsers.filter((user) => !myBuddyIds.includes(user.id));
  };

  render() {
    let { allUsers } = this.props;
    let { searchType, userResults, searchText, noResults } = this.state;
    return (
      <Fragment>
        <div>
          <p>Search By:</p>
          <Radio.Group
            style={{ marginLeft: "20px" }}
            onChange={this.onSearchChange}
            defaultValue="username"
          >
            <Radio.Button value="username">Username</Radio.Button>
            <Radio.Button value="full name">Full Name</Radio.Button>
          </Radio.Group>
        </div>
        {isEmpty(allUsers) ? null : (
          <Search
            placeholder={`Search by ${searchType}...`}
            style={{ marginTop: "20px", width: "60vw" }}
            value={searchText}
            onChange={this.onInputChange}
            onSearch={this.handleSearch}
            enterButton="Find"
            size="large"
            suffix={<SearchOutlined />}
          />
        )}
        {noResults ? (
          <Title level={4} style={{ color: "red" }}>
            No results or new buddies found!
          </Title>
        ) : null}
        {isEmpty(userResults) ? null : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {userResults.map((user) => {
              return (
                <Card
                  key={user.id}
                  style={{
                    width: "30%",
                    boxSizing: "border-box",
                    margin: "1em",
                  }}
                  title={`${user.first_name} ${user.last_name}`}
                  extra={
                    <Popconfirm
                      title={`Add ${user.first_name} ${user.last_name} to buddies?`}
                      onConfirm={() => this.sendRequest(user)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Avatar
                        style={{ color: "#306644", backgroundColor: "#71c490" }}
                      >
                        <UserAddOutlined />
                      </Avatar>
                    </Popconfirm>
                  }
                >
                  <Meta
                    avatar={
                      <Avatar
                        style={{ color: "#0d5fe5", backgroundColor: "#b3cbf2" }}
                      >
                        {user.first_name[0]}
                        {user.last_name[0]}
                      </Avatar>
                    }
                    title={`@${user.username}`}
                    description={
                      <Badge
                        status={
                          user.status === "offline" ? "default" : "success"
                        }
                        text={user.status}
                      />
                    }
                  />
                </Card>
              );
            })}
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    userBuddies: state.userBuddies,
    currentBuddy: state.currentBuddy,
    allUsers: state.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendBuddyRequest: (user, currentUser) => {
      dispatch(sendBuddyRequest(user, currentUser));
    },
    updateUserBuddies: (buddy) => {
      dispatch(updateUserBuddies(buddy));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
