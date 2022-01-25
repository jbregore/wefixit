import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ActivityIndicator,
  SafeAreaView
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

//icons
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import MyImage from "../assets/images/login";
// import LoadingSpinner from "./LoadingSpinner";
import firebase from "../config/firebase/firebase";
import { useIsFocused } from "@react-navigation/native";

const auth = firebase.auth();

const Login = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [modalLoading, setModalLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [modalAlert, setModalAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const [isLoading, setIsLoading] = useState(true);


  const submitLog = () => {
    if (!username || !password) {
      setModalAlert(true);
      setAlertText("Please fill all the fields.");
    } else {
      setModalLoading(true);
      fetch('http://192.168.42.241/wefixit/backend/api/users/login.php', {
        method: 'POST',
        body: JSON.stringify({
          'login_email': username,
          'login_password': password
        }),
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
          console.log(result)
          if (result.message === "no account found") {
            setModalAlert(true);
            setAlertText("No account found.");
          }
          if (result.role === "client") {
            navigation.navigate("ClientNavigation");
          } else if (result.role === "freelancer") {
            // navigation.navigate("navigation");
            navigation.navigate("FreelancerNavigation");
          }
          setModalLoading(false);

        })
        .catch((error) => {
          //Hide Loader
          console.log(error);
          setModalLoading(false);
        });

    }
  }

  useEffect(() => {
    // setUsername("");
    // setPassword("");
  }, [isFocused]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setUsername("");
      setPassword("");
    }, 3500);
  }, []);


  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.screen}>
          <View
            style={{ alignItems: "center", justifyContent: 'center', marginTop: 120 }}
          >
            <Image
              source={MyImage.logo}
              style={{ height: 250, width: 250, }}
            />

            <Text style={{fontSize: 40, fontWeight: 'bold', letterSpacing: 2,
          color:"#1d4354", fontFamily: ''}}>
              <Text>we</Text><Text style={{color: "#14a800"}}>fixit</Text>
            </Text>

          </View>

          <View style={{ alignItems: 'center', marginTop: 190 }}>
            <Image
              source={MyImage.three_dots}
              style={{
                width: 100,
                height: 70,
                bottom: 0
              }}
            />
          </View>

        </View>
      </SafeAreaView>
    );
  }



  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.container}>
      <ScrollView style={styles.screen}>
        <Image
          style={{ width: "100%", height: 250, marginTop: 30 }}
          source={MyImage.logo}
          resizeMode="contain"
        />

        <Text
          style={{
            paddingHorizontal: 20,
            textAlign: "center",
            fontSize: 22,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginTop: 30,
          }}
        >
          Login to your account.
        </Text>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <FontAwesome
              name="user-o"
              size={24}
              color="#c3c3c3"
              style={{
                position: "absolute",
                left: 10,
                top: 10,
              }}
            />
            <TextInput style={styles.input} placeholder="Email"
              onChangeText={(username) => setUsername(username)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <AntDesign
              name="lock"
              size={30}
              color="#c3c3c3"
              style={{
                position: "absolute",
                left: 5,
                top: 8,
              }}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <TouchableOpacity
          //   onPress={() => setModalForgot(true)}
          >
            <Text
              style={{
                paddingHorizontal: 20,
                textAlign: "center",
                fontSize: 16,
                color: "#1d4354",
                fontFamily: "sans-serif-light",
                textDecorationLine: "underline",
                fontWeight: 'bold'
              }}
            >
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        </View>


        <View
          style={{
            marginTop: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={submitLog}
            // onPress={() => navigation.navigate("ClientNavigation")}
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
          >
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text
            style={{
              paddingHorizontal: 20,
              textAlign: "center",
              fontSize: 18,
              color: "#555",
              fontFamily: "sans-serif-light",
            }}
          >
            Didn't have an account ? {" "}
            <Text style={{ color: "#1d4354", fontWeight: 'bold', textDecorationLine: 'underline' }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>

        {/* <View style={{backgroundColor: '#14a800', height: 340, width: 340, alignSelf: 'center',
          borderRadius: 170, marginTop: 50}}>

        </View> */}

      </ScrollView>

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

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: "100%"
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
    paddingLeft: 38,
    fontSize: 16,
  },

  datePickerStyle: {
    width: 200,
    marginTop: 20,
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

export default Login;
