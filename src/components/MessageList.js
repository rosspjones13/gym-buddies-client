import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { currentBuddyMessages } from '../redux/actions'
import InfiniteScroll from 'react-infinite-scroller';
import { Layout, Form, Input, Button, List, Avatar, Row, Col } from 'antd'

const { Content, Footer } = Layout

class MessageList extends Component {

  formatDate(date) {
    let newD = new Date(date)
    return `${newD.toLocaleTimeString()} ${newD.toLocaleDateString()}`
  }
  
  render() {
    const { buddyMessages } = this.props
    return (
      <Layout style={{ background: "#fff" }}>
        <Row>
          <Col span={16} offset={4}>
            <Content type="flex" style={{ background: "#fff", height: "50em" }}>
                  <List
                    style={{ maxWidth: "75em", justifySelf: 'center' }}
                    dataSource={buddyMessages}
                    renderItem={message => (
                      <List.Item key={message.id}>
                        <List.Item.Meta
                          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                          title={message.content}
                          description={"USER FIRSTNAME"}
                        />
                        <div>@{this.formatDate(message.created_at)}</div>
                      </List.Item>
                    )}
                  />

            </Content>
            <Footer style={{ background: "#fff" }}>
              <Form layout="inline">
                <Form.Item>
                  <Input style={{ width: "50em" }} className="new-message" placeholder="Start typing..." />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="message-button">Send</Button>
                </Form.Item>
              </Form>
            </Footer>
          </Col>
        </Row>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    buddyMessages: state.buddyMessages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // currentBuddyMessages: (messages) => { dispatch(currentBuddyMessages(messages)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
