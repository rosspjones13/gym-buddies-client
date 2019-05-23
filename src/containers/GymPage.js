/* global google */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapsAPI } from '../constants/API'
import { Layout, Button, Drawer, Checkbox, Divider } from 'antd'
import { compose, withProps, withHandlers, withState, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"

const { Content } = Layout

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapsAPI()}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `80vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
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
        let places
        const bounds = refs.map.getBounds()
        const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)
        const request = {
          bounds: bounds,
          type: ['gym']
        }
        service.nearbySearch(request, (results, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
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
  }

  handleClick = (marker) => {
    this.setState({ selectedMarker: marker })
  }

  handleOnCheckinClick = (marker) => {
    this.setState({ showCheckinDrawer: marker })
  }

  handleCheckin = () => {
    console.log("check")
  }

  onCloseDrawer = () => {
    this.setState({ showCheckinDrawer: false })
  }

  render() {
    const { showMap, latitude, longitude, selectedMarker, showCheckinDrawer } = this.state
    return (
      <Layout style={{ background: "#fff" }}>
        <Content style={{ marginTop: "2vh" }}>
        <Drawer
          closable={true}
          title={showCheckinDrawer.name}
          onClose={this.onCloseDrawer}
          visible={showCheckinDrawer !== false}
        >
          <Checkbox
            checked={false}
            onChange={this.handleCheckin}
          >
            Check-In Here
          </Checkbox>
          <Divider />
          <p>{showCheckinDrawer.name}</p>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GymPage)
