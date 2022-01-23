import React, { useState } from 'react'
import { Form, Input, Button, Layout, Typography, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'
import { fetchingLoginUser } from '../redux/actions/loginUser'
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'

const { Content } = Layout
const { Title } = Typography

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(fetchingLoginUser(username, password))
    navigate('/profile')
  }

  // const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
  // const { getFieldError, isFieldTouched } = this.props.form;
  // const usernameError = isFieldTouched('username') && getFieldError('username');
  // const passwordError = isFieldTouched('password') && getFieldError('password');    
  return (
    <Content 
      className="login-layout"
      style={{ height: '100%' }}    
    >
      <div className="login-background" 
        style={{
          height: '100%',
          position: 'relative',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          overflow: 'hidden'
        }}
      >
      <Row type="flex" justify="center">
          <Col span={6} style={{ marginTop: '250px', 
            marginBottom: '450px' }}>
          <Title 
            level={2} 
              style={{ textAlign: 'center', color: 'white', marginBottom: '15px' }}
          >
            User Login
          </Title>
          <Form onFinish={ handleSubmit } id="loginForm">
            <Form.Item
              // validateStatus={ usernameError ? 'error' : '' }
              // help={ usernameError || '' }
              name='username'
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Username" 
                onChange={ e => setUsername(e.target.value) }
              />
            </Form.Item>
            <Form.Item
              // validateStatus={passwordError ? 'error' : ''}
              // help={passwordError || ''}
              name='password'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input 
                prefix={<LockOutlined />} 
                type="password" 
                placeholder="Password" 
                onChange={ e => setPassword(e.target.value) }
              />
            </Form.Item>
            <Form.Item>
              <Button form="loginForm" type="primary" htmlType="submit" className="login-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      </div>
    </Content>
  )
}

// const mapStateToProps = state => {
//   return {
    // users: state.users,
    // currentUser: state.currentUser,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchingLoginUser: (username, password) => { dispatch(fetchingLoginUser(username, password)) }
//   }
// }

// const WrappedLogin = Form.create({ name: 'normal_login' })(Login);

// export default connect(mapStateToProps, mapDispatchToProps)(Login)
export default Login
