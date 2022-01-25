import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "antd";
import { clearError } from "../redux/actions/errors";

const ErrorAlert = () => {
  const { show, message } = useSelector((state) => state.error);
  const dispatch = useDispatch();

  return (
    <Fragment>
      {show ? (
        <Alert
          message={message}
          type="error"
          closable
          banner
          onClose={() => dispatch(clearError())}
        />
      ) : null}
    </Fragment>
  );
};

export default ErrorAlert;
