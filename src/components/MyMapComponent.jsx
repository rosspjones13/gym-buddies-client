/* global google */
import React, { useCallback, useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { MAPS_KEY } from "../constants/keys";
import { Button } from "antd";
import { CheckOutlined } from '@ant-design/icons';
import { lib } from "../constants/constants"

const containerStyle = {
  width: '98%',
  height: '85vh'
};


const MyMapComponent = ({
  selectedMarker,
  lat,
  lng,
  onClick,
  onCheckinClick
}) => {
  // const [map, setMap] = useState(null)
  const [gyms, setGyms] = useState(null)

  // const onLoad = useCallback(function callback(map) {
    // setMap(map)
  // }, [])

  const onUnmount = useCallback(function callback(map) {
    // setMap(null)
  }, [])

  const onMapLoad = (map) => {
    // setMap(map)
    const request = {
      location: { lat, lng },
      radius: 7000,
      type: ["gym"],
    };

    let service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setGyms(results)
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={MAPS_KEY} libraries={lib}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={14}
        onLoad={(map) => onMapLoad(map)}
        onUnmount={(map) => onUnmount(map)}
      >
        <Marker
          position={{ lat, lng }}
          icon={"https://img.icons8.com/color/48/000000/map-pin.png"}
          label="You are here"
        />
        {gyms &&
          gyms.map((gym, i) => 
            <Marker
              key={i}
              position={{
                lat: gym.geometry.location.lat(),
                lng: gym.geometry.location.lng(),
              }}
              icon={require("../images/iconfinder_gym_38044.png")}
              onClick={() => onClick(gym)}
            >
              {selectedMarker === gym && (
                <InfoWindow>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h2>{gym.name}</h2>
                    <Button
                      onClick={() => onCheckinClick(gym)}
                      type="primary"
                      shape="round"
                      icon={<CheckOutlined />}
                      size="small"
                    >
                      Show Check-ins
                    </Button>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          )
        }
    </GoogleMap>
  </LoadScript>
  )
}

export default MyMapComponent