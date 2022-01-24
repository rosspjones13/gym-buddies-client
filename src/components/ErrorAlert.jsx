import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Alert } from "antd";

const ErrorAlert = () => {
  const showAlert = useSelector((state) => state.showAlert);

  return (
    <Fragment>
      {showAlert ? (
        <Alert
          message="Error"
          description="This is an error message about copywriting."
          type="error"
          showIcon
        />
      ) : null}
    </Fragment>
  );
};

export default ErrorAlert;
