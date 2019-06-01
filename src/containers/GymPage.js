/* global google */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapsAPI } from '../constants/API'
import { fetchingUsers } from '../redux/actions/allUsers'
import { patchUserCheckin } from '../redux/actions/currentUser'
import { sendBuddyRequest, updateUserBuddies } from '../redux/actions/buddies'
import { Layout, Button, Drawer, Checkbox, Divider, List, Badge, Avatar, Icon, message, Popconfirm, Typography } from 'antd'
import { compose, withProps, withHandlers, withState, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { isEmpty } from 'lodash'

const { Content } = Layout
const { Text } = Typography

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapsAPI()}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '85vh', width: '98%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
  withState('places', 'updatePlaces', ''),
  withStateHandlers(() => ({
      isOpen: false,
    }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withHandlers(() => {
    const refs = {
      map: undefined,
    }

    return {
      onMapMounted: () => ref => {
        refs.map = ref
      },
      fetchPlaces: ({ updatePlaces }) => () => {
        const bounds = refs.map.getBounds()
        const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)
        const request = {
          bounds: bounds,
          type: ['gym']
        }
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            updatePlaces(results)
          }
        })
      }
    }
  }),
  
)((props) =>
  <GoogleMap
    onTilesLoaded={props.fetchPlaces}
    ref={props.onMapMounted}
    onBoundsChanged={props.fetchPlaces}
    defaultZoom={12}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
  >
    <Marker
      position={{ lat: props.latitude, lng: props.longitude }}
      icon={"https://img.icons8.com/color/48/000000/map-pin.png"}
      label="You are here"
    />
    {props.places && props.places.map((place, i) => {
      const onClick = props.onClick.bind(this, place)
      const onCheckinClick = props.onCheckinClick.bind(this, place)

      return (
      <Marker 
        key={i} 
        position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} 
        icon={require('../images/iconfinder_gym_38044.png')}
        onClick={onClick}
      >
        {props.selectedMarker === place &&
        <InfoWindow style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <h2>{place.name}</h2>
            <Button
              onClick={onCheckinClick}
              type="primary"
              shape="round"
              icon="check"
              size="small"
            >
              Show Check-ins
            </Button>
          </div>
        </InfoWindow>}
      </Marker>
      )
    })}
  </GoogleMap>
)

class GymPage extends Component {
  constructor(props) {
    super()
    this.state = {
      showMap: false,
      latitude: 0,
      longitude: 0,
      selectedMarker: false,
      showCheckinDrawer: false,
      checkedBuddies: [],
      checkedUsers: []
    }
  }

