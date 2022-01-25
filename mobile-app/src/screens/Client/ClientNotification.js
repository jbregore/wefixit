import React, { useState, useEffect, useCallback } from "react";

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
  RefreshControl
} from "react-native";
import { Avatar, Caption } from "react-native-paper";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { useIsFocused } from "@react-navigation/native";

const ClientNotification = ({ navigation }) => {
  const isFocused = useIsFocused();

  const sampleProfile = "https://th.bing.com/th/id/R.782adc2b6062ab00461359da5b02b753?rik=Y%2fJZM98TPsfXxA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-PNG-File.png&ehk=nJ0Yls4aiMdSvREO5hB2GU7Hc3cL04UQeojwLhvL8Gk%3d&risl=&pid=ImgRaw&r=0";

  const [myNotification, setMyNotification] = useState([]);
  const [profile, setProfile] = useState([]);
  const [notifCreatedAt, setNotifCreatedAt] = useState([]);

  const [loadingInfo, setLoadingInfo] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = () => {
    fetch("http://192.168.42.241/wefixit/backend/api/users/user_fetch_self.php", {
      method: "GET",
      headers: {
        //Header Defination
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((responseJson) => {
        //Hide Loader
        const result = JSON.parse(responseJson);

        fetch("http://192.168.42.241/wefixit/backend/api/users/get_notif.php", {
          method: "POST",
          body: JSON.stringify({ id: result.user_id }),
          headers: {
            //Header Defination
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.text())
          .then((responseJson) => {
            //Hide Loader
            const result = JSON.parse(responseJson);
            setMyNotification(result);
            // console.log(result)
          })
          .catch((error) => {
            //Hide Loader
            console.log(error);
          });

        // setInfo(result);
        // setLoadingInfo(false);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error);
      });
  };

  useEffect(() => {
    loadData();
    setLoadingInfo(false);
  }, [isFocused]);

  useEffect(() => {
    let datas = [];
    let datas1 = [];

    for (let row of myNotification) {
      // console.log(row)
      // VIEW PROFILE ID
      fetch(
        "http://192.168.42.241/wefixit/backend/api/users/view_profile_id.php",
        {
          method: "POST",
          body: JSON.stringify({ id: row.notif_id_from }),
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
          //   console.log(result);
          // console.log(result.total_proposal_count.total_proposal_count)
          datas.push({
            profile_pic: result.profile_photo,
            name: result.name,
            id: row.notif_id,
          });
        })
        .catch((error) => {
          //Hide Loader
          console.log(error);
        });

      // CREATED AT
      fetch(
        "http://192.168.42.241/wefixit/backend/api/jobs/get_time_created.php",
        {
          method: "POST",
          body: JSON.stringify({ createdAt: row.created_at }),
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
          //   console.log(result);
          datas1.push({ created_at: result, id: row.notif_id });
        })
        .catch((error) => {
          //Hide Loader
          console.log(error);
        });
    }

    setTimeout(() => {
      setProfile(datas);
      setNotifCreatedAt(datas1);
    }, 200);
  }, [myNotification]);

  const MyNotifComponent = myNotification.map((row) => (
    <View
      style={{
        height: 70,
        width: "100%",
        marginBottom: 7,
        borderBottomColor: "#c3c3c3",
        borderBottomWidth: 1,
        flexDirection: "row",
      }}
      key={row.notif_id}
    >
      <View
        style={{
          width: "20%",
          alignItems: "flex-end",
        }}
      >
        {profile.map((item) => {
          if (item.id === row.notif_id) {
            return (
              <Avatar.Image
                style={{ marginBottom: 7 }}
                size={55}
                source={{
                  uri: item.profile_pic || sampleProfile,
                }}
                key={Math.random()}
              />
            );
          }
        })}
      </View>

      <View
        style={{
          width: "80%",
          marginRight: 15,
          paddingLeft: 10,
          paddingTop: 8,
        }}
      >
        <Text style={{ ...styles.caption }}>
          <Caption style={{ ...styles.caption, color: "#14a800" }}>
            {profile.map((item) => {
              if (item.id === row.notif_id) {
                return item.name;
              }
            })}{" "}
          </Caption>
          {row.notif_text}
        </Text>
        <Text style={{ ...styles.caption2, color: "#006b9b" }}>
          {notifCreatedAt.map((item) => {
            if (item.id === row.notif_id) {
              return item.created_at;
            }
          })}
        </Text>
      </View>
    </View>
  ));

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false)
    }, 1000)
  }, []);

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
          style={{ alignItems: "flex-start", marginLeft: 85, marginTop: 5 }}
        >
          <Text style={{ ...styles.title, color: "#fff", fontWeight: "400" }}>
            Notifications{" "}
          </Text>
        </View>
      </View>
      <View style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          {/* DINE  */}
          <View
            style={{
              marginTop: 25,
              marginBottom: 15,
              alignItems: "center",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#c3c3c3",
              paddingVertical: 10,
              paddingHorizontal: 15,
              paddingTop: 30,
            }}
          >
            {loadingInfo ? <View></View> : <>{MyNotifComponent}</>}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  screen: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 30,
    backgroundColor: "#fff",
  },

  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "#c3c3c3",
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

export default ClientNotification;
