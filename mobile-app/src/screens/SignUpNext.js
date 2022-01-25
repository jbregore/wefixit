import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
  CheckBox,
  Button,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  RefreshControl,
  AsyncStorage,
  ActivityIndicator,
  Picker,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useIsFocused } from "@react-navigation/native";

import MyImage from "../assets/images/login";
import axios from "axios";

const SignUpNext = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isSelected, setSelection] = React.useState(false);
  const [modalTerms, setModalTerms] = useState(false);

  const [alertText, setAlertText] = useState("");
  const [modalAlert, setModalAlert] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const [state, setState] = React.useState({
    searches: "Male",
    choosenIndex: 0,
  });

  const [show, setShow] = useState(false);
  const [bday, setBday] = useState("");
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mname, setMname] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const loadData = () => {
    async function fetchData() {
      try {
        let resp = await AsyncStorage.getItem("signup_session");
        console.log(JSON.parse(resp));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  };

  useEffect(() => {
    loadData();
  }, [isFocused]);

  const continueSignUp = () => {
    if (!email || !password || !cpassword) {
      setAlertText("Please fill all the fields.");
      setModalAlert(true);
      return;
    }
    setModalLoading(true);
    fetch("http://192.168.42.241/validate_email.php", {
      method: "POST",
      body: JSON.stringify({ user_email: email }),
      headers: {
        //Header Defination
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((responseJson) => {
        //Hide Loader
        console.log(email);
        console.log(responseJson);
        if (responseJson === "Email address is invalid format") {
          setAlertText("Email is invalid format");
          setModalAlert(true);
        } else if (responseJson === "Email Undeliverable") {
          setAlertText("Email Undeliverable");
          setModalAlert(true);
        } else if (responseJson === "Email is Disposable") {
          setAlertText("Email Disposable");
          setModalAlert(true);
        } else {
          // alert("yehey")

          fetch("http://192.168.42.241/wefixit/backend/api/users/validate_duplicate_email.php", {
            method: "POST",
            body: JSON.stringify({ email: email }),
            headers: {
              //Header Defination
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.text())
            .then((responseJson) => {
              const result2 = JSON.parse(responseJson);
              if (result2.duplicate === true) {
                setAlertText("Email already exist");
                setModalAlert(true);
              } else {
                if (password.length < 8) {
                  setAlertText("Password must be atleast 8 characters.");
                  setModalAlert(true);
                } else if (password !== cpassword) {
                  setAlertText("Password doesnt match.");
                  setModalAlert(true);
                } else {
                  let data = {
                    email: email,
                    password: password,
                  };
                  console.log(data);
                  try {
                    AsyncStorage.removeItem("signup_session_2");
                    AsyncStorage.setItem(
                      "signup_session_2",
                      JSON.stringify(data)
                    );
                    //choose between client or freelancer
                    navigation.navigate("ChooseRole");
                    setModalLoading(false);
                  } catch (err) {
                    console.log(err);
                  }
                }
              }
            })
            .catch((err) => {
              setModalLoading(false);
              console.log(err);
            });





        }
        setModalLoading(false);
      })
      .catch((err) => {
        setModalLoading(false);
        console.log(err);
      });
  };

  //   const continueSignUp = () => {

  //     let today = new Date();
  //     let newBday = bday.split("/");
  //     let date = newBday[2];
  //     let newdate = today.getFullYear() - 18;
  //     let mindate = newdate - 60;

  //     if (Number(date) <= newdate && Number(date) >= mindate) {
  //     } else {
  //       alert("Invalid Age. must be 18 years old or above.");
  //       return;
  //     }

  //     if (!email || !fname || !lname || !mname || !address || !address || !bday || !password ||
  //       !cpassword || isSelected === false) {
  //       alert("Please fill all the fields");
  //     } else if (password.length < 8) {
  //       alert("Password must be atleast 8 characters long.");
  //     } else if (password !== cpassword) {
  //       alert("Password doesnt match");
  //     } else {
  //       // alert("Yehey")

  //       fetch("http://192.168.42.241/ehiremo/backend/api/users/validate_email.php", {
  //         method: "POST",
  //         body: JSON.stringify({ user_email: email }),
  //         headers: {
  //           //Header Defination
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //       })
  //         .then((response) => response.text())
  //         .then((responseJson) => {
  //           //Hide Loader
  //           if (responseJson === "Email address is invalid format") {
  //             alert("Invalid : email is invalid format");
  //           } else if (responseJson === "Email Undeliverable") {
  //             alert("Invalid : email is undeliverable");
  //           } else if (responseJson === "Email is Disposable") {
  //             alert("Invalid : email is disposable");
  //           } else {

  //             let Newfname = fname.replace(/\b[a-z]/g, function (txtjq) {
  //               return txtjq.toUpperCase();
  //             });

  //             let Newfname2 = lname.replace(/\b[a-z]/g, function (txtjq) {
  //               return txtjq.toUpperCase();
  //             });

  //             let NewAddress = address.replace(/\b[a-z]/g, function (txtjq3) {
  //               return txtjq3.toUpperCase();
  //             });

  //             let user_data = {
  //               user_id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  //               role: "",
  //               name: Newfname + " " + mname + ". " + Newfname2,
  //               fname: Newfname,
  //               gender: state.searches,
  //               address: NewAddress,
  //               birthday: bday,
  //               age: today.getFullYear() - date,
  //               email: email,
  //               password: password,
  //             };

  //             fetch(
  //               "http://192.168.42.241/ehiremo/backend/api/users/create_signup_session.php",
  //               {
  //                 method: "POST",
  //                 body: JSON.stringify(user_data),
  //                 headers: {
  //                   //Header Defination
  //                   Accept: "application/json",
  //                   "Content-Type": "application/json",
  //                 },
  //               }
  //             )
  //               .then((response) => response.text())
  //               .then((responseJson) => {
  //                 //Hide Loader
  //                 const result = JSON.parse(responseJson);
  //                 navigation.navigate("SignUpNext");
  //               })
  //               .catch((error) => {
  //                 console.log(error);
  //               });

  //             // setModalAlert(true);
  //             // signNext(user_data);

  //           }
  //           // console.log(responseJson)
  //           // const result = JSON.parse(responseJson);
  //           // // setInfo(result);
  //           // console.log(result);
  //         })
  //         .catch((error) => {
  //           //Hide Loader
  //           console.log(error);
  //         });
  //     }
  //   }

  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.container}>
      <ScrollView style={styles.screen}>
        <View style={{ marginTop: 50 }}>
          <Text
            style={{
              paddingHorizontal: 20,
              textAlign: "center",
              fontSize: 24,
              color: "#555",
              fontFamily: "sans-serif-light",
            }}
          >
            Complete your account set up.
          </Text>

          <View style={{ justifyContent: "center" }}>
            <Image
              style={{ width: "100%", height: 230 }}
              source={MyImage.complete}
              resizeMode="contain"
            />
          </View>

          <View style={{ alignItems: "center", marginTop: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Work Email"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />

            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(password) => setPassword(password)}
            />

            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Confirm Password"
              value={cpassword}
              onChangeText={(cpassword) => setCPassword(cpassword)}
            />

            <View
              style={{
                marginTop: 20,
                width: "100%",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  textAlign: "center",
                  backgroundColor: "#14a800",
                  width: 300,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
                // onPress={() => navigation.navigate("SignUpNext")}
                onPress={continueSignUp}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#fff",
                  }}
                >
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

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

      {/* MODAL ALERT*/}
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
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 18,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                  textAlign: "center",
                  lineHeight: 25,
                }}
              >
                {alertText}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                bottom: 10,
                width: "100%",
                justifyContent: "center",
                right: 0,
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
                onPress={() => {
                  setModalAlert(!modalAlert);
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

    </KeyboardAvoidingView>
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
    height: 50,
    borderWidth: 1,
    borderColor: "#c3c3c3",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },

  datePickerStyle: {
    width: 200,
    marginTop: 30,
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

export default SignUpNext;
