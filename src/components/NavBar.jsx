import React, { Fragment } from "react";
import { currentUserOffline, logoutUser } from "../redux/actions/loginUser";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { Button, Typography, Layout } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { clearError } from "../redux/actions/errors";

const { Header } = Layout;
const { Text } = Typography;

const NavBar = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);

  let navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    currentUser.status = "offline"
    dispatch(clearError())
    await dispatch(currentUserOffline(currentUser))
      .then((res) => {
        dispatch(logoutUser())
        navigate("/login");
      });
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 10vw",
      }}
    >
      <Text style={{ color: "white", fontSize: "2.5em", margin: 0 }}>
        My Gym Buddy
      </Text>
      <Fragment>
        {isEmpty(currentUser) ? (
          <Text
            style={{ color: "white", fontSize: "1.25em", whiteSpace: "nowrap" }}
          >
            Find a local gym buddy and reach your goals together!
          </Text>
        ) : (
          <div>
            <Text
              style={{ color: "white", fontSize: "1.25em", marginRight: "1vw" }}
            >
              Hi, {currentUser.first_name}!
            </Text>
            <Button onClick={handleLogout} type="primary" ghost>
              <Text style={{ color: "white" }}>Logout</Text>
              <LogoutOutlined style={{ color: "#0085fd", fontSize: 14 }} />
            </Button>
          </div>
        )}
      </Fragment>
    </Header>
  );
};

// const mapStateToProps = state => {
//   return {
//     currentUser: state.currentUser,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     currentUserOffline: (user) => { dispatch(currentUserOffline(user)) }
//   }
// }

export default NavBar;
