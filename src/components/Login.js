import React, { Component } from 'react'
import { Form, Icon, Input, Button, Layout, Typography, Row, Col } from 'antd';
import { connect } from 'react-redux'
import { fetchingLoginUser } from '../redux/actions/currentUser'

const { Content } = Layout
const { Title } = Typography

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.fetchingLoginUser(this.state.username, this.state.password)
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');    
    return (
      <Row type="flex" justify="center">
        <Col span={6}>
          <Content className="login-layout" style={{ marginTop: '250px', marginBottom: '450px', background: 'clear', padding: '0 50px' }}>
            <Title 
              level={2} 
              style={{ textAlign: 'center', color: 'black', marginBottom: '15px' }}
            >
              User Login
            </Title>
            <Form onSubmit={ this.handleSubmit } id="loginForm">
              <Form.Item
                validateStatus={ usernameError ? 'error' : '' }
                help={ usernameError || '' }
              >
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input 
                    prefix={<Icon type="user" />} 
                    placeholder="Username" 
                    onChange={ e => this.setState({ username: e.target.value }) }
                  />
                )}
              </Form.Item>
              <Form.Item
                validateStatus={passwordError ? 'error' : ''}
                help={passwordError || ''}
              >
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input 
                    prefix={ <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} /> } 
                    type="password" 
                    placeholder="Password" 
                    onChange={ e => this.setState({ password: e.target.value }) }
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button form="loginForm" type="primary" htmlType="submit" className="login-button">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    // users: state.users,
    // currentUser: state.currentUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchingLoginUser: (username, password) => { dispatch(fetchingLoginUser(username, password)) }
  }
}

const WrappedLogin = Form.create({ name: 'normal_login' })(Login);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLogin)