  success = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    this.setState({
      showMap: true,
      latitude,
      longitude,
    })
  }

  error = () => {
    console.log('Unable to retrieve your location')
  }

  getPosition = () => {
    navigator.geolocation.getCurrentPosition(this.success, this.error)
    this.props.fetchingUsers()
  }

  handleClick = (marker) => {
    this.setState({ selectedMarker: marker })
  }

  handleOnCheckinClick = (marker) => {
    this.setState({ 
      showCheckinDrawer: true,
      checkedBuddies: this.filterCheckedBuddies(),
      checkedUsers: this.filterCheckedUsers(),
    })
  }

  handleCheckin = () => {
    const { currentUser, patchUserCheckin } = this.props
    const { selectedMarker } = this.state
    if (currentUser.checkin !== selectedMarker.id) {
      currentUser.checkin = selectedMarker.id
      patchUserCheckin(currentUser)
    }
    else {
      currentUser.checkin = "null"
      patchUserCheckin(currentUser)
    }
  }

  onCloseDrawer = () => {
    this.setState({ 
      showCheckinDrawer: false,
      selectedMarker: false 
    })
  }

  filterCheckedUsers = () => {
    const { allUsers } = this.props
    const { selectedMarker } = this.state
    const checkedBuddies = this.filterCheckedBuddies()
    return allUsers.filter(user => user.checkin === selectedMarker.id && !checkedBuddies.find(buddy => buddy.id === user.id))
  }
  
  filterCheckedBuddies = () => {
    const { userBuddies } = this.props
    const { selectedMarker } = this.state
    const checkedBuddies = userBuddies.filter(user => this.pickBuddy(user).checkin === selectedMarker.id)
    return checkedBuddies.map(buddy => this.pickBuddy(buddy))
  }

  pickBuddy = buddy => {
    return buddy.requester.username === this.props.currentUser.username ? buddy.requestee : buddy.requester
  }

  sortNameList = checkedUsers => {
    return checkedUsers.sort((userA, userB) => {
      var buddyA = this.showBuddy(userA)
      var buddyB = this.showBuddy(userB)
      var nameA = buddyA.first_name.toUpperCase(); // ignore upper and lowercase
      var nameB = buddyB.first_name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    })
  }

  sendRequest = user => {
    const { currentUser, sendBuddyRequest, updateUserBuddies } = this.props
    const { checkedUsers, checkedBuddies } = this.state
    message.success(`Added ${user.first_name} to buddies!`);
    sendBuddyRequest(user, currentUser)
    updateUserBuddies({
      buddy: {
        requester_id: currentUser.id,
        requestee_id: user.id,
        buddy_type: "pending"
      },
      requester: {
        id: currentUser.id,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        username: currentUser.username,
        status: currentUser.status
      },
      requestee: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        status: user.status
      },
      messages: []
    })
    let updateUsers = checkedUsers.filter(checkedUser => checkedUser.id !== user.id)
    this.setState({
      checkedBuddies: [...checkedBuddies, user],
      checkedUsers: updateUsers
    })
  }

  render() {
    const { showMap, latitude, longitude, selectedMarker, showCheckinDrawer, checkedBuddies, checkedUsers } = this.state
    const { currentUser } = this.props
    return (
      <Layout style={{ background: "#fff" }}>
        <Content style={{ marginTop: "2vh" }}>
          <Drawer
            closable={true}
            title={selectedMarker.name}
            onClose={this.onCloseDrawer}
            visible={showCheckinDrawer}
          >
            <Checkbox
              checked={currentUser.checkin === selectedMarker.id}
              onChange={this.handleCheckin}
            >
              Check-In Here
            </Checkbox>
            <Divider />
            <h3>Buddies Checked-In</h3>
            {isEmpty(checkedBuddies)? <Text>No buddies at this Gym!</Text> :
              <List
                dataSource={checkedBuddies}
                renderItem={buddy => (
                  <List.Item style={{ padding: '1vh' }}>
                    <List.Item.Meta
                      style={{ alignItems: 'center' }}
                      title={`${buddy.first_name} ${buddy.last_name}`}
                      avatar={<Avatar style={{ color: '#0d5fe5', backgroundColor: '#b3cbf2', marginRight: '5px' }}>
                        {buddy.first_name[0]}
                        {buddy.last_name[0]}
                      </Avatar>}
                      description={<Badge
                        status={buddy.status === "offline" ? "default" : "success"}
                        text={buddy.status}
                      />}
                    />
                  </List.Item>
                )}
              />
            }
            <Divider />
            <h3>All Checked-In</h3>
            {isEmpty(checkedUsers)? <Text>No other users at this Gym!</Text> :
              <List
                dataSource={checkedUsers}
                renderItem={user => (
                  <List.Item style={{ padding: '1vh' }}>
                    <List.Item.Meta
                      style={{ alignItems: 'center' }}
                      title={`${user.first_name} ${user.last_name}`}
                      avatar={
                        <Popconfirm
                          title={`Add ${user.first_name} ${user.last_name} to buddies?`}
                          onConfirm={() => this.sendRequest(user)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Avatar style={{ color: '#306644', backgroundColor: '#71c490' }}>
                            <Icon type="user-add" />
                          </Avatar>
                        </Popconfirm>
                      }
                      description={<Badge
                        status={user.status === "offline" ? "default" : "success"}
                        text={user.status}
                      />}
                    />
                  </List.Item>
                )}
              />
            }
          </Drawer>
          {showMap ? 
            <MyMapComponent 
              selectedMarker={selectedMarker} 
              latitude={latitude} 
              longitude={longitude}
              onClick={this.handleClick}
              onCheckinClick={this.handleOnCheckinClick}
            /> 
            :
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button 
                onClick={this.getPosition} 
                type="primary" 
                shape="round" 
                icon="global"
                size="large"
                >Show Gyms Near Me</Button>
            </div>
          }
        </Content>
      </Layout>
    )
  }
}


const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    userBuddies: state.userBuddies,
    allUsers: state.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchingUsers: () => { dispatch(fetchingUsers()) },
    patchUserCheckin: (user) => { dispatch(patchUserCheckin(user)) },
    sendBuddyRequest: (user, currentUser) => { dispatch(sendBuddyRequest(user, currentUser)) },
    updateUserBuddies: (buddy) => { dispatch(updateUserBuddies(buddy)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GymPage)
