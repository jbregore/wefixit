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
  Dimensions,
  AsyncStorage,
  Picker,
  RefreshControl,
  ActivityIndicator
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import { Avatar } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";


const ClientChats = ({ navigation }) => {
  //MY INFO

  const [modalVisible, setModalVisible] = React.useState(false);
  const [myColor, setMyColor] = React.useState("#fff");
  const isFocused = useIsFocused();

  const sampleProfile =
    "https://th.bing.com/th/id/R.782adc2b6062ab00461359da5b02b753?rik=Y%2fJZM98TPsfXxA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-PNG-File.png&ehk=nJ0Yls4aiMdSvREO5hB2GU7Hc3cL04UQeojwLhvL8Gk%3d&risl=&pid=ImgRaw&r=0";

  const WIDTH = Dimensions.get("window").width;
  const HEIGHT = Dimensions.get("window").height;

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const [chatInfo, setChatInfo] = useState({});
  const [messageText, setMessageText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [state, setState] = React.useState({
    searches: "0",
    choosenIndex: 0,
  });

  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [startDate2, setStartDate2] = useState("");
  const [mode, setMode] = useState("date");
  const [mode2, setMode2] = useState("date");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [projList, setProjList] = useState([]);
  const [projAddress, setProjAddress] = useState("");
  const [projService, setProjService] = useState("");
  const [viewService, setViewService] = useState(false);
  const [projCost, setProjCost] = useState("");

  const [modalAlert, setModalAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  const loadData = () => {
    async function fetchData() {
      try {
        // console.log(currentUser.uid);
        let resp = await AsyncStorage.getItem("message_id");
        // console.log(resp);

        let profile_data = {
          incoming_msg_id: resp
        }

        fetch("http://192.168.42.241/wefixit/backend/api/users/view_profile_id.php", {
          method: "POST",
          body: JSON.stringify({ id: resp }),
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
            setChatInfo(result);
            let serv = result.services_offer.split(',');
            setProjService(serv);
            setViewService(true);
          })
          .catch((error) => {
            //Hide Loader
            console.log(error);
          });

        fetch("http://192.168.42.241/wefixit/backend/api/messages/fetch_messages.php", {
          method: "POST",
          body: JSON.stringify(profile_data),
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
            setChats(result);
            setLoading(false);
          })
          .catch((error) => {
            //Hide Loader
            console.log(error);
          });

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
            setInfo(result);
          })
          .catch((error) => {
            //Hide Loader
            console.log(error);
          });


        // db.collection("collection_users")
        //   .where("uid", "==", resp)
        //   .get()
        //   .then((querySnapshot) => {
        //     let data = [];
        //     querySnapshot.forEach((doc) => {
        //       // console.log(doc.id, " => ", doc.data());
        //       setChatInfo({ id: doc.id, ...doc.data() });
        //       //   setShowProfile(true);
        //       //   setModalLoading(false);
        //     });
        //   })
        //   .catch((error) => {
        //     console.log("Error getting documents: ", error);
        //   });

        // let data = [];

        // db.collection("collection_messages")
        //   .where("incoming_msg_id", "==", currentUser.uid)
        //   .where("outcoming_msg_id", "==", resp)
        //   .get()
        //   .then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //       data.push({ id: doc.id, ...doc.data() });
        //     });
        //     db.collection("collection_messages")
        //       .where("incoming_msg_id", "==", resp)
        //       .where("outcoming_msg_id", "==", currentUser.uid)
        //       .get()
        //       .then((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //           data.push({ id: doc.id, ...doc.data() });
        //         });
        //         setTimeout(() => {
        //           let myData = [];
        //           myData = data.sort((a, b) =>
        //             a.created_at > b.created_at ? 1 : -1
        //           );
        //           setChats(myData);
        //           setLoading(false);
        //         }, 400);
        //       })
        //       .catch((error) => {
        //         console.log("Error getting documents: ", error);
        //       });
        //   })
        //   .catch((error) => {
        //     console.log("Error getting documents: ", error);
        //   });


      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  };

  useEffect(() => {
    loadData();
  }, [isFocused]);

  // useEffect(() => {
  //   // console.log(state.searches)
  //   if (state.searches !== "0") {
  //     fetch("http://192.168.42.241/wefixit/backend/api/jobs/fetch_edit_job.php?id=" + state.searches, {
  //       method: "GET",
  //       headers: {
  //         //Header Defination
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => response.text())
  //       .then((responseJson) => {
  //         //Hide Loader
  //         const result = JSON.parse(responseJson);
  //         console.log(result);
  //         // setProjAddress(result.job_location);
  //         // let serv = result.job_services.split(',');
  //         // setProjService(serv);
  //         // setViewService(true);
  //       })
  //       .catch((error) => {
  //         //Hide Loader
  //         console.log(error);
  //       });


  //   } else {
  //     setProjAddress("");
  //     setProjService([]);
  //     setViewService(false);
  //     setProjCost("");
  //     setStartDate("");
  //     setStartDate2("");
  //   }

  // }, [state]);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false);
    }, 1000);
  }, []);

  const sendMessage = (id) => {
    if (!messageText) {
      return;
    }
    setModalLoading(true);
    let message_data = {
      incoming_msg_id: id,
      msg: messageText
    };

    fetch(
      "http://192.168.42.241/wefixit/backend/api/messages/send_message.php",
      {
        method: "POST",
        body: JSON.stringify(message_data),
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
        setMessageText("");
        setModalLoading(false);
        loadData();
      })
      .catch((error) => {
        setModalLoading(false);
        console.log(error);
      });

  };

  const setAppointment = () => {
    let valid = 0;

    if (!projCost) {

    } else {
      valid++;
    }

    if (!projAddress) {

    } else {
      valid++;
    }

    if (!startDate) {

    } else {
      valid++;
    }

    if (!startDate2) {

    } else {
      valid++;
    }

    if (valid !== 4) {
      setModalAlert(true);
      setAlertText("Please fill all the fields");
      valid = 0;
    } else if (valid === 4) {
      setModalLoading(true);
      setTimeout(() => {
        let appoint_data = {
          freelancer_id: chatInfo.user_id,
          // jobpost_id: state.searches,
          // proj_desc: projDesc,
          proj_cost: projCost,
          proj_addr: projAddress,
          start_date: startDate,
          end_date: startDate2,
          service: projService
        }

        console.log(appoint_data);

        fetch("http://192.168.42.241/wefixit/backend/api/appointments/create_appointment.php", {
          method: "POST",
          body: JSON.stringify(appoint_data),
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

            
            setProjCost("");
            setProjAddress("");
            setProjService([]);
            setViewService(false);
            setStartDate("");
            setStartDate2("");
            loadData();

            setModalVisible(false);
            setModalAlert(true);
            setAlertText("Appointment has been set sucessfully.");
            setModalLoading(false);
          })
          .catch((error) => {
            //Hide Loader
            setModalLoading(false);
            console.log(error);
          });


        let notif_data = {
          notif_text: "Set an appointment with you.",
          notif_from: info.user_id,
          notif_to: chatInfo.user_id
        }

        fetch("http://192.168.42.241/wefixit/backend/api/notification/create_notification.php", {
          method: "POST",
          body: JSON.stringify(notif_data),
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
            setModalLoading(false);
          })
          .catch((error) => {
            //Hide Loader
            console.log(error);
            setModalLoading(false);
          });

        let notif_data2 = {
          notif_text: "You set an appointment with this freelancer.",
          notif_from: chatInfo.user_id, 
          notif_to: info.user_id
        }

        fetch("http://192.168.42.241/wefixit/backend/api/notification/create_notification.php", {
          method: "POST",
          body: JSON.stringify(notif_data2),
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
            setModalLoading(false);
          })
          .catch((error) => {
            //Hide Loader
            setModalLoading(false);
            console.log(error);
          });


      }, 300)

      valid = 0;

    }
  }

  const onChangeDate = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = (tempDate.getMonth() + 1) + "/" + tempDate.getDate() + "/" + tempDate.getFullYear();
    // console.log(fDate);

    setShow(false);
    setStartDate(fDate);
    console.log(fDate)
  };

  const showMode = () => {
    setShow(true);
  };

  const onChangeDate2 = async (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setDate2(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = (tempDate.getMonth() + 1) + "/" + tempDate.getDate() + "/" + tempDate.getFullYear();
    // console.log(fDate);

    setShow2(false);
    setStartDate2(fDate);
  };

  const showMode2 = () => {
    setShow2(true);
  };

  const closeModal = () => {
    // setProjAddress("");
    // setProjService([]);
    // setViewService(false);
    // setProjCost("");
    // setStartDate("");
    // setStartDate2("");
    setModalVisible(false);
    // setState({
    //   searches: "0",
    //   choosenIndex: 0
    // })
  }

  const deleteService = (index) => {
    let itemsCopy = [...projService];
    itemsCopy.splice(index, 1);
    setProjService(itemsCopy)
  }

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
          style={{ alignItems: "flex-start", marginLeft: 100, marginTop: 5 }}
        >
          <Text style={{ ...styles.title2, color: "#fff", fontWeight: "400" }}>
            Chats
          </Text>
        </View>
      </View>
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{ marginTop: 25, alignItems: "flex-end", marginRight: 10 }}
          ></View>

          <View
            style={{
              marginTop: 5,
              marginBottom: 15,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#c3c3c3",
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                borderColor: "#c3c3c3",
                borderBottomWidth: 1,
                borderRadius: 5,
                paddingVertical: 6,
              }}
            >
              <View style={{ marginLeft: 15, marginRight: 5 }}>
                <Avatar.Image
                  size={45}
                  source={{
                    uri: chatInfo.profile_photo,
                  }}
                />
              </View>

              <View>
                <Text
                  style={{
                    ...styles.title,
                    fontSize: 16,
                    marginTop: 3,
                    marginLeft: 3,
                    color: "#1d4354",
                    fontWeight: "bold",
                  }}
                >
                  {chatInfo.name}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ ...styles.title, fontSize: 14 }}>
                    ( {chatInfo.role} )
                  </Text>
                  <Text style={{
                    marginLeft: 4, marginTop: 3,
                    color: chatInfo.status === "0" ? "rgb(236, 236, 236)" : "#72cf66"
                  }}>●</Text>
                </View>
              </View>

              {/* ERE */}
              
              <View
                style={{
                  position: "absolute",
                  justifyContent: "flex-end",
                  bottom: 0,
                  right: 5,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#14a800",
                    width: 130,
                    height: 35,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    marginBottom: 7,
                  }}
                  onPress={() => setModalVisible(true)}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#fff",
                    }}
                  >
                    Set Appointment
                  </Text>
                </TouchableOpacity>
              </View>

            </View>

            <ScrollView
              style={{
                height: 510,
                paddingTop: 20,
                paddingBottom: 30,
              }}
              showsVerticalScrollIndicator={false}
            >
              {/* OUTCOMING MSG */}
              {/* INCOMING MSG */}

              {loading === false ? (
                <>
                  {chats.map((row, index) => {
                    if (row.outcoming_msg_id === info.user_id) {
                      return (
                        <View
                          style={{
                            display: "flex",
                            marginHorizontal: 15,
                            marginVertical: 5,
                          }}
                          key={index}
                        >
                          <Text
                            style={{
                              marginLeft: "auto",
                              backgroundColor: "rgb(71, 107, 126)",
                              color: "#fff",
                              fontSize: 16,
                              textAlign: "left",
                              borderTopRightRadius: 18,
                              borderTopLeftRadius: 18,
                              borderBottomLeftRadius: 18,
                              paddingVertical: 5,
                              paddingHorizontal: 15,
                              maxWidth: 160,
                            }}
                          >
                            {row.msg}
                          </Text>
                          {/* <Text style={{ marginLeft: 'auto', fontSize: 12, color: '#555' }}>12:10 PM</Text> */}
                        </View>
                      );
                    } else {
                      return (
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginHorizontal: 15,
                            marginVertical: 5,
                          }}
                          key={index}
                        >
                          <View
                            style={{
                              marginRight: 5,
                              justifyContent: "flex-end",
                            }}
                          >
                            <Avatar.Image
                              size={35}
                              source={{
                                uri: chatInfo.profile_photo,
                              }}
                            />
                          </View>
                          <View>
                            <Text
                              style={{
                                marginRight: "auto",
                                backgroundColor: "#14a800",
                                color: "#fff",
                                fontSize: 16,
                                textAlign: "left",
                                borderTopRightRadius: 18,
                                borderTopLeftRadius: 18,
                                borderBottomRightRadius: 18,
                                paddingVertical: 5,
                                paddingHorizontal: 15,
                                maxWidth: 160,
                              }}
                            >
                              {row.msg}
                            </Text>
                            {/* <Text style={{ marginRight: 'auto', fontSize: 12, color: '#555' }}>12:10 PM</Text> */}
                          </View>
                        </View>
                      );
                    }
                  })}
                </>
              ) : (
                <></>
              )}
            </ScrollView>
          </View>

          <View
            style={{
              zIndex: 1,
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 60,
              paddingHorizontal: 15,
              borderColor: "#c3c3c3",
              borderTopWidth: 1,
              paddingTop: 10,
              flexDirection: "row",
              backgroundColor: "#fff",
            }}
          >
            <TextInput
              style={{ ...styles.input, width: 250 }}
              placeholder=""
              value={messageText}
              onChangeText={(messageText) => setMessageText(messageText)}
            />

            <View
              style={{
                alignItems: "flex-end",
                marginRight: 10,
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  textAlign: "center",
                  backgroundColor: "#14a800",
                  width: 70,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  marginBottom: 7,
                }}
                onPress={() => sendMessage(chatInfo.user_id)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

      </View>

      {/* MODAL APPOINTMENT  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ ...styles.title, marginBottom: 17, textAlign: "center" }}>
              Set appointment between you and {chatInfo.fname}
            </Text>

            <View style={{ flexDirection: "column" }}>

              {/* {projList.length === 0 ? (<>
                  <Text
                    style={{
                      paddingLeft: 5,
                      marginBottom: 5,
                      fontSize: 12,
                      color: "rgb(216, 0, 12)",
                      fontFamily: "sans-serif-light",
                      marginLeft: 'auto',
                      marginTop: -20
                    }}
                  >
                    You do not have any job post.
                  </Text>
                </>) : (<></>)} */}

              {/* <View
                  style={{
                    borderColor: "#c3c3c3",
                    borderWidth: 1,
                    borderRadius: 10,
                    marginBottom: 10
                  }}>
                  <Picker
                    selectedValue={state.searches}
                    onValueChange={(itemValue, itemPosition) => projDescChange(itemValue, itemPosition)}
                    style={{
                      height: 40,
                      color: "#555"
                    }}
                  >
                    <Picker.Item label="Choose in your job post" value="0" />
                    {projList.map((row, index) => {
                      return (
                        <Picker.Item key={index} label={row.job_headline} value={row.id} />
                      )
                    })}
                  </Picker>
                </View> */}

              <Text
                style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}
              >
                Project Budget :
              </Text>
              <TextInput
                style={{ ...styles.input, width: 270 }} keyboardType="numeric"
                value={projCost} onChangeText={(projCost) => setProjCost(projCost)}
              />

              <Text
                style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}
              >
                Project Address :
              </Text>
              <TextInput
                style={{ ...styles.input, width: 270 }}
                value={projAddress}
                onChangeText={(projAddress) => setProjAddress(projAddress)}
              />

              <Text
                style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}
              >
                Start Date :
              </Text>
              {/* onTouchStart={showDatepicker} */}
              <Pressable onPress={() => showMode()}>
                <TextInput
                  style={{ ...styles.input, width: 270 }}
                  value={startDate}
                  editable={false}
                />
              </Pressable>
              {show ? (
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    // mode={mode}
                    is24Hour={true}
                    display="default"
                    type="default"
                    onChange={onChangeDate}
                  // onConfirm={() => alert("puta")}
                  />
                </View>
              ) : (<></>)}

              <Text
                style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}
              >
                End Date :
              </Text>
              <Pressable onPress={() => showMode2()}>
                <TextInput
                  style={{ ...styles.input, width: 270 }}
                  value={startDate2}
                  editable={false}
                />
              </Pressable>
              {show2 ? (
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date2}
                    // mode={mode}
                    is24Hour={true}
                    display="default"
                    type="default"
                    onChange={onChangeDate2}
                  // onConfirm={() => alert("puta")}
                  />
                </View>
              ) : (<></>)}

              <Text
                style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}
              >
                Service :
              </Text>

              {viewService ? (
                <View style={{
                  flexDirection: "row", marginBottom: 5,
                  marginTop: 5,
                }} >
                  {projService.map((item, index) => {
                    return (
                      <Pressable
                        activeOpacity={0.5}
                        style={{
                          textAlign: "center",
                          backgroundColor: "#fff",
                          minWidth: 50,
                          height: 25,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                          borderWidth: 1,
                          borderColor: "#555",
                          marginRight: 10,
                          paddingHorizontal: 10,
                          marginBottom: 5,
                        }}
                        key={index}
                        onPress={() => deleteService(index)}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#555",
                          }}
                        >
                          {item}
                        </Text>
                      </Pressable>
                    )
                  })}

                </View>
              ) : (<></>)}


            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                position: "absolute",
                right: 20,
                bottom: 10,
              }}
            >
              <Pressable
                activeOpacity={0.5}
                style={{
                  textAlign: "center",
                  backgroundColor: "#14a800",
                  width: 70,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginBottom: 7,
                  marginRight: 8,
                }}
                onPress={closeModal}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Close
                </Text>
              </Pressable>

              <Pressable
                activeOpacity={0.5}
                style={{
                  textAlign: "center",
                  backgroundColor: "#14a800",
                  width: 70,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginBottom: 7,
                }}
                onPress={() => setAppointment()}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Save
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAlert}
        onRequestClose={() => {
          setModalAlert(!modalAlert);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, height: 120 }}>

            <View style={{ flexDirection: "column", }}>
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 18,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'center',
                lineHeight: 25
              }}>{alertText}</Text>

            </View>

            <View style={{
              flexDirection: "row", position: "absolute", bottom: 10,
              width: '100%', justifyContent: 'center', right: 0
            }}>
              <Pressable
                activeOpacity={0.5}
                style={{
                  textAlign: "center",
                  backgroundColor: "#14a800",
                  width: 70,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginBottom: 7,
                  marginRight: 8,
                }}
                onPress={() => {
                  setModalAlert(!modalAlert)
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Okay
                </Text>
              </Pressable>

            </View>
          </View>
        </View>
      </Modal>

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
    width: 240,
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
    color: "#555",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    height: 510,
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

export default ClientChats;
