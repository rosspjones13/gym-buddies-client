import React, { useState } from "react";
import { Form, Input, Button, Layout, Typography, Row, Col, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  fetchingLoginUser,
  fetchedLoginUser,
} from "../redux/actions/loginUser";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { clearError, errorMessage } from "../redux/actions/errors";

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(clearError())
    await dispatch(fetchingLoginUser(username, password))
      .then((res) => {
        if (res.data.authenticated) {
          // dispatch(push('/profile'))
          localStorage.setItem("token", res.data.token);
          document.cookie = `token=${res.data.token}`;
          dispatch(fetchedLoginUser(res.data.user));
        }
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 406) {
          notification['error']({
            message: err.response.data.message,
            // description:
            //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          });
          dispatch(errorMessage(err.response.data.message));
        } else {
          notification['error']({
            message: "Error Logging In ",
            // description: err
          });
          dispatch(errorMessage("Error Logging In "));
        }
      });
  };

  // const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
  // const { getFieldError, isFieldTouched } = this.props.form;
  // const usernameError = isFieldTouched('username') && getFieldError('username');
  // const passwordError = isFieldTouched('password') && getFieldError('password');
  return (
    <Content className="login-layout" style={{ height: "100%" }}>
      <div
        className="login-background"
        style={{
          height: "100%",
          position: "relative",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <Row type="flex" justify="center">
          <Col span={6} style={{ marginTop: "250px", marginBottom: "450px" }}>
            <Title
              level={2}
              style={{
                textAlign: "center",
                color: "white",
                marginBottom: "15px",
              }}
            >
              User Login
            </Title>
            <Form onFinish={handleSubmit} id="loginForm">
              <Form.Item
                // validateStatus={ usernameError ? 'error' : '' }
                // help={ usernameError || '' }
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                // validateStatus={passwordError ? 'error' : ''}
                // help={passwordError || ''}
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  form="loginForm"
                  type="primary"
                  htmlType="submit"
                  className="login-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default Login;
