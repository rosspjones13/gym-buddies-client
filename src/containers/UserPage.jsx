import React from "react";
import WorkoutCalendar from "../components/WorkoutCalendar";
import { Layout } from "antd";

const { Content } = Layout;

const UserPage = () => {
  // const formatDate = (date) => {
  //   return new Date(date).toLocaleDateString();
  // };

  // const capitalizeFirstLetter = (string) => {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // };

  return (
    <Layout style={{ background: "#fff" }}>
      <Content style={{ textAlign: "center" }}>
        <WorkoutCalendar />
      </Content>
    </Layout>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.currentUser,
//     userBuddies: state.userBuddies,
//     collapsed: state.menuCollapse,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

export default UserPage;
