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
import * as Location from "expo-location";
// import MyImage from "../assets/images/SignUp";

const SignUp = ({ navigation }) => {
  const [isSelected, setSelection] = React.useState(false);
  const [modalTerms, setModalTerms] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const [alertText, setAlertText] = useState("");
  const [modalAlert, setModalAlert] = useState(false);

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
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState(null);

  const onChangeDate = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getMonth() +
      1 +
      "/" +
      tempDate.getDate() +
      "/" +
      tempDate.getFullYear();

    setShow(false);
    setBday(fDate);
    console.log(fDate);
  };

  const showMode = () => {
    setShow(true);
  };

  const continueSignUp = async () => {
    setModalLoading(true);
    console.log(location);
    let today = new Date();
    let newBday = bday.split("/");
    let date = newBday[2];
    let newdate = today.getFullYear() - 18;
    let mindate = newdate - 60;

    if (Number(date) <= newdate && Number(date) >= mindate) {
    } else {
      //   alert("Invalid Age. must be 18 years old or above.");
      setAlertText("Age must be 18 years old or above.");
      setModalAlert(true);
      setModalLoading(false);
      return;
    }

    if (
      !fname ||
      !lname ||
      !mname ||
      !address ||
      !mobile ||
      !bday ||
      isSelected === false
    ) {
      //   alert("Please fill all the fields");
      setAlertText("Please fill all the fields.");
      setModalAlert(true);
      setModalLoading(false);
    } else if (mobile.length !== 11) {
      setAlertText("Mobile number must be 11 characters.");
      setModalAlert(true);
      setModalLoading(false);
    } else if (mobile.charAt(0) !== "0" && mobile.charAt(1) !== "9") {
      setAlertText("Invalid mobile number.");
      setModalAlert(true);
      setModalLoading(false);
    } else {
      let Newfname = fname.replace(/\b[a-z]/g, function (txtjq) {
        return txtjq.toUpperCase();
      });

      let Newfname2 = lname.replace(/\b[a-z]/g, function (txtjq) {
        return txtjq.toUpperCase();
      });

      let NewAddress = address.replace(/\b[a-z]/g, function (txtjq3) {
        return txtjq3.toUpperCase();
      });

      let data = {
        name: Newfname + " " + mname.toUpperCase() + ". " + Newfname2,
        fname: Newfname,
        gender: state.searches,
        mobile_no: mobile,
        address: NewAddress,
        birthday: bday,
        age: today.getFullYear() - date,
        lat: location.coords.latitude,
        longt: location.coords.longitude,
      };

      try {
        await AsyncStorage.removeItem("signup_session");
        await AsyncStorage.setItem("signup_session", JSON.stringify(data));
        navigation.navigate("SignUpNext");
        console.log("tanga")
        setModalLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    // console.log(fname);
    // console.log(lname);
    // console.log(mname);
    // console.log(mobile);
    // console.log(address);
    // console.log(bday);
  };

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
      // setLoadingLocation(false);

      if (location) {
        let response = await Location.reverseGeocodeAsync({
          latitude: lat,
          longitude: longt,
        });
        for (let item of response) {
          console.log(item);
          console.log(item.city + " " + item.subregion);
          setAddress(item.city + " " + item.subregion);
        }
      }

    })();
  }, []);

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
            Create your account
          </Text>

          <View style={{ alignItems: "center", marginTop: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={fname}
              onChangeText={(fname) => setFname(fname)}
            />

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lname}
              onChangeText={(lname) => setLname(lname)}
            />

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                paddingHorizontal: 30,
              }}
            >
              <TextInput
                style={{ ...styles.input, width: "50%", marginRight: 5 }}
                placeholder="M.I"
                value={mname}
                onChangeText={(mname) => setMname(mname)}
              />
              <View
                style={{
                  width: "48%",
                  borderColor: "#c3c3c3",
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 51,
                  justifyContent: "center",
                }}
              >
                <Picker
                  selectedValue={state.searches}
                  onValueChange={(itemValue, itemPosition) =>
                    setState({
                      searches: itemValue,
                      choosenIndex: itemPosition,
                    })
                  }
                  style={{ height: 40 }}
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType={"number-pad"}
              value={mobile}
              onChangeText={(mobile) => setMobile(mobile)}
            />

            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={(address) => setAddress(address)}
              editable={false}
            />

            <View style={{ marginTop: 5, marginBottom: 5 }}>
              <Pressable onPress={() => showMode()}>
                <TextInput
                  // value={date.toString()}
                  style={styles.input}
                  placeholder="Birthday"
                  value={bday}
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
                  />
                </View>
              ) : (
                <></>
              )}
            </View>

            <View style={{ flexDirection: "row", paddingHorizontal: 45 }}>
              <CheckBox
                style={{ borderColor: "#555" }}
                value={isSelected}
                onValueChange={setSelection}
              />
              <Pressable
              //   onPress={() => setModalTerms(true)}
              >
                <Text style={{ fontSize: 15 }}>
                  Yes, I understand and agree to the
                  <Text
                    style={{
                      color: "#1d4354",
                      textDecorationLine: "underline",
                    }}
                  >
                    Terms of Service
                  </Text>
                  , including the{" "}
                  <Text
                    style={{
                      color: "#1d4354",
                      textDecorationLine: "underline",
                    }}
                  >
                    User Agreement{" "}
                  </Text>
                  and{" "}
                  <Text
                    style={{
                      color: "#1d4354",
                      textDecorationLine: "underline",
                    }}
                  >
                    Privacy Policy.
                  </Text>
                </Text>
              </Pressable>
            </View>

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

export default SignUp;
