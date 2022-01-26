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
  TouchableOpacity,
  AsyncStorage,
  Modal, 
  Pressable
} from "react-native";

import MyImage from "../assets/images/freelancer";
import * as DocumentPicker from "expo-document-picker";

function FreelancerFillUp2({ navigation }) {
  const [desc, setDesc] = useState("");
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolio, setPortfolio] = useState({});
  const [vportfolioName, showPortfolioName] = useState("");

  const [modalAlert, setModalAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const nextScreen = () => {
    if (!desc) {
      setModalAlert(true);
      setAlertText("Please add a description \n about yourself.")
    } else {
      let data = {
        desc: desc,
        portfolio: portfolio, 
      };
      try {
        AsyncStorage.removeItem("freelancer_session_2");
        AsyncStorage.setItem(
          "freelancer_session_2",
          JSON.stringify(data)
        );
        navigation.navigate("SignUpVerification");
      } catch (err) {
        console.log(err);
      }
    }

  };

  const choosePortfolio = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    // alert(result.uri);
    // console.log(result);
    setPortfolio(result);
    // console.log(result.name);
    setPortfolioName(result.name);
    showPortfolioName(true);
  };

  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.container}>
      <ScrollView style={styles.screen}>
        <Image
          style={{ width: "100%", height: 150, marginTop: 60 }}
          source={MyImage.img_3}
          resizeMode="contain"
        />

        <View style={{ marginTop: 20, paddingHorizontal: 30 }}>
          <Text
            style={{
              paddingLeft: 5,
              marginBottom: 5,
              marginTop: 10,
              fontSize: 16,
              color: "#555",
              fontFamily: "sans-serif-light",
            }}
          >
            Upload your portfolio:
          </Text>

          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              textAlign: "center",
              backgroundColor: "#14a800",
              width: 100,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              marginBottom: 7,
              marginLeft: "auto",
              marginTop: -25,
            }}
            onPress={choosePortfolio}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
              }}
            >
              Choose File
            </Text>
          </TouchableOpacity>

          {vportfolioName ? (
            <Text
              style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
                marginRight: "auto",
              }}
            >
              {portfolioName}
            </Text>
          ) : (
            <Text
              style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
                marginRight: "auto",
              }}
            >
              No file chosen
            </Text>
          )}

          <Text
            style={{
              paddingLeft: 5,
              marginBottom: 5,
              fontSize: 16,
              color: "#555",
              fontFamily: "sans-serif-light",
              marginTop: 40,
            }}
          >
            Description of your profile :
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={15}
            style={{ ...styles.input, height: 150, textAlignVertical: "top" }}
            placeholder="Ex. Hi Im Jb and i love working with my clients,
                    i can do tv repairs, item deliveries."
            value={desc}
            onChangeText={(desc) => setDesc(desc)}
          />

          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "#555",
              fontFamily: "sans-serif-light",
            }}
          >
            And after completing this form you can now start and wait for your
            first freelance job here at wefixit.
          </Text>

          <View
            style={{
              marginTop: 30,
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
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>

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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default FreelancerFillUp2;
