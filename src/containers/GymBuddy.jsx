import React, { useEffect } from 'react'
import Login from '../components/Login'
import NavBar from '../components/NavBar'
import UserPage from './UserPage'
import MessagePage from './MessagePage'
import SearchPage from './SearchPage'
import GymPage from './GymPage'
import { useSelector, useDispatch } from 'react-redux'
import { fetchingLoggedUser } from '../redux/actions/loginUser'
import { Route, Routes, Navigate } from 'react-router-dom'
// import { isEmpty } from 'lodash'
import { Layout, Spin } from 'antd'
import AuthedRoute from '../components/Authentication/AuthedRoute'

const { Footer } = Layout

const GymBuddy = () => {
  const dispatch = useDispatch();
  // const currentUser = useSelector((state) => state.currentUser)
  const loading = useSelector((state) => state.loading)
  // const userBuddies = useSelector((state) => state.userBuddies)

  useEffect(() => {
    dispatch(fetchingLoggedUser())
  }, [dispatch])

  // handleConnected = () => {
  //   const { currentUser, currentUserOnline } = this.props
  //   currentUser.status = "online"
  //   currentUserOnline(currentUser)
  // }

  // handleReceivedMessage = newMessage => {
  //   const { receiveBuddyMessages, userBuddies } = this.props
  //   let receiveMessage = userBuddies.find(buddy => buddy.buddy.id === newMessage.buddy_id)
  //   receiveBuddyMessages(recieveMessage.buddy.id, newMessage)
  // };
  return (
    <Layout style={{ height: '100vh' }}>
      <NavBar />
      {loading ?
      <Spin size="large" style={{ marginTop: '200px', height: '100vh' }}/>
      :
      <Layout style={{ background: '#fff' }}>
        <Routes>
          <Route element={<AuthedRoute />}>
            {/* <Route
              exact
              path="/"
              element={<Navigate to="/profile"/>}
            /> */}
            <Route 
              exact 
              path="/profile" 
              element={<UserPage />}
            />
            <Route 
              path="/messages" 
              element={<MessagePage />}
            />
            <Route 
              path="/search" 
              element={<SearchPage />}
            />
            <Route 
              path="/gym-map" 
              element={<GymPage />}
            />
          </Route>
          <Route 
            exact 
            path="/login"
            element={<Login/>}
          />
        </Routes>
      </Layout>
      }
      <Footer style={{ textAlign: 'center', padding: 0, background: '#021428', color: '#f2f2f3a6' }}>
        Gym Buddies ©
      </Footer>
    </Layout>
  )
}

// "husky": {
//   "hooks": {
//     "pre-commit": "npx lint-staged"
//   }
// },
// "lint-staged": {
//   "src/**/*.{js,jsx,json,css,md}": [
//     "prettier --write",
//     "eslint --fix-dry-run"
//   ]
// }

// const mapStateToProps = state => {
//   return {
//     currentUser: state.currentUser,
//     loading: state.loading,
//     userBuddies: state.userBuddies
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchingLoggedUser: () => { dispatch(fetchingLoggedUser()) },
//     currentUserOnline: (user) => { dispatch(currentUserOnline(user)) },
//     receiveBuddyMessages: (buddy_id, newMessage) => { dispatch(receiveBuddyMessages(buddy_id, newMessage)) }
//   }
// }

// const withRouter = (ConnectedComponent) => {
//   const withRouterComponent = (props) => (
//     <Route render={routeProps =>
//       <ConnectedComponent {...routeProps} {...props} />} />
//   );
//   return withRouterComponent;
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GymBuddy))
export default GymBuddy