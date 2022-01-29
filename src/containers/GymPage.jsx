import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchingUsers } from "../redux/actions/allUsers";
import { patchUserCheckin } from "../redux/actions/currentUser";
import MyMapComponent from "../components/MyMapComponent"
import { sendBuddyRequest, updateUserBuddies } from "../redux/actions/buddies";
import {
  Layout,
  Button,
  Drawer,
  Checkbox,
  Divider,
  List,
  Badge,
  Avatar,
  message,
  Popconfirm,
  Typography,
  notification
} from "antd";
import { UserAddOutlined, GlobalOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";

const { Content } = Layout;
const { Text } = Typography;

// const MyMapComponent = compose(
//   withProps({
//     googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapsKey}&v=3.exp&libraries=geometry,drawing,places`,
//     loadingElement: <div style={{ height: "100%" }} />,
//     containerElement: <div style={{ height: "85vh", width: "98%" }} />,
//     mapElement: <div style={{ height: "100%" }} />,
//   }),
//   withScriptjs,
//   withGoogleMap,
//   withState("places", "updatePlaces", ""),
//   withStateHandlers(
//     () => ({
//       isOpen: false,
//     }),
//     {
//       onToggleOpen:
//         ({ isOpen }) =>
//         () => ({
//           isOpen: !isOpen,
//         }),
//     }
//   ),
//   withHandlers(() => {
//     const refs = {
//       map: undefined,
//     };

//     return {
//       onMapMounted: () => (ref) => {
//         refs.map = ref;
//       },
//       fetchPlaces:
//         ({ updatePlaces }) =>
//         () => {
//           const bounds = refs.map.getBounds();
//           const service = new google.maps.places.PlacesService(
//             refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
//           );
//           const request = {
//             bounds: bounds,
//             type: ["gym"],
//           };
//           service.nearbySearch(request, (results, status) => {
//             if (status === google.maps.places.PlacesServiceStatus.OK) {
//               updatePlaces(results);
//             }
//           });
//         },
//     };
//   })
// )((props) => (
//   <GoogleMap
//     onTilesLoaded={props.fetchPlaces}
//     ref={props.onMapMounted}
//     onBoundsChanged={props.fetchPlaces}
//     defaultZoom={14}
//     defaultCenter={{ lat: props.latitude, lng: props.longitude }}
//   >
//     <Marker
//       position={{ lat: props.latitude, lng: props.longitude }}
//       icon={"https://img.icons8.com/color/48/000000/map-pin.png"}
//       label="You are here"
//     />
//     {props.places &&
//       props.places.map((place, i) => {
//         const onClick = props.onClick.bind(this, place);
//         const onCheckinClick = props.onCheckinClick.bind(this, place);

//         return (
//           <Marker
//             key={i}
//             position={{
//               lat: place.geometry.location.lat(),
//               lng: place.geometry.location.lng(),
//             }}
//             icon={require("../images/iconfinder_gym_38044.png")}
//             onClick={onClick}
//           >
//             {props.selectedMarker === place && (
//               <InfoWindow style={{ display: "flex", justifyContent: "center" }}>
//                 <div>
//                   <h2>{place.name}</h2>
//                   <Button
//                     onClick={onCheckinClick}
//                     type="primary"
//                     shape="round"
//                     icon="check"
//                     size="small"
//                   >
//                     Show Check-ins
//                   </Button>
//                 </div>
//               </InfoWindow>
//             )}
//           </Marker>
//         );
//       })}
//   </GoogleMap>
// ));

const GymPage = () => {
  const [state, setState] = useState({
    showMap: false,
    lat: 0,
    lng: 0,
    selectedMarker: false,
    showCheckinDrawer: false,
    checkedBuddies: [],
    checkedUsers: [],
  });

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const allUsers = useSelector((state) => state.allUsers);
  const userBuddies = useSelector((state) => state.userBuddies);

  const success = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    setState({
      ...state,
      lat,
      lng,
      showMap: true,
    });
  };

  const error = () => {
    notification['error']({
      message: "Error getting your current location!",
      description: "Please give this site permissions to access your location"
    });
  };

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(success, error);
    dispatch(fetchingUsers())
  };

  const handleClick = (marker) => {
    setState({       
      ...state,
      selectedMarker: marker 
    });
  };

  const handleOnCheckinClick = (marker) => {
    setState({
      ...state,
      showCheckinDrawer: true,
      checkedBuddies: filterCheckedBuddies(),
      checkedUsers: filterCheckedUsers(),
    });
  };

  const handleCheckin = () => {
    const { selectedMarker } = state;
    if (currentUser.checkin !== selectedMarker.place_id) {
      currentUser.checkin = selectedMarker.place_id;
      dispatch(patchUserCheckin(currentUser));
    } else {
      currentUser.checkin = "null";
      dispatch(patchUserCheckin(currentUser));
    }
  };

  const onCloseDrawer = () => {
    setState({
      ...state,
      showCheckinDrawer: false,
      selectedMarker: false,
    });
  };

  const filterCheckedUsers = () => {
    const { selectedMarker } = state;
    const checkedBuddies = filterCheckedBuddies();
    return allUsers.filter(
      (user) =>
        user.checkin === selectedMarker.place_id &&
        !checkedBuddies.find((buddy) => buddy.id === user.id)
    );
  };

  const filterCheckedBuddies = () => {
    const { selectedMarker } = state;
    const checkedBuddies = userBuddies.filter(
      (user) => pickBuddy(user).checkin === selectedMarker.place_id
    );
    return checkedBuddies.map((buddy) => pickBuddy(buddy));
  };

  const pickBuddy = (buddy) => {
    return buddy.requester.username === currentUser.username
      ? buddy.requestee
      : buddy.requester;
  };

  // const sortNameList = (checkedUsers) => {
  //   return checkedUsers.sort((userA, userB) => {
  //     var buddyA = pickBuddy(userA);
  //     var buddyB = pickBuddy(userB);
  //     var nameA = buddyA.first_name.toUpperCase(); // ignore upper and lowercase
  //     var nameB = buddyB.first_name.toUpperCase(); // ignore upper and lowercase
  //     if (nameA < nameB) {
  //       return -1;
  //     }
  //     if (nameA > nameB) {
  //       return 1;
  //     }
  //     // names must be equal
  //     return 0;
  //   });
  // };

  const sendRequest = (user) => {
    const { checkedUsers, checkedBuddies } = state;
    message.success(`Added ${user.first_name} to buddies!`);
    dispatch(sendBuddyRequest(user, currentUser));
    dispatch(updateUserBuddies({
      buddy: {
        requester_id: currentUser.id,
        requestee_id: user.id,
        buddy_type: "pending",
      },
      requester: {
        id: currentUser.id,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        username: currentUser.username,
        status: currentUser.status,
      },
      requestee: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        status: user.status,
      },
      messages: [],
    }));
    let updateUsers = checkedUsers.filter(
      (checkedUser) => checkedUser.id !== user.id
    );
    setState({
      ...state,
      checkedBuddies: [...checkedBuddies, user],
      checkedUsers: updateUsers,
    });
  };

  const {
    showMap,
    lat,
    lng,
    selectedMarker,
    showCheckinDrawer,
    checkedBuddies,
    checkedUsers,
  } = state;
  return (
    <Layout style={{ background: "#fff" }}>
      <Content style={{ marginTop: "2vh" }}>
        <Drawer
          closable={true}
          title={selectedMarker.name}
          onClose={onCloseDrawer}
          visible={showCheckinDrawer}
        >
          <Checkbox
            checked={currentUser.checkin === selectedMarker.place_id}
            onChange={handleCheckin}
          >
            Check-In Here
          </Checkbox>
          <Divider />
          <h3>Buddies Checked-In</h3>
          {isEmpty(checkedBuddies) ? (
            <Text>No buddies at this Gym!</Text>
          ) : (
            <List
              dataSource={checkedBuddies}
              renderItem={(buddy) => (
                <List.Item style={{ padding: "1vh" }}>
                  <List.Item.Meta
                    style={{ alignItems: "center" }}
                    title={`${buddy.first_name} ${buddy.last_name}`}
                    avatar={
                      <Avatar
                        style={{
                          color: "#0d5fe5",
                          backgroundColor: "#b3cbf2",
                          marginRight: "5px",
                        }}
                      >
                        {buddy.first_name[0]}
                        {buddy.last_name[0]}
                      </Avatar>
                    }
                    description={
                      <Badge
                        status={
                          buddy.status === "offline" ? "default" : "success"
                        }
                        text={buddy.status}
                      />
                    }
                  />
                </List.Item>
              )}
            />
          )}
          <Divider />
          <h3>All Checked-In</h3>
          {isEmpty(checkedUsers) ? (
            <Text>No other users at this Gym!</Text>
          ) : (
            <List
              dataSource={checkedUsers}
              renderItem={(user) => (
                <List.Item style={{ padding: "1vh" }}>
                  <List.Item.Meta
                    style={{ alignItems: "center" }}
                    title={`${user.first_name} ${user.last_name}`}
                    avatar={
                      <Popconfirm
                        title={`Add ${user.first_name} ${user.last_name} to buddies?`}
                        onConfirm={() => sendRequest(user)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Avatar
                          style={{
                            color: "#306644",
                            backgroundColor: "#71c490",
                          }}
                        >
                          <UserAddOutlined />
                        </Avatar>
                      </Popconfirm>
                    }
                    description={
                      <Badge
                        status={
                          user.status === "offline" ? "default" : "success"
                        }
                        text={user.status}
                      />
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Drawer>
        {showMap ? (
          <MyMapComponent
            selectedMarker={selectedMarker}
            lat={lat}
            lng={lng}
            onClick={handleClick}
            onCheckinClick={handleOnCheckinClick}
          />
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={getPosition}
              type="primary"
              shape="round"
              icon={<GlobalOutlined />}
              size="large"
            >
              Show Gyms Near Me
            </Button>
          </div>
        )}
      </Content>
    </Layout>
  );
}

export default GymPage;
