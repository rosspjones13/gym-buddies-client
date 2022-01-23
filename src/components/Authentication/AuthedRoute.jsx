import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import UserNav from '../UserNav'
import MessageCable from '../../cables/MessageCable'

const AuthedRoute = () => {
  const currentUser = useSelector((state) => state.currentUser)
  return currentUser ? 
  <Fragment>
    <MessageCable />
    <UserNav />
    <Outlet />
  </Fragment>
  : <Navigate to="/login" />;
}

export default AuthedRoute;