import React, { useEffect, useState, useCallback } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
  Picker,
  Modal,
  RefreshControl
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import MyImage from "../../assets/images/client";
import { Avatar, } from "react-native-paper";
import StarRating from 'react-native-star-rating';
import * as ImagePicker from "expo-image-picker";

const FreelancerAppointment = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [state, setState] = React.useState({
    searches: "Name",
    choosenIndex: 0
  });

  const [refreshing, setRefreshing] = useState(false);
  const [hiresList, setHiresList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appointIdCancel, setAppointIdCancel] = useState("");
  const [appointIdDone, setAppointIdDone] = useState("");
  const [freelancerIdCancel, setFreelancerIdCancel] = useState("");
  const [freelancerIdDone, setFreelancerIdDone] = useState("");
  const [headlineCancel, setHeadlineCancel] = useState("");
  const [headlineDone, setHeadlineDone] = useState("");
  const [cancelAppointModal, setCancelAppointModal] = useState(false);
  const [info, setInfo] = useState([]);

  const sampleProfile = "https://th.bing.com/th/id/R.782adc2b6062ab00461359da5b02b753?rik=Y%2fJZM98TPsfXxA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-PNG-File.png&ehk=nJ0Yls4aiMdSvREO5hB2GU7Hc3cL04UQeojwLhvL8Gk%3d&risl=&pid=ImgRaw&r=0";

  const [modalAlert, setModalAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const [image, setImage] = useState(null);
  const [comment, setComment] = useState("");
  const [starCount, setStarCount] = useState(0);

  const [feedbackModal, setFeedbackModal] = useState(false);
  const [freelancerCount, setFreelancerCount] = useState(0);

  const [goFeedbackModal, setGoFeedbackModal] = useState(false);
  const [zeroData, setZeroData] = useState(false);

  // const sampleImage = [
  //   "http://192.168.42.241/wefixit/backend/uploads/feedback_photos/61d953e428ce13.98408624.jpg",
  //   "http://192.168.42.241/wefixit/backend/uploads/feedback_photos/61d953e4294fe9.44851010.jpg",
  //   "http://192.168.42.241/wefixit/backend/uploads/feedback_photos/61d953e42cdb58.26595499.jpg",
  // ]

  const [sampleImage, setSampleImage] = useState([]);

  const loadData = () => {
    let user_page = {
      pagee: 1,
      limit: null,
      start: null
    }

    fetch("http://192.168.42.241/wefixit/backend/api/appointments/freelancer_fetch_my_appointments.php", {
      method: "POST",
      body: JSON.stringify(user_page),
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
        // setMyId(result.user_id);
        console.log(result);
        let data = [];
        for (let row of result) {
          let client_id = "";
          let client_name = "";
          let client_photo = "";
          let client_address = "";
          let client_rating = "";
          let job_headline = "";
          let client_fname = "";

          fetch(
            "http://192.168.42.241/wefixit/backend/api/users/view_profile_id.php",
            {
              method: "POST",
              body: JSON.stringify({ id: row.client_id }),
              headers: {
                //Header Defination
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
            .then((response2) => response2.text())
            .then((responseJson2) => {
              //Hide Loader
              const result2 = JSON.parse(responseJson2);
              // console.log(result2)
              client_id = result2.user_id;
              client_name = result2.name;
              client_photo = result2.profile_photo;
              client_address = result2.address;
              client_rating = result2.rating;
              client_fname = result2.fname;

              setTimeout(() => {
                data.push({
                  ...row,
                  client_id: client_id,
                  client_name: client_name,
                  client_photo: client_photo,
                  client_address: client_address,
                  client_rating: client_rating,
                  job_headline: job_headline,
                  client_fname: client_fname
                });
              }, 300);

            }).catch((err) => {
              console.log(err);
            })

        }

        setTimeout(() => {
          console.log(data);
          setHiresList(data);
        }, 800);


        // setHiresList(result);
        // setLoading(false);
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

    //JOB COUNT
    fetch('http://192.168.42.241/wefixit/backend/api/users/freelancer_my_job_count.php', {
      method: 'GET',
      headers: {
        //Header Defination
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((responseJson) => {
        //Hide Loader
        const result = JSON.parse(responseJson);
        setFreelancerCount(result.total_freelancer_count.total_freelancer_count);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error)
      });

  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false)
    }, 1000)
  }, []);

  useEffect(() => {
    setLoading(false);

    if (hiresList.length === 0) {
      setZeroData(true);
    }
  }, [hiresList])

  useEffect(() => {
    loadData();
  }, [isFocused]);

  const cancelAppointment = (id, f_id, headline) => {
    setAppointIdCancel(id);
    setCancelAppointModal(true);
    setFreelancerIdCancel(f_id);
    setHeadlineCancel(headline);
  }

  const CancelAppointmentControls = (props) => {
    return (

      < Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          setCancelAppointModal(!cancelAppointModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View style={{ flexDirection: "column", }}>
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 18,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'center',
                lineHeight: 25
              }}>Are you sure you want {'\n'} to cancel this appointment ? </Text>

            </View>

            <View style={{
              flexDirection: "row", position: "absolute", bottom: 10,
              width: '100%', justifyContent: 'center', right: 0
            }}>
              <Pressable
                activeOpacity={0.5}
                style={{
                  textAlign: "center",
                  backgroundColor: "#ccc",
                  width: 70,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginBottom: 7,
                  marginRight: 8,
                }}
                onPress={() => setCancelAppointModal(false)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#555",
                  }}
                >
                  No
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
                  marginRight: 8,
                }}
                // onPress={() => EditJob(props.job_id)}
                onPress={() => goCancel()}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Yes
                </Text>
              </Pressable>



            </View>
          </View>
        </View>
      </Modal >

    )
  }

  const GoFeedbackControls = (props) => {
    return (

      < Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          setGoFeedbackModal(!goFeedbackModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View style={{ flexDirection: "column", }}>
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 18,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'center',
                lineHeight: 25
              }}>Are you sure you want {'\n'} to mark this as done ? </Text>

            </View>

            <View style={{
              flexDirection: "row", position: "absolute", bottom: 10,
              width: '100%', justifyContent: 'center', right: 0
            }}>
              <Pressable
                activeOpacity={0.5}
                style={{
                  textAlign: "center",
                  backgroundColor: "#ccc",
                  width: 70,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginBottom: 7,
                  marginRight: 8,
                }}
                onPress={() => setGoFeedbackModal(false)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#555",
                  }}
                >
                  No
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
                  marginRight: 8,
                }}
                // onPress={() => EditJob(props.job_id)}
                onPress={() => goSendFeedback()}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Yes
                </Text>
              </Pressable>



            </View>
          </View>
        </View>
      </Modal >

    )
  }

  const goCancel = () => {
    // alert("Appointment has been cancelled.")

    fetch(
      "http://192.168.42.241/wefixit/backend/api/appointments/fcancel_appointment.php",
      {
        method: "PUT",
        body: JSON.stringify({ id: appointIdCancel }),
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response2) => response2.text())
      .then((responseJson2) => {
        //Hide Loader
        const result2 = JSON.parse(responseJson2);
        console.log(result2);
        //UPDATED
        if (result2.message === "updated") {
          //request has been sent to your freelancer

          setModalAlert(true);
          setAlertText("Request has been sent to your client.");
          setCancelAppointModal(false);
          loadData();


          let notif_data = {
            notif_text: "wants to cancel the appointment " + headlineCancel,
            notif_from: info.user_id,
            notif_to: freelancerIdCancel
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
            })
            .catch((error) => {
              //Hide Loader
              console.log(error);
            });

        }
        //DELETED
        else if (result2.message === "deleted") {

        }
      })
      .catch((error) => {
        //Hide Loader
        console.log(error);
      });
  }

  const markAsDone = (id, f_id, headline) => {
    setAppointIdDone(id);
    setFeedbackModal(true);
    setFreelancerIdDone(f_id);
    setHeadlineDone(headline);
  }

  useEffect(() => {
    console.log(appointIdCancel);
  }, [appointIdCancel]);

  useEffect(() => {
    console.log(appointIdDone);
  }, [appointIdDone]);

  const MyHiresComponent = hiresList.map((row, index) => (
    <View
      style={{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#c3c3c3",
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
      }}
      key={index}
    >
      <View style={{
        flexDirection: "row", marginBottom: 15,
        borderBottomColor: "#ccc", borderBottomWidth: 1,
        paddingBottom: 6
      }}>
        <Avatar.Image
          style={{ marginTop: 5 }}
          size={55}
          source={{
            uri: row.client_photo || sampleProfile
          }}
        />
        <View style={{ marginLeft: 15, flexDirection: "column" }}>
          <TouchableOpacity
          // onPress={() => viewProfile(row.user_id)}
          >
            <Text style={{ ...styles.title2, color: "#14a800", textDecorationLine: 'underline' }}>
              {row.client_name}
            </Text>
          </TouchableOpacity>
          <Text style={styles.caption2}>{row.client_address}</Text>
          <View style={{ flexDirection: "row", }}>
            <StarRating
              maxStars={5}
              rating={Number(row.client_rating)}
              starSize={16}
              fullStarColor="#14a800"
              emptyStarColor="#14a800"
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >


          {row.f_status === "cancel" ? (<>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
                marginBottom: 7,
                marginRight: 7,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#1d4354",
                  textDecorationLine: 'underline',
                  textAlign: 'right',
                  marginTop: 4,
                }}
              >
                cancel request sent
              </Text>
            </TouchableOpacity>
          </>) : (<>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
                marginBottom: 7,
                marginRight: 7,
              }}
              onPress={() => cancelAppointment(row.id, row.client_id, row.job_headline)}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#1d4354",
                  textDecorationLine: 'underline',
                  marginTop: 4,
                }}
              >
                cancel
              </Text>
            </TouchableOpacity>
          </>)}


        </View>

      </View>

      <View style={{ flexDirection: "column" }}>
        {row.c_status === "cancel" ? (<>
          <Text style={{ ...styles.caption2, color: "#1d4354", textDecorationLine: 'underline' }}>
            {row.client_fname} wants to cancel this appointment.
          </Text>
        </>) : (<></>)}
        {row.c_status === "done" ? (<>
          <Text style={{ ...styles.caption2, color: "#14a800", textDecorationLine: 'underline' }}>
            {row.client_fname} wants to mark this appointment done.
          </Text>
        </>) : (<></>)}

        <Text style={{ ...styles.caption2, color: "#555", marginTop: 5 }}>
          Service : {row.service}
        </Text>
        <Text style={{ ...styles.caption2, color: "#555", marginTop: 5 }}>
          Project budget : {row.proj_cost}
        </Text>
        <Text style={{ ...styles.caption2, color: "#555", marginTop: 5 }}>
          Project address : {row.proj_addr}
        </Text>
        <Text style={{ ...styles.caption2, color: "#555", marginTop: 5 }}>
          Start date : {row.start_date}
        </Text>
        <Text style={{ ...styles.caption2, color: "#555", marginTop: 5 }}>
          End date : {row.end_date}
        </Text>

        <View style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-end",
          marginBottom: 5, marginTop: 8,
        }}>

          {row.f_status === "done" ? (<>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                backgroundColor: "#14a800",
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
                marginBottom: 7,
                marginRight: 7,
                paddingHorizontal: 15
              }}
            // onPress={() => inviteFreelancer(row.user_id)}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                  textDecorationLine: 'underline'
                }}
              >
                Mark as done request sent
              </Text>
            </TouchableOpacity>
          </>) : (<>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                backgroundColor: "#14a800",
                width: 120,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
                marginBottom: 7,
                marginRight: 7,
              }}
              // onPress={() => inviteFreelancer(row.user_id)}
              onPress={() => markAsDone(row.id, row.client_id, row.job_headline)}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                  textDecorationLine: 'underline'
                }}
              >
                Mark as done
              </Text>
            </TouchableOpacity>
          </>)}
        </View>
      </View>

    </View>
  ))

  const chooseUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4,3],
      quality: 1
    })
    if (!result.cancelled) {
      // setImage(result.uri);
      setSampleImage([...sampleImage, result.uri]);
    }
  }

  const goSendFeedback = () => {
    // console.log(sampleImage)
    // alert(comment);
    // alert(starCount);

    let feedback_data = {
      id: appointIdDone,
      fb_to: freelancerIdDone,
      fb_comment: comment,
      fb_star: starCount
    }

    fetch('http://192.168.42.241/wefixit/backend/api/appointments/create_feedback.php', {
      method: 'POST',
      body: JSON.stringify(feedback_data),
    }).then(response => response.text())
      .then(responseJson => {
        const result = JSON.parse(responseJson);
      }).catch(err => {
        console.log(err);
      })

    let done_appoint = {
      id: appointIdDone,
      f_rating: starCount
    }

    fetch('http://192.168.42.241/wefixit/backend/api/appointments/fmarkasdone_appointment.php', {
      method: 'PUT',
      body: JSON.stringify(done_appoint),
    }).then(response => response.text())
      .then(responseJson => {
        const result = JSON.parse(responseJson);
        // console.log(result);
        if (result.message === "updated") {
          setFeedbackModal(false);
          setStarCount(0);
          setComment("");
          setSampleImage([]);
          setModalAlert(true);
          setAlertText("Request has been sent to your client.");
          loadData();

          let notif_data = {
            notif_text: "wants to mark this appointment done " + headlineDone,
            notif_from: info.user_id,
            notif_to: freelancerIdDone
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
            })
            .catch((error) => {
              //Hide Loader
              console.log(error);
            });


        } else if (result.message === "success") {

          setFeedbackModal(false);
          setStarCount(0);
          setComment("");
          setSampleImage([]);
          setModalAlert(true);
          setAlertText("Appointment has been finished.");
          loadData();

          let notif_data = {
            notif_text: "Appointment " + headlineDone + "has been finished.",
            notif_from: info.user_id,
            notif_to: freelancerIdDone
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
            })
            .catch((error) => {
              //Hide Loader
              console.log(error);
            });

          let notif_data2 = {
            notif_text: "Appointment " + headlineDone + "has been finished.",
            notif_from: freelancerIdDone,
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
            })
            .catch((error) => {
              //Hide Loader
              console.log(error);
            });

        }

        setGoFeedbackModal(false);
      }).catch(err => {
        console.log(err);
      })
  }

  const sendFeedback = (e) => {
    if (!comment) {
      setModalAlert(true);
      setAlertText("Please leave a comment");
      return;
    }
    setGoFeedbackModal(true);
  }

  const feedbackCloseModal = () => {
    setFeedbackModal(false);
    setStarCount(0);
    setComment("");
    setSampleImage([]);
  }


  return (
    <SafeAreaView style={styles.container}>
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
          style={{ alignItems: "flex-start", marginLeft: 60, marginTop: 5 }}
        >
          <Text style={{
            ...styles.title, color: "#fff", fontWeight: "400",
            fontSize: 22
          }}>
            My Current Jobs
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
          <View
            style={{
              paddingHorizontal: 10,
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <TextInput style={styles.input} placeholder="Search" />
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

            <Text
              style={{ ...styles.caption, justifyContent: "flex-end" }}
            >{hiresList.length} Current Jobs found.</Text>
          </View>


          {hiresList && hiresList.length !== 0 ? (<></>) : (
            <View
              style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#c3c3c3",
                paddingHorizontal: 10,
                paddingVertical: 10,
                marginBottom: 30,
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 175, height: 100, marginTop: 10 }}
                source={MyImage.noJob}
                resizeMode="contain"
              />
              <Text
                style={{ ...styles.title, marginTop: 10 }}
              >You dont have job yet.</Text>

              {/* <Pressable >
              <Text style={{ ...styles.caption, marginTop: 10, textAlign: "center" }} >
                <Text style={{
                  color: "#14a800",
                  textDecorationStyle: "solid",
                  textDecorationLine: "underline",
                }}>Search for clients</Text>
                {" "}that needs your service.</Text>
            </Pressable> */}
            </View>)}


          {loading === false ? (<>{MyHiresComponent}</>) : (<></>)}

        </ScrollView>
      </View >

      {cancelAppointModal ? (<><CancelAppointmentControls /></>) : (<></>)}

      {goFeedbackModal ? (<><GoFeedbackControls /></>) : (<></>)}

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


      < Modal
        animationType="slide"
        transparent={true}
        visible={feedbackModal}
        onRequestClose={() => {
          setFeedbackModal(!feedbackModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, height: 270 }}>

            <View style={{ flexDirection: "column", }}>
              <Text style={{
                ...styles.title2,
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 20,
                color: "#555",
                textAlign: 'center',
                lineHeight: 25
              }}>Send feedback</Text>

            </View>

            <View style={{ textAlign: 'left', width: '100%' }}>

              <Text style={{ ...styles.title, color: "#555", }}>
                Star Rating :
              </Text>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <StarRating
                  maxStars={5}
                  rating={starCount}
                  starSize={35}
                  fullStarColor="#14a800"
                  emptyStarColor="#ccc"
                  disabled={false}
                  selectedStar={(rating) => setStarCount(rating)}
                  halfStarEnabled={true}
                />
              </View>


              <Text style={{ ...styles.title, color: "#555", marginTop: 15 }}>
                Comment :
              </Text>
              <TextInput style={{ ...styles.input, width: "100%" }} placeholder="Write your comment here"
                value={comment} onChangeText={(comment) => setComment(comment)}
              />


            </View>


            <View style={{
              flexDirection: "row", position: "absolute", bottom: 10,
              flex: 1, justifyContent: 'center', right: 0,
            }}>
              <Pressable
                activeOpacity={0.5}
                style={{
                  textAlign: "center",
                  backgroundColor: "#ccc",
                  width: 70,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginBottom: 7,
                  marginRight: 8,
                }}
                onPress={feedbackCloseModal}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#555",
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
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginBottom: 7,
                  marginRight: 8,
                  paddingHorizontal: 20
                }}
                // onPress={() => EditJob(props.job_id)}
                onPress={sendFeedback}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Send feedback
                </Text>
              </Pressable>



            </View>

          </View>
        </View>
      </Modal >


    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  screen: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },

  input: {
    width: "100%",
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
  },
  caption: {
    fontSize: 16,
    lineHeight: 18,
  },
  title2: {
    fontSize: 18,
    marginTop: 3,
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
    minHeight: 140,
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
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

export default FreelancerAppointment;
