import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage,
  Modal,
  Pressable
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import RadioButton from "react-native-radio-button";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import MyImage from "../assets/images/login";

const SignUpVerification = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [selected, setSelected] = React.useState(false);
  const [state, setState] = React.useState("");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [wholeImage, setWholeImage] = useState(null);

  const [modalAlert, setModalAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const [frontImageValue, setFrontImageValue] = useState({});
  const [backImageValue, setBackImageValue] = useState({});
  const [wholeImageValue, setWholeImageValue] = useState({});

  const [role, setRole] = useState("");
  const [info, setInfo] = useState({});

  const loadData = () => {
    async function fetchData() {
      try {
        let resp = await AsyncStorage.getItem("signup_session_3");
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


  //   const loadData = async () => {
  //     try {
  //       let resp = await AsyncStorage.getItem("role");
  //       setRole(resp);
  //       fetch(
  //         "http://192.168.42.241/ehiremo/backend/api/users/sign_up_session.php",
  //         {
  //           method: "GET",
  //           headers: {
  //             //Header Defination
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //         .then((response) => response.text())
  //         .then((responseJson) => {
  //           //Hide Loader
  //           const result = JSON.parse(responseJson);
  //           // console.log(result);
  //           setInfo(result);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });

  //       console.log(resp);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   useEffect(() => {
  //     loadData();
  //   }, [isFocused]);

  //   const createAcc = () => {
  //     if (Object.keys(frontImageValue).length === 0 && frontImageValue.constructor === Object ||
  //       Object.keys(backImageValue).length === 0 && backImageValue.constructor === Object
  //     ) {
  //       alert("Please fill all the fields.");
  //     } else {
  //       setModalAlert(true);
  //     }
  //     // if (state === "client") {
  //     //   navigation.navigate("TalentGettingStarted_3");
  //     // } else if (state === "freelancer") {
  //     //   navigation.navigate("ClientGettingStarted_5");
  //     // } else {
  //     //   console.log("Please select one");
  //     // }

  //   }

  const chooseFront = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4,3],
      quality: 1
    })
    if (!result.cancelled) {
      setFrontImage(result.uri);
      setFrontImageValue(result);
    }
  }

  const chooseBack = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4,3],
      quality: 1
    })
    if (!result.cancelled) {
      setBackImage(result.uri);
      setBackImageValue(result);
    }
  }

  const nextScreen = async () => {
    if (Object.keys(frontImageValue).length === 0 && frontImageValue.constructor === Object ||
      Object.keys(backImageValue).length === 0 && backImageValue.constructor === Object) {
      setModalAlert(true);
      setAlertText("Please upload a photo");
    } else {
      console.log(frontImageValue);
      console.log(backImageValue);
      let data = {
        frontImageValue: frontImageValue,
        backImageValue: backImageValue
      }
      try {
        AsyncStorage.removeItem("signup_session_4");
        AsyncStorage.setItem(
          "signup_session_4",
          JSON.stringify(data)
        );
        navigation.navigate("FaceVerificationSignUp");
      } catch (err) {
        console.log(err);
      }
    }
  }

  //   const continueSign = () => {
  //     if (Object.keys(wholeImageValue).length === 0 && wholeImageValue.constructor === Object) {
  //       alert("Please upload a photo")
  //     } else {
  //       //CREATE USER
  //       console.log(info);

  //       let frontIdFinal = "";
  //       let backIdFinal = "";
  //       let wholeIdFinal = "";

  //       let uploadData = new FormData();
  //       uploadData.append('submit', 'ok');
  //       uploadData.append('file', { type: 'image/jpg', uri: frontImageValue.uri, name: 'uploadimagetmp.jpg' })

  //       fetch('http://192.168.42.241/ehiremo/backend/api/mobile_id_upload.php', {
  //         method: 'POST',
  //         body: uploadData
  //       }).then(response => response.text())
  //         .then(responseJson => {
  //           const result = JSON.parse(responseJson);
  //           frontIdFinal = result.urlpic

  //         }).catch(err => {
  //           console.log(err)
  //         })

  //       let uploadData2 = new FormData();
  //       uploadData2.append('submit', 'ok');
  //       uploadData2.append('file', { type: 'image/jpg', uri: backImageValue.uri, name: 'uploadimagetmp.jpg' })

  //       fetch('http://192.168.42.241/ehiremo/backend/api/mobile_id_upload.php', {
  //         method: 'POST',
  //         body: uploadData2
  //       }).then(response => response.text())
  //         .then(responseJson => {
  //           const result = JSON.parse(responseJson);
  //           backIdFinal = result.urlpic

  //         }).catch(err => {
  //           console.log(err)
  //         })

  //       let uploadData3 = new FormData();
  //       uploadData3.append('submit', 'ok');
  //       uploadData3.append('file', { type: 'image/jpg', uri: wholeImageValue.uri, name: 'uploadimagetmp.jpg' })

  //       fetch('http://192.168.42.241/ehiremo/backend/api/mobile_id_upload.php', {
  //         method: 'POST',
  //         body: uploadData3
  //       }).then(response => response.text())
  //         .then(responseJson => {
  //           const result = JSON.parse(responseJson);
  //           wholeIdFinal = result.urlpic

  //         }).catch(err => {
  //           console.log(err)
  //         })

  //       setTimeout(() => {
  //         // console.log(frontIdFinal);
  //         // console.log(backIdFinal);
  //         // console.log(wholeIdFinal);
  //         let user_data = {
  //           user_id: info.user_id,
  //           role: role,
  //           name: info.name,
  //           fname: info.fname,
  //           gender: info.gender,
  //           address: info.address,
  //           birthday: info.birthday,
  //           age: info.age,
  //           email: info.email,
  //           password: info.password,
  //           front_pic: frontIdFinal,
  //           back_pic: backIdFinal,
  //           whole_pic: wholeIdFinal
  //         }

  //         fetch('http://192.168.42.241/ehiremo/backend/api/users/create_user.php', {
  //           method: 'POST',
  //           body: JSON.stringify(user_data)
  //         }).then(response => {
  //           navigation.navigate("VerificationRequest");
  //         }).catch(err => {
  //           console.log(err)
  //         })

  //       }, 500)

  //     }
  //   }


  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.container}>
      <ScrollView style={styles.screen}>
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
          Verification
        </Text>

        <Text
          style={{
            paddingHorizontal: 20,
            textAlign: "center",
            fontSize: 18,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginTop: 30,
          }}
        >
          Please attach front and back photo of your id.
        </Text>

        <View style={{ alignItems: 'center' }}>
          <Image
            style={{ width: "80%", height: 180, }}
            source={MyImage.boy}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            width: "100%",
            marginBottom: 20,
            marginTop: 20,
            alignItems: "center",
            flexDirection: 'row',
            paddingHorizontal: 30
          }}
        >
          <View style={{ width: '50%', height: 170, borderColor: "#ccc", borderWidth: 1 }}>
            <Image
              style={{ width: '100%', height: '100%' }}
              // resizeMode="cover"
              source={{ uri: frontImage }}
            />
          </View>

          <View style={{ width: '50%', height: 170, borderColor: "#ccc", borderWidth: 1 }}>
            <Image
              style={{ width: '100%', height: '100%' }}
              // resizeMode="cover"
              source={{ uri: backImage }}
            />
          </View>

        </View>

        <View style={{
          width: "100%",
          marginBottom: 20,
          alignItems: "center",
          flexDirection: 'row',
          paddingHorizontal: 30,
          justifyContent: 'space-between'
        }}>
          <View style={{ marginLeft: 'auto', width: '50%' }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                textAlign: "center",
                backgroundColor: "#1d4354",
                width: 70,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
              onPress={chooseFront}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                Front id
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              backgroundColor: "#1d4354",
              width: 70,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
            onPress={chooseBack}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
              }}
            >
              Back id
            </Text>
          </TouchableOpacity>
        </View>



        <View
          style={{
            marginTop: 50,
            width: "100%",
            alignItems: "center",
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
            onPress={nextScreen}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
              }}
            >
              Create my account
            </Text>
          </TouchableOpacity>
        </View>

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




      </ScrollView>
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
    height: 40,
    borderWidth: 1,
    borderColor: "#c3c3c3",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16
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
    height: 420,
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

export default SignUpVerification;
