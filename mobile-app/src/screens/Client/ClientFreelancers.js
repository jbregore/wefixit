import React, { useEffect, useState, useCallback } from "react";
import MapView, { Circle, Marker, Callout } from "react-native-maps";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
  Alert,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
  FlatList,
  AsyncStorage,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import firebase from "../../config/firebase/firebase";
import { Avatar } from "react-native-paper";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import StarRating from "react-native-star-rating";

const db = firebase.firestore();
const storage = firebase.storage();

export default function ClientFreelancers({ navigation }) {
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [serviceList, setServiceList] = useState([]);
  const [vserviceList, setVServiceList] = useState([]);
  const [showServiceList, setShowServiceList] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState({});

  const showPeopleMap = () => {
    setModalLoading(true);
    // db.collection("collection_users")
    //   .where("verified", "==", "1")
    //   .where("role", "==", "freelancer")
    //   .where("service", "array-contains", search)
    //   .get()
    //   .then((querySnapshot) => {
    //     let data = [];
    //     querySnapshot.forEach((doc) => {
    //       // console.log(doc.id, " => ", doc.data());
    //       data.push({ id: doc.id, ...doc.data() });
    //     });

    //     setTimeout(() => {
    //       console.log(data);
    //       if (data && data.length === 0) {
    //         alert("No freelancers found.");
    //       }
    //       setSearchData(data);
    //       setLoading(false);
    //       setModalLoading(false);
    //       setShowServiceList(false);
    //     }, 400);
    //   })
    //   .catch((error) => {
    //     console.log("Error getting documents: ", error);
    //     setModalLoading(false);
    //   });

    console.log(search);
    fetch(
      "http://192.168.42.241/wefixit/backend/api/users/search_by_service.php",
      {
        method: "POST",
        body: JSON.stringify({ search: search }),
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((responseJson) => {
        //Hide Loader
        // console.log(responseJson)
        // console.log(responseJson)
        const result = JSON.parse(responseJson);
        // console.log(result)
        setTimeout(() => {
          if (result && result.length === 0) {
            alert("No freelancers found.");
          }
          setSearchData(result);
          setLoading(false);
          setModalLoading(false);
          setShowServiceList(false);
        }, 400);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error);
      });
  };

  const searchService = (text) => {
    setSearch(text);
    if (text) {
      let newData = [];
      for (let row of serviceList) {
        if (row.toLowerCase().includes(text)) {
          newData.push(row);
        }
      }
      console.log(newData);
      // setServiceList(newData);
      setVServiceList(newData);
      setShowServiceList(true);
      setShowProfile(false);
    } else {
    }
  };

  useEffect(() => {
    // db.collection("collection_users")
    //   .where("verified", "==", "1")
    //   .where("role", "==", "freelancer")
    //   .get()
    //   .then((querySnapshot) => {
    //     let data = [];
    //     querySnapshot.forEach((doc) => {
    //       // data.push(doc.data().service.split());
    //       for (let i = 0; i < doc.data().service.length; i++) {
    //         data.push(doc.data().service[i]);
    //       }
    //     });

    //     setTimeout(() => {
    //       // console.log(data);

    //       let newArray = data.filter(function (elem, pos) {
    //         return data.indexOf(elem) == pos;
    //       });

    //       // console.log(newArray);
    //       setServiceList(newArray);
    //       console.log(newArray);
    //       //remove duplicates
    //     }, 500);
    //   })
    //   .catch((error) => {
    //     console.log("Error getting document:", error);
    //   });

    fetch(
      "http://192.168.42.241/wefixit/backend/api/users/fetch_all_user.php",
      {
        method: "POST",
        body: JSON.stringify({
          pagee: 1,
        }),
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((responseJson) => {
        //Hide Loader
        // console.log(responseJson)
        const result = JSON.parse(responseJson);
        console.log(result);

        let data = [];
        for (let row of result) {
          // console.log(row.services_offer)
          let dataService = row.services_offer.split(",");
          for (let i = 0; i < dataService.length; i++) {
            data.push(dataService[i]);
          }
        }

        setTimeout(() => {
          // console.log(data);

          let newArray = data.filter(function (elem, pos) {
            return data.indexOf(elem) == pos;
          });

          // console.log(newArray);
          setServiceList(newArray);
          console.log(newArray);
          //remove duplicates
        }, 500);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error);
      });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // console.log(location.coords.latitude);
      let lat = location.coords.latitude;
      let longt = location.coords.longitude;
      setLocation(location);
      setLoadingLocation(false);

      if (location) {
        let response = await Location.reverseGeocodeAsync({
          latitude: lat,
          longitude: longt,
        });
        for (let item of response) {
          // console.log(item);
          // console.log(item.city + " " + item.subregion);
        }
      }
    })();
  }, []);

  const ServiceView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSearch(item);
          setShowServiceList(false);
        }}
      >
        <Text style={styles.itemStyle}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
      ></View>
    );
  };

  const showProfileDesc = (id) => {
    // alert(id)
    // setModalLoading(true);
    // db.collection("collection_users")
    //   .where("uid", "==", id)
    //   .get()
    //   .then((querySnapshot) => {
    //     let data = [];
    //     querySnapshot.forEach((doc) => {
    //       // console.log(doc.id, " => ", doc.data());
    //       setProfileData({ id: doc.id, ...doc.data() });
    //       setShowProfile(true);
    //       setModalLoading(false);
    //     });

    //   })
    //   .catch((error) => {
    //     console.log("Error getting documents: ", error);
    //     setModalLoading(false);
    //   });

    setModalLoading(true);
    fetch(
      "http://192.168.42.241/wefixit/backend/api/users/view_profile_id.php",
      {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((responseJson) => {
        //Hide Loader
        const result = JSON.parse(responseJson);
        // console.log(result);
        setProfileData(result);
        setShowProfile(true);
        setModalLoading(false);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error);
        setModalLoading(false);
      });

    // setShowProfile(true);
  };

  const sendMessage = async (id) => {
    try {
      await AsyncStorage.removeItem("message_id");
      await AsyncStorage.setItem("message_id", id);
      navigation.navigate("ClientChats");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#1d4354",
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather
            name="menu"
            size={30}
            color="#fff"
            style={{
              marginTop: 5,
              marginRight: 5,
            }}
          />
        </TouchableOpacity>
        <View
          style={{ alignItems: "flex-start", marginLeft: 55, marginTop: 5 }}
        >
          <Text style={{ ...styles.title, color: "#fff", fontWeight: "400" }}>
            Browse Freelancers
          </Text>
        </View>
      </View>
      <View style={{ ...styles.container, paddingTop: 0 }}>
        <View
          style={{
            paddingHorizontal: 10,
            backgroundColor: "#fff",
            paddingTop: 40,
            maxHeight: 400,
            position: "absolute",
            zIndex: 1,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Search service"
            value={search}
            onChangeText={(text) => searchService(text)}
            // onKeyPress={searchService}
            onSubmitEditing={() => showPeopleMap()}
          />

          {showServiceList ? (
            <Pressable
              activeOpacity={0.5}
              style={{
                textAlign: "center",
                backgroundColor: "#fff",
                width: 45,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                marginBottom: 7,
                marginLeft: "auto",
                marginTop: -45,
                marginRight: 5,
              }}
              onPress={() => {
                setShowServiceList(false);
                setSearch("");
              }}
            >
              <AntDesign name="close" size={22} color="#555" />
            </Pressable>
          ) : (
            <Pressable
              activeOpacity={0.5}
              style={{
                textAlign: "center",
                backgroundColor: "#fff",
                width: 45,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                marginBottom: 7,
                marginLeft: "auto",
                marginTop: -45,
                marginRight: 5,
              }}
              // onPress={() => setShowServiceList(false)}
            >
              <AntDesign name="search1" size={22} color="#555" />
            </Pressable>
          )}

          {showServiceList ? (
            <FlatList
              style={{
                maxHeight: 400,
                width: "100%",
                // position: "absolute",
                // zIndex: 1,
              }}
              data={vserviceList}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ServiceView}
            />
          ) : (
            <></>
          )}
        </View>

        {loadingLocation ? (
          <></>
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.115,
              longitudeDelta: 0.115,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Jb Regore"
              description="My Location"
              pinColor="red"
            ></Marker>

            {loading === false && modalLoading === false ? (
              <>
                {searchData.map((item, index) => {
                  return (
                    <Marker
                      coordinate={{
                        latitude: Number(item.address_lat),
                        longitude: Number(item.address_longt),
                      }}
                      // title={item.name}
                      // description={"Rating: 5"}
                      pinColor="gold"
                      key={index}
                      // onPress={() => setShowProfile(true)}
                      // onPress={() => alert("gago")}
                    >
                      <Callout onPress={() => showProfileDesc(item.user_id)}>
                        <Text>{item.name}</Text>
                        <Text>Rating: {item.rating.substring(0,4)}</Text>
                      </Callout>
                    </Marker>
                  );
                })}
              </>
            ) : (
              <></>
            )}

            <Circle
              center={{
                latitude: 14.998796,
                longitude: 120.877476,
              }}
              radius={5000}
            />
          </MapView>
        )}
      </View>

      {showProfile ? (
        <View
          style={{
            position: "absolute",
            height: 120,
            width: "90%",
            backgroundColor: "green",
            bottom: 30,
            right: 0,
            zIndex: 1,
            backgroundColor: "#fff",
            borderColor: "#c3c3c3",
            borderWidth: 2,
            marginHorizontal: 20,
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 20,
            flexDirection: "row",
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Avatar.Image
              style={{}}
              size={55}
              source={{
                uri: profileData.profile_photo,
              }}
            />
            <TouchableOpacity onPress={() => sendMessage(profileData.user_id)}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1d4354",
                  textDecorationLine: "underline",
                  marginTop: 4,
                }}
              >
                Message
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: 200, marginLeft: 30, paddingTop: 6 }}>
            <TouchableOpacity onPress={() => alert(profileData.user_id)}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1d4354",
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                {profileData.name}
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 16, color: "#555", marginTop: 2 }}>
              {profileData.age} years old
            </Text>
            <View style={{ flexDirection: "row", marginTop: 2 }}>
              <StarRating
                maxStars={5}
                rating={Number(profileData.rating)}
                starSize={16}
                fullStarColor="#14a800"
                emptyStarColor="#14a800"
              />
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}

      {/* MODAL LOADING*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalLoading}
        onRequestClose={() => {
          setModalLoading(!modalLoading);
        }}
      >
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    // height: Dimensions.get('window').height / 2,
    height: "100%",
    marginTop: 20,
  },
  itemStyle: {
    padding: 15,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },

  screen: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 30,
    backgroundColor: "#fff",
  },

  input: {
    width: 340,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#c3c3c3",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },

  title: {
    fontSize: 22,
    marginTop: 3,
    fontWeight: "bold",
    color: "#555",
  },
  caption: {
    fontSize: 16,
    lineHeight: 18,
  },
  title2: {
    fontSize: 18,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption2: {
    fontSize: 16,
    lineHeight: 22,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    height: 400,
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
