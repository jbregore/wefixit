import React, { useEffect, useState, useRef } from "react";

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
  Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { func } from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

const FaceVerificationSignUp = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [faceData, setFaceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [winkCounter, setWinkCounter] = useState(0);

  const cam = useRef();

  const loadData = () => {
    async function fetchData() {
      try {
        let resp = await AsyncStorage.getItem("signup_session_4");
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



  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      setLoading(false);
    })();
  }, []);


  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const captureImage = async () => {
    if (cam.current) {
      const option = { quality: 0.5, base64: false, skipProcessing: false };
      let photo = await cam.current.takePictureAsync(option);
      console.log(photo)

      if (photo.uri) {
        // alert("gago")
        try {
          AsyncStorage.removeItem("signup_session_5");
          AsyncStorage.setItem(
            "signup_session_5",
            JSON.stringify({ faceCapture: photo })
          );

          navigation.navigate("YouAllSet");
        } catch (err) {
          console.log(err);
        }
      } else {

      }
    }
    // const picture = await cam.takePictureAsync(option);
    // if (picture.source) {
    //   console.log(picture.source)
    // }
  }

  function getFaceDataView() {
    if (faceData.length === 0) {
      // return (
      //   <View style={styles.faces}>
      //     <Text style={styles.faceDesc}>No faces </Text>
      //   </View>
      // );
    } else {
      return faceData.map((face, index) => {
        const eyesShut =
          face.rightEyeOpenProbability < 0.4 &&
          face.leftEyeOpenProbability < 0.4;
        const winking =
          !eyesShut &&
          (face.rightEyeOpenProbability < 0.4 ||
            face.leftEyeOpenProbability < 0.4);
        const smiling = face.smilingProbability < 0.4;
        if (winking.toString() === "true") {
          // alert("Winking")
        }
        return (
          <View key={index}>
            <View style={{ ...styles.faces, }} >
              {/* <Text style={{fontSize: 20}}>Close/Open your eyes {"\n"}</Text> */}
              {/* <Text style={styles.faceDesc}>
                Eyes Shut: {eyesShut.toString()}
              </Text> */}
              <Text style={styles.faceDesc}>Winking: {winking.toString()}</Text>
            </View>

            <View style={{ marginTop: 430, marginLeft: 30 }}>
              <TouchableOpacity style={{
                marginTop: 30, width: 100, backgroundColor: '#14a800',
                textAlign: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10
              }} onPress={() => captureImage()}>
                <Text style={{ color: "#fff", fontSize: 18 }}>Capture</Text>
              </TouchableOpacity>
            </View>

          </View>
        );
      });
    }
  }

  const handleFacesDetected = ({ faces }) => {
    setFaceData(faces);
    // console.log(faces);
  }

  return (
    <>
      {loading ? (<></>) : (
        <>
          <Camera
            ref={cam}
            type={Camera.Constants.Type.front}
            style={styles.camera}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Landmarks.none,
              runClassifications: FaceDetector.Constants.Classifications.all,
              minDetectionInterval: 100,
              tracking: true,
            }}
          >
            {getFaceDataView()}
          </Camera>


        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: "center",
  },
  faces: {
    backgroundColor: "#fff",
    alignSelf: "stretch",
    alignItems: "center",
    margin: 16,
    marginTop: 100
  },
  faceDesc: {
    fontSize: 20,
  },
});

export default FaceVerificationSignUp;
