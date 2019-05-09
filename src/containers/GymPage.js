import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapsAPI } from '../constants/API'
import { Layout, Button } from 'antd'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const { Content } = Layout

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapsAPI()}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `80vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.latitude, lng: props.longitude }} onClick={props.onMarkerClick} />}
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
