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

import MyImage from "../../assets/images/client";
import { useIsFocused } from "@react-navigation/native";

const FreelancerHelp = ({ navigation }) => {
  
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
          style={{ alignItems: "flex-start", marginLeft: 115, marginTop: 5 }}
        >
          <Text style={{ ...styles.title, color: "#fff", fontWeight: "400" }}>
            Help{" "}
          </Text>
        </View>
      </View>
      <View style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false} >
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
              paddingBottom: 30
            }}
          >
              <Image source={MyImage.underConss} style={{width: 200, height: 200}}/>
              <Text style={{...styles.caption, marginTop: 15, color: "#555"}}>This feature is under development.</Text>
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

export default FreelancerHelp;
