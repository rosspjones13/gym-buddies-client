import React, { useState } from "react";
import { Form, Input, Button, Layout, Typography, Row, Col, notification, Card } from "antd";
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
const { Title, Text } = Typography;

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
      {/* <div
        // className="login-background"
        style={{
          height: "100%",
          position: "relative",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      > */}
        <Row 
          // type="flex"
          justify="center"
          align="middle"
          style={{
            height: "100%",
            width: "100%",
            background: "#ececec",
          }}
        >
          <Col span={8} textAlign="left" style={{ padding: "20px" }}>
            <Title
              level={1}
              style={{
                // textAlign: "center",
                color: "#080058",
                marginBottom: "40px",
              }}
            >
              My Gym Buddy
            </Title>
            <Text
              style={{ 
                color: "#000000", 
                fontSize: "1.25em", 
                // whiteSpace: "nowrap"
              }}
            >
            Find a local gym buddy and reach your goals together!
            </Text>
          </Col>
          <Col span={8}>
            <Card style={{ 
              width: "100%",
              boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)",
              borderRadius: "8px",
              textAlign: "center"
            }}>
              <Form onFinish={handleSubmit} id="loginForm">
                <Form.Item
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
                    style={{ 
                      width: "100%",
                      borderRadius: "8px"
                    }}
                  >
                    Log In
                  </Button>
                </Form.Item>
                <div style={{ "borderBottom": "1px solid #dadde1"}}></div>
                <Button
                    style={{ 
                      width: "80%",
                      borderRadius: "8px",
                      marginTop: "24px"
                    }}
                  >
                    Create new account
                  </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      {/* </div> */}
    </Content>
  );
};

export default Login;
