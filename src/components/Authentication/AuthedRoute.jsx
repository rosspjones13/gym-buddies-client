import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isEmpty } from "lodash";
import UserNav from "../UserNav";
import MessageCable from "../../cables/MessageCable";

const AuthedRoute = () => {
  const currentUser = useSelector((state) => state.currentUser);
  return isEmpty(currentUser) ? (
    <Navigate to="/login" />
  ) : (
    <Fragment>
      <MessageCable />
      <UserNav />
      <Outlet />
    </Fragment>
  );
};

export default AuthedRoute;
