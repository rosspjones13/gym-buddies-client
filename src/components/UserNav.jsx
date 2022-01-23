import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import { receiveBuddyMessages } from '../redux/actions/messages'
import { currentUserOnline } from '../redux/actions/currentUser'
import { Layout, Menu } from 'antd'
import { CalendarTwoTone, MessageTwoTone, SmileTwoTone, EnvironmentTwoTone, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';

const { Sider } = Layout

const UserNav = () => {
  const dispatch = useDispatch();
  // const userBuddies = useSelector((state) => state.userBuddies)
  const currentUser = useSelector((state) => state.currentUser)

  const [menuCollapse, setMenuCollapse] = useState(false);

  // handleReceivedBuddy = () => {
  //   debugger
  //   const { receiveBuddyMessages, currentBuddy } = this.props
  //   receiveBuddyMessages(buddy_id, newMessage)
  // }

  // toggleMenu: () => { dispatch(toggleMenu()) },
  //   receiveBuddyMessages: (buddy_id, newMessage) => { dispatch(receiveBuddyMessages(buddy_id, newMessage)) },
  //   currentUserOnline: (user) => { dispatch(currentUserOnline(user)) }
  
  // const handleConnected = () => {
  //   // const { currentUser, currentUserOnline } = this.props
  //   currentUser.status = "online"
  //   dispatch(currentUserOnline(currentUser))
  // }

  useEffect(() => {
    if (currentUser.status !== "online") {
      dispatch(currentUserOnline(currentUser))
    }
  }, [dispatch, currentUser])

  // const { toggleMenu } = this.props
  return (
    <Fragment>
      <Sider
        trigger={null}
        collapsible
        collapsed={menuCollapse}
        style={{ height: '88vh', background: '#fff' }}
      >
        <Menu theme="light" mode="inline">
          <Menu.Item key="1">
            <Link to="/profile">
              <CalendarTwoTone twoToneColor="#f45642" style={{ fontSize: 24 }} />
              <span>My Workouts</span>
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="2" onClick={this.handleMessageClick}> */}
          <Menu.Item key="2">
            <Link to="/messages">
              <MessageTwoTone style={{ fontSize: 24 }}/>
              <span>Messages</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/search">
              <SmileTwoTone twoToneColor="#ccbe02" style={{ fontSize: 24 }}/>
              <span>Find Buddies</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/gym-map">
              <EnvironmentTwoTone twoToneColor="#52c41a" style={{ fontSize: 24 }}/>
              <span>Gym Check-in</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      {menuCollapse ?
        <CaretRightOutlined
          className="trigger"
          size="small"
          onClick={() => setMenuCollapse(false)}
          style={{ background: '#fff', maxHeight: 20, fontSize: 20, marginTop: '12px' }}
        /> :
        <CaretLeftOutlined
          className="trigger"
          size="small"
          onClick={() => setMenuCollapse(true)}
          style={{ background: '#fff', maxHeight: 20, fontSize: 20, marginTop: '12px' }} 
        />
      }
    </Fragment>
  )
}

// const mapStateToProps = state => {
//   return {
//     menuCollapse: state.menuCollapse,
//     userBuddies: state.userBuddies,
//     currentUser: state.currentUser
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     toggleMenu: () => { dispatch(toggleMenu()) },
//     receiveBuddyMessages: (buddy_id, newMessage) => { dispatch(receiveBuddyMessages(buddy_id, newMessage)) },
//     currentUserOnline: (user) => { dispatch(currentUserOnline(user)) }
//   }
// }

export default UserNav