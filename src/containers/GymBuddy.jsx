import React, { useEffect } from "react";
import Login from "../components/Login";
import NavBar from "../components/NavBar";
import UserPage from "./UserPage";
import MessagePage from "./MessagePage";
import SearchPage from "./SearchPage";
import GymPage from "./GymPage";
import { useSelector, useDispatch } from "react-redux";
import { fetchingLoggedUser, currentUser } from "../redux/actions/loginUser";
import { Route, Routes, useNavigate } from "react-router-dom";
// import { isEmpty } from 'lodash'
import { Layout, Spin } from "antd";
import AuthedRoute from "../components/Authentication/AuthedRoute";

const { Footer } = Layout;

const GymBuddy = () => {
  const dispatch = useDispatch();
  // const currentUser = useSelector((state) => state.currentUser)
  const loading = useSelector((state) => state.loading);
  const currentUser = useSelector((state) => state.currentUser);
  // const userBuddies = useSelector((state) => state.userBuddies)

  let navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && !currentUser) {
      const fetchUser = async () => {
        await dispatch(fetchingLoggedUser(token))
        .then((res) => {
          document.cookie = `token=${token}`;
          dispatch(currentUser(res.data));
          navigate('/profile')
        });
      }
      fetchUser()
    }
  }, [dispatch, navigate, currentUser]);

  // handleConnected = () => {
  //   const { currentUser, currentUserOnline } = this.props
  //   currentUser.status = "online"
  //   currentUserOnline(currentUser)
  // }

  // handleReceivedMessage = newMessage => {
  //   const { receiveBuddyMessages, userBuddies } = this.props
  //   let receiveMessage = userBuddies.find(buddy => buddy.buddy.id === newMessage.buddy_id)
  //   receiveBuddyMessages(recieveMessage.buddy.id, newMessage)
  // };
  return (
    <Layout style={{ height: "100vh", fontFamily: '"Monsterrat", sans-serif' }}>
      <NavBar />
      {loading ? (
        <Spin size="large" style={{ marginTop: "200px", height: "100vh" }} />
      ) : (
        <Layout style={{ background: "#fff" }}>
          <Routes>
            <Route element={<AuthedRoute />}>
              {/* <Route
              exact
              path="/"
              element={<Navigate to="/profile"/>}
            /> */}
              <Route exact path="/profile" element={<UserPage />} />
              <Route path="/messages" element={<MessagePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/gym-map" element={<GymPage />} />
            </Route>
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Layout>
      )}
      <Footer
        style={{
          textAlign: "center",
          padding: 0,
          background: "#080058",
          color: "#FFFFFF",
        }}
      >
        My Gym Buddy ©
      </Footer>
    </Layout>
  );
};

export default GymBuddy;
