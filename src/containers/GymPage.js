/* global google */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapsAPI } from '../constants/API'
import { Layout, Button } from 'antd'
import { compose, withProps, withHandlers, withState } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
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
            console.log(results)
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
    {console.log(props)}
    {props.places && props.places.map((place, i) =>
      <Marker 
        key={i} 
        position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} 
        icon={require('../images/iconfinder_gym_38044.png')}  
      />
    )}
  </GoogleMap>
)

class GymPage extends Component {
  constructor(props) {
    super()
    this.state = {
      showMap: false,
      latitude: 0,
      longitude: 0
    }
  }

  success = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    this.setState({
      showMap: true,
      latitude,
      longitude
    })
  }

  error = () => {
    console.log('Unable to retrieve your location')
  }

  getPosition = () => {
    navigator.geolocation.getCurrentPosition(this.success, this.error)
  }

  render() {
    const { showMap, latitude, longitude } = this.state
    return (
      <Layout style={{ background: "#fff" }}>
        <Content style={{ justifyContent: "center" }}>
        {showMap ? 
          <MyMapComponent isMarkerShown latitude={latitude} longitude={longitude} /> :
          <Button 
            onClick={this.getPosition} 
            type="primary" 
            shape="round" 
            icon="global"
            style={{ marginTop: "2vh", alignItems: "center" }}
          >Show Gyms Near Me</Button>
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
