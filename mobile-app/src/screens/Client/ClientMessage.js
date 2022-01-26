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
  RefreshControl,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import { Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";


const ClientMessage = ({ navigation }) => {
  const isFocused = useIsFocused();

  const sampleProfile = "https://th.bing.com/th/id/R.782adc2b6062ab00461359da5b02b753?rik=Y%2fJZM98TPsfXxA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-PNG-File.png&ehk=nJ0Yls4aiMdSvREO5hB2GU7Hc3cL04UQeojwLhvL8Gk%3d&risl=&pid=ImgRaw&r=0";

  const [modalVisible, setModalVisible] = React.useState(false);
  const [myColor, setMyColor] = React.useState("#fff");

  const [messageList, setMessageList] = useState([]);
  const [chatHeads, setChatHeads] = useState([]);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [myId, setMyId] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [newChat, setNewChat] = useState("");
  const [prevChat, setPrevChat] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchView, setSearchView] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);


  const loadChatsData = () => {
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
        setMyId(result.user_id);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error);
      });


    fetch("http://192.168.42.241/wefixit/backend/api/messages/fetch_chats.php", {
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
        // console.log(result);
        setMessageList(result);
        // setInfo(result);
        // setLoadingInfo(false);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error);
      });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      loadChatsData();
      setRefreshing(false)
    }, 1000)
  }, []);


  useEffect(() => {
    loadChatsData();
    // setLoadingInfo(false);
  }, [isFocused]);

  useEffect(() => {
    let new_arr = [];
    for (let row of messageList) {
      if (row.incoming_msg_id === myId) {
        new_arr.push(row.outcoming_msg_id);
      } else if (row.outcoming_msg_id === myId) {
        new_arr.push(row.incoming_msg_id);
      }

    }



    let new_arr2 = [];
    setTimeout(() => {
      for (let row of new_arr) {
        fetch("http://192.168.42.241/wefixit/backend/api/messages/get_mesage_profile.php", {
          method: "POST",
          body: JSON.stringify({ id: row }),
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
            // console.log(result);
            new_arr2.push(result);
            // setMessageList(result);
            // setInfo(result);
            // setLoadingInfo(false);
          })
          .catch((error) => {
            //Hide Loader
            console.log(error);
          });


      }
    }, 300)

    setTimeout(() => {
      // console.log(new_arr2)
      new_arr2.sort((a, b) => {
        return a.id - b.id;
      });

      new_arr2.reverse();

      let check = {};
      let res = [];
      for (let i = 0; i < new_arr2.length; i++) {
        if (!check[new_arr2[i]['name']]) {
          check[new_arr2[i]['name']] = true;
          res.push(new_arr2[i]);
        }
      }
      // console.log("tangina mo")

      function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
          return Math.floor(interval) + "yr";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + "mon";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + "d";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + "h";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + "m";
        }
        return Math.floor(seconds) + "s";
      }

      let tae = [];
      for (let row of res) {

        // res.push({...row, message_at: "gago"});
        // message_at
        fetch("http://192.168.42.241/wefixit/backend/api/messages/get_created_at.php", {
          method: "POST",
          body: JSON.stringify({ id: row.id }),
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
            // const toTimestamp = (strDate) => {  
            //   const dt = new Date(strDate).getTime();  
            //   return dt / 1000;  
            // }  
            // console.log(toTimestamp('2022/01/09 13:56:56'));
            let str = result.created_at;
            let newStr = str.replace(/-/g, "/");
            // console.log(newStr)
            // console.log(timeSince(new Date(newStr)));
            tae.push({ ...row, message_at: timeSince(new Date(newStr)) })

            // console.log(result);
          })
          .catch((error) => {
            //Hide Loader
            console.log(error);
          });
      }

      tae.reverse();


      setTimeout(() => {
        // console.log("kalamuga")
        // console.log(tae);
        // tae.reverse();
        setChatHeads(tae);
        // setNotifCreatedAt(datas1);
      }, 200);

    }, 500)

    setTimeout(() => {
      // console.log(chatHeads);
      if (chatHeads.length === 0) {
        loadChatsData();
        // setLoadingInfo(true);
        // setMessageList([]);
        // alert("tae")
      } else {
        setLoadingInfo(false);
      }
      // setProfile(datas);
      // setNotifCreatedAt(datas1);
    }, 800);

    // setTimeout(() => {
    //   if (new_arr2 && new_arr2.length) {
    //     loadChatsData();
    //   }
    // }, 1000);

  }, [messageList]);


  const viewChat = async (id) => {
    // setMyColor("#eaeaea");
    setModalLoading(true);
    try {
      await AsyncStorage.removeItem("message_id");
      await AsyncStorage.setItem("message_id", id);
      setModalLoading(false);
      navigation.navigate("ClientChats");
    } catch (err) {
      setModalLoading(false);
      console.log(err);
    }

  }

  const MyChatsComponent = chatHeads.map((row) => (
    <Pressable key={row.id} onPress={() => viewChat(row.user_id)}>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15,
        borderColor: "#c3c3c3",
        borderBottomWidth: 1,
        borderRadius: 5,
        paddingVertical: 6
      }}  >

        <View>
          {/* <Image
          style={{ width: 50, height: 50, marginBottom: 7 }}
          source={MyImage.img_1}
          resizeMode="contain"
        /> */}

          <Avatar.Image
            style={{ marginBottom: 7 }}
            size={50}
            source={{
              uri: row.profile_photo || sampleProfile,
            }}
          />
        </View>

        <View style={{ width: 200 }}>
          <Text style={styles.title}>{row.name}</Text>
          <Text style={{ ...styles.caption, marginTop: 3 }}>
            {
              row.outcoming_msg_id === myId ? "You: " : ""
            }
            {row.msg}</Text>
        </View>

        <View style={{ justifyContent: "center", marginRight: -40, }}>
          <Text style={{ marginTop: -40, fontSize: 20, color: row.status === "0" ? "rgb(236, 236, 236)" : "#72cf66" }}>●</Text>
        </View>

        <View style={{ justifyContent: "flex-end", }}>
          <Text style={styles.caption}>{row.message_at}</Text>
        </View>
      </View>
    </Pressable>
  ));

  const searchNewChat = () => {
    if (!newChat) {
      return;
    }
    setModalLoading(true);
    fetch("http://192.168.42.241/wefixit/backend/api/users/new_chat_message.php", {
      method: "POST",
      body: JSON.stringify({ name: newChat }),
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
        console.log(result);
        setSearchList(result);
        setSearchView(true);
        setModalLoading(false);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error);
        setModalLoading(false);
      });

  }

  const SearchListss = searchList.map((row, index) => {
    return (
      <Pressable key={index} onPress={() => viewChat(row.user_id)} style={{ width: '100%' }}>
        <View style={{
          width: '100%',
          marginTop: 5,
          flexDirection: 'row',
          borderBottomColor: '#ccc',
          borderBottomWidth: 1
        }} >
          <Avatar.Image
            style={{ marginBottom: 7 }}
            size={50}
            source={{
              uri: row.profile_photo || sampleProfile,
            }}
          />
          <View style={{ paddingLeft: 15, paddingTop: 5 }}>
            <Text style={{ fontSize: 18, color: "#555" }}>{row.name}</Text>
            <Text style={{ fontSize: 16, color: "#555" }}>{row.address}</Text>
          </View>
        </View>
      </Pressable>
    )
  })

  const searchPrevChat = () => {
    // alert(prevChat)
    if (!prevChat) {
      loadChatsData();
      return;
    }

    setModalLoading(true);

    setTimeout(() => {
      fetch("http://192.168.42.241/wefixit/backend/api/users/get_name_message.php", {
        method: "POST",
        body: JSON.stringify({ name: prevChat }),
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
          console.log(result);
          setMessageList(result);
          setModalLoading(false);
          // setSearchList(result);
          // setSearchView(true);
        })
        .catch((error) => {
          //Hide Loader
          console.log(error);
          setModalLoading(false);
        });
    }, 500)


  }

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#1d4354",
          paddingHorizontal: 15,
          paddingVertical: 5
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
        <View style={{ alignItems: "flex-start", marginLeft: 90, marginTop: 5 }}>
          <Text style={{ ...styles.title2, color: "#fff", fontWeight: "400" }}>Messages</Text>
        </View>
      </View>
      <View style={styles.screen}>

        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>

          <View style={{
            marginTop: 25, marginBottom: 15,
            borderRadius: 5, borderWidth: 1, borderColor: "#c3c3c3",
            paddingVertical: 10, paddingHorizontal: 15
          }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.title}>Chats</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  textAlign: "center",
                  backgroundColor: "#14a800",
                  width: 70,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginBottom: 7
                }}
                onPress={() => setModalVisible(true)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  New
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput style={{ ...styles.input, width: "100%" }} placeholder="Search"
              value={prevChat} onChangeText={(prevChat) => setPrevChat(prevChat)}
            />

            <Pressable
              activeOpacity={0.5}
              style={{
                textAlign: "center",
                backgroundColor: "#14a800",
                width: 45,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                marginBottom: 7,
                marginLeft: 'auto',
                marginTop: -45,
                marginRight: 5
              }}
              onPress={searchPrevChat}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                Go
              </Text>
            </Pressable>

            {/* DINE  */}
            {loadingInfo ? <View></View> : <>{MyChatsComponent}</>}

          </View>




        </ScrollView>

        {/* MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={{ ...styles.modalView, height: 450 }}>

              <View style={{ flexDirection: "column", }}>
                <Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 18,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                  textAlign: 'center',
                  lineHeight: 25
                }}>Search by name</Text>
              </View>

              <TextInput style={{ ...styles.input, width: "100%", marginTop: 15 }} placeholder="Search"
                value={newChat} onChangeText={(newChat) => setNewChat(newChat)}
              // onKeyPress={() => searchNewChat()}
              />

              <Pressable
                activeOpacity={0.5}
                style={{
                  textAlign: "center",
                  backgroundColor: "#14a800",
                  width: 45,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  marginBottom: 7,
                  marginLeft: 'auto',
                  marginTop: -45,
                  marginRight: 5
                }}
                onPress={searchNewChat}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Go
                </Text>
              </Pressable>

              {searchView ? (<>{SearchListss}</>) : (<></>)}



            </View>
          </View>
        </Modal>

      </View>

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  screen: {
    flex: 1,
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
    fontSize: 18,
    marginTop: 3,
    color: "#555"
  },
  caption: {
    fontSize: 16,
    lineHeight: 18,
  },
  title2: {
    fontSize: 22,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)"
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ClientMessage;
