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
  ActivityIndicator,
  Modal,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import RadioButton from "react-native-radio-button";
import { useIsFocused } from "@react-navigation/native";

import MyImage from "../assets/images/login";


const YouAllSet = ({ navigation }) => {
  const [selected, setSelected] = React.useState(false);
  const [state, setState] = React.useState("");
  const [modalLoading, setModalLoading] = useState(false);

  //   const [test, setTest] = useState({});
  const [info, setInfo] = useState({});
  const [emailPass, setEmailPass] = useState({});
  const [rateServices, setRateServices] = useState({});
  const [descPortfolio, setDescPortfolio] = useState({});
  const [role, setRole] = useState({});
  const [frontId, setFrontId] = useState({});
  const [backId, setBackId] = useState({});
  const [faceId, setFaceId] = useState({});
  const [url, setUrl] = useState({
    url1: "",
    url2: "",
    url3: "",
  });

  const isFocused = useIsFocused();

  const loadData = () => {
    async function fetchData() {
      try {
        //basic info
        let resp1 = await AsyncStorage.getItem("signup_session");

        //email and password
        let resp2 = await AsyncStorage.getItem("signup_session_2");
        //role
        let resp3 = await AsyncStorage.getItem("signup_session_3");
        //front id and back id
        let resp4 = await AsyncStorage.getItem("signup_session_4");
        //face capture
        let resp5 = await AsyncStorage.getItem("signup_session_5");
        let myRole = JSON.parse(resp3);

        if (myRole.role === "freelancer") {
          //rate and services
          let resp6 = await AsyncStorage.getItem("freelancer_session");
          if (resp6 === null) {

          } else {
            setRateServices(JSON.parse(resp6));
          }

          //desc and portfolio
          let resp7 = await AsyncStorage.getItem("freelancer_session_2");
          if (resp7 === null) {

          } else {
            setDescPortfolio(JSON.parse(resp7));
          }
        }


        setInfo(JSON.parse(resp1));
        // console.log(JSON.parse(resp1))
        setEmailPass(JSON.parse(resp2));
        setRole(JSON.parse(resp3));

        let front_id = JSON.parse(resp4);
        setFrontId(front_id.frontImageValue);
        setBackId(front_id.backImageValue);

        let face_id = JSON.parse(resp5);
        setFaceId(face_id.faceCapture);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  };

  useEffect(() => {
    loadData();
  }, [isFocused]);

  const continueSignUp = async () => {
    setModalLoading(true);

    let frontIdFinal = "";
    let backIdFinal = "";
    let wholeIdFinal = "";

    let uploadData = new FormData();
    uploadData.append('submit', 'ok');
    uploadData.append('file', { type: 'image/jpg', uri: frontId.uri, name: 'uploadimagetmp.jpg' })

    fetch('http://192.168.42.241/wefixit/backend/api/mobile_id_upload.php', {
      method: 'POST',
      body: uploadData
    }).then(response => response.text())
      .then(responseJson => {
        const result = JSON.parse(responseJson);
        frontIdFinal = result.urlpic

      }).catch(err => {
        console.log(err)
      })

    let uploadData2 = new FormData();
    uploadData2.append('submit', 'ok');
    uploadData2.append('file', { type: 'image/jpg', uri: backId.uri, name: 'uploadimagetmp.jpg' })

    fetch('http://192.168.42.241/wefixit/backend/api/mobile_id_upload.php', {
      method: 'POST',
      body: uploadData2
    }).then(response => response.text())
      .then(responseJson => {
        const result = JSON.parse(responseJson);
        backIdFinal = result.urlpic

      }).catch(err => {
        console.log(err)
      })

    let uploadData3 = new FormData();
    uploadData3.append('submit', 'ok');
    uploadData3.append('file', { type: 'image/jpg', uri: faceId.uri, name: 'uploadimagetmp.jpg' })

    fetch('http://192.168.42.241/wefixit/backend/api/mobile_id_upload.php', {
      method: 'POST',
      body: uploadData3
    }).then(response => response.text())
      .then(responseJson => {
        const result = JSON.parse(responseJson);
        wholeIdFinal = result.urlpic

      }).catch(err => {
        console.log(err)
      })

    setTimeout(() => {

      if (role.role === "client") {
        let user_data = {
          user_id: Date.now().toString(36) + Math.random().toString(36).substr(2),
          role: role.role,
          name: info.name,
          fname: info.fname,
          gender: info.gender,
          address_desc: info.address,
          address_lat: info.lat.toString(),
          address_longt: info.longt.toString(),
          birthday: info.birthday,
          age: info.age,
          email: emailPass.email,
          password: emailPass.password,
          front_pic: frontIdFinal,
          back_pic: backIdFinal,
          whole_pic: wholeIdFinal
        };

        console.log(user_data);

        fetch('http://192.168.42.241/wefixit/backend/api/users/create_user.php', {
          method: 'POST',
          body: JSON.stringify(user_data)
        }).then((response) => response.text())
          .then((responseJson) => {
            //Hide Loader
            // const result = JSON.parse(responseJson);
            // console.log(result)
            navigation.navigate("VerificationRequest")

          })
          .catch((error) => {
            //Hide Loader
            console.log(error)
          });
        setModalLoading(false);
      } else if (role.role === "freelancer") {


        let userId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        let user_data = {
          user_id: userId,
          role: role.role,
          name: info.name,
          fname: info.fname,
          gender: info.gender,
          address_desc: info.address,
          address_lat: info.lat.toString(),
          address_longt: info.longt.toString(),
          birthday: info.birthday,
          age: info.age,
          email: emailPass.email,
          password: emailPass.password,
          front_pic: frontIdFinal,
          back_pic: backIdFinal,
          whole_pic: wholeIdFinal
        };

        console.log(user_data);

        fetch('http://192.168.42.241/wefixit/backend/api/users/create_user.php', {
          method: 'POST',
          body: JSON.stringify(user_data)
        }).then((response) => response.text())
          .then((responseJson) => {
            //Hide Loader
          })
          .catch((error) => {
            //Hide Loader
            console.log(error)
          });


        if (Object.keys(descPortfolio.portfolio).length === 0 && descPortfolio.portfolio.constructor === Object) {
          let user_data2 = {
            pay_rate: `Php${rateServices.rate} /hr`,
            services_offer: rateServices.service,
            self_intro: descPortfolio.desc,
            portfolio: "",
            user_id: userId
          }

          fetch('http://192.168.42.241/wefixit/backend/api/users/talent_getting_started.php', {
            method: 'PUT',
            body: JSON.stringify(user_data2)
          }).then((response) => response.text())
            .then((responseJson) => {
              //Hide Loader
              // const result = JSON.parse(responseJson);
              navigation.navigate("VerificationRequest")
            })
            .catch((error) => {
              //Hide Loader
              console.log(error)
            });
        } else {
          let uploadDataP = new FormData();
          uploadDataP.append('submit', 'ok');
          uploadDataP.append('file', { type: 'application/pdf', uri: descPortfolio.portfolio.uri, name: 'sample.pdf' })

          fetch('http://192.168.42.241/wefixit/backend/api/mobile_portfolio_upload.php', {
            method: 'POST',
            body: uploadDataP
          }).then(response => response.text())
            .then(responseJson => {
              const result = JSON.parse(responseJson);
              // console.log(result.urlpic);

              let user_data2 = {
                pay_rate: `Php${rateServices.rate} /hr`,
                services_offer: rateServices.service,
                self_intro: descPortfolio.desc,
                portfolio: result.urlpic,
                user_id: userId
              }

              fetch('http://192.168.42.241/wefixit/backend/api/users/talent_getting_started.php', {
                method: 'PUT',
                body: JSON.stringify(user_data2)
              }).then((response) => response.text())
                .then((responseJson) => {
                  //Hide Loader
                  // const result = JSON.parse(responseJson);
                  navigation.navigate("VerificationRequest")
                })
                .catch((error) => {
                  //Hide Loader
                  console.log(error)
                });

            }).catch(err => {
              console.log(err)
            })
        }
        setModalLoading(false);
      }

    }, 500)



    // if (role.role === "client") {

    //   const blob = await new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.onload = function () {
    //       resolve(xhr.response);
    //     };
    //     xhr.oneerror = function () {
    //       reject(new TypeError("Network request failed"));
    //     };
    //     xhr.responseType = "blob";
    //     xhr.open("GET", frontId.uri, true);
    //     xhr.send(null);
    //   });

    //   let myId = new Date().toISOString();

    //   const ref = storage.ref(`images-id/${myId}`);
    //   const snapshot = ref.put(blob);

    //   const blob2 = await new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.onload = function () {
    //       resolve(xhr.response);
    //     };
    //     xhr.oneerror = function () {
    //       reject(new TypeError("Network request failed"));
    //     };
    //     xhr.responseType = "blob";
    //     xhr.open("GET", backId.uri, true);
    //     xhr.send(null);
    //   });

    //   let myId2 = new Date().toISOString();

    //   const ref2 = storage.ref(`images-id/${myId2}`);
    //   const snapshot2 = ref2.put(blob2);

    //   const blob3 = await new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.onload = function () {
    //       resolve(xhr.response);
    //     };
    //     xhr.oneerror = function () {
    //       reject(new TypeError("Network request failed"));
    //     };
    //     xhr.responseType = "blob";
    //     xhr.open("GET", faceId.uri, true);
    //     xhr.send(null);
    //   });

    //   let myId3 = new Date().toISOString();

    //   const ref3 = storage.ref(`images-id/${myId3}`);
    //   const snapshot3 = ref3.put(blob3);

    //   snapshot.on(
    //     "state_changed",
    //     (snapshot) => { },
    //     (error) => {
    //       console.log(error);
    //     },
    //     () => {
    //       storage
    //         .ref("images-id")
    //         .child(myId)
    //         .getDownloadURL()
    //         .then((url1) => {
    //           snapshot2.on(
    //             "state_changed",
    //             (snapshot) => { },
    //             (error) => {
    //               console.log(error);
    //             },
    //             () => {
    //               storage
    //                 .ref("images-id")
    //                 .child(myId2)
    //                 .getDownloadURL()
    //                 .then((url2) => {
    //                   snapshot3.on(
    //                     "state_changed",
    //                     (snapshot) => { },
    //                     (error) => {
    //                       console.log(error);
    //                     },
    //                     () => {
    //                       storage
    //                         .ref("images-id")
    //                         .child(myId2)
    //                         .getDownloadURL()
    //                         .then((url3) => {
    //                           db.collection("collection_users")
    //                             .add({
    //                               address: new firebase.firestore.GeoPoint(Number(info.lat), Number(info.longt)),
    //                               name: info.name,
    //                               fname: info.fname,
    //                               address_desc: info.address,
    //                               age: info.age,
    //                               birthday: info.birthday,
    //                               gender: info.gender,
    //                               mobile_no: info.mobile_no,
    //                               role: role.role,
    //                               email: emailPass.email,
    //                               password: emailPass.password,
    //                               front_id: url1,
    //                               back_id: url2,
    //                               face_id: url3,
    //                               profile_photo:
    //                                 "https://www.drshaneholmes.com/wp-content/uploads/2020/03/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    //                               verified: "0",
    //                               status: "0",
    //                               rating: "0",
    //                               created_at: Date.now()
    //                             })
    //                             .then((docRef) => {
    //                               //success
    //                               //   setCommentText("");
    //                               console.log(docRef.id);
    //                               db.collection("collection_users")
    //                                 .doc(docRef.id)
    //                                 .update({
    //                                   uid: docRef.id,
    //                                 })
    //                                 .then(function () {
    //                                   setModalLoading(false);
    //                                   navigation.navigate(
    //                                     "VerificationRequest"
    //                                   );
    //                                 });
    //                             })
    //                             .catch((err) => {
    //                               //error
    //                             });
    //                         });
    //                     }
    //                   );
    //                 });
    //             }
    //           );
    //         });
    //     }
    //   );
    // }

    // else if (role.role === "freelancer") {
    //   const blob = await new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.onload = function () {
    //       resolve(xhr.response);
    //     };
    //     xhr.oneerror = function () {
    //       reject(new TypeError("Network request failed"));
    //     };
    //     xhr.responseType = "blob";
    //     xhr.open("GET", frontId.uri, true);
    //     xhr.send(null);
    //   });

    //   let myId = new Date().toISOString();

    //   const ref = storage.ref(`images-id/${myId}`);
    //   const snapshot = ref.put(blob);

    //   const blob2 = await new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.onload = function () {
    //       resolve(xhr.response);
    //     };
    //     xhr.oneerror = function () {
    //       reject(new TypeError("Network request failed"));
    //     };
    //     xhr.responseType = "blob";
    //     xhr.open("GET", backId.uri, true);
    //     xhr.send(null);
    //   });

    //   let myId2 = new Date().toISOString();

    //   const ref2 = storage.ref(`images-id/${myId2}`);
    //   const snapshot2 = ref2.put(blob2);

    //   const blob3 = await new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.onload = function () {
    //       resolve(xhr.response);
    //     };
    //     xhr.oneerror = function () {
    //       reject(new TypeError("Network request failed"));
    //     };
    //     xhr.responseType = "blob";
    //     xhr.open("GET", faceId.uri, true);
    //     xhr.send(null);
    //   });

    //   let myId3 = new Date().toISOString();

    //   const ref3 = storage.ref(`images-id/${myId3}`);
    //   const snapshot3 = ref3.put(blob3);

    //   const blob4 = await new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.onload = function () {
    //       resolve(xhr.response);
    //     };
    //     xhr.oneerror = function () {
    //       reject(new TypeError("Network request failed"));
    //     };
    //     xhr.responseType = "blob";
    //     xhr.open("GET", descPortfolio.portfolio.uri, true);
    //     xhr.send(null);
    //   });

    //   let myId4 = new Date().toISOString();

    //   const ref4 = storage.ref(`portfolios/${myId4}`);
    //   const snapshot4 = ref4.put(blob4);

    //   snapshot.on(
    //     "state_changed",
    //     (snapshot) => { },
    //     (error) => {
    //       console.log(error);
    //     },
    //     () => {
    //       storage
    //         .ref("images-id")
    //         .child(myId)
    //         .getDownloadURL()
    //         .then((url1) => {
    //           snapshot2.on(
    //             "state_changed",
    //             (snapshot) => { },
    //             (error) => {
    //               console.log(error);
    //             },
    //             () => {
    //               storage
    //                 .ref("images-id")
    //                 .child(myId2)
    //                 .getDownloadURL()
    //                 .then((url2) => {
    //                   snapshot3.on(
    //                     "state_changed",
    //                     (snapshot) => { },
    //                     (error) => {
    //                       console.log(error);
    //                     },
    //                     () => {
    //                       storage
    //                         .ref("images-id")
    //                         .child(myId2)
    //                         .getDownloadURL()
    //                         .then((url3) => {
    //                           snapshot4.on(
    //                             "state_changed",
    //                             (snapshot) => { },
    //                             (error) => {
    //                               console.log(error);
    //                             },
    //                             () => {
    //                               storage
    //                                 .ref("portfolios")
    //                                 .child(myId4)
    //                                 .getDownloadURL()
    //                                 .then((url4) => {
    //                                   console.log(url4);

    //                                   db.collection("collection_users")
    //                                     .add({
    //                                       address: new firebase.firestore.GeoPoint(Number(info.lat), Number(info.longt)),
    //                                       name: info.name,
    //                                       fname: info.fname,
    //                                       address_desc: info.address,
    //                                       age: info.age,
    //                                       birthday: info.birthday,
    //                                       gender: info.gender,
    //                                       mobile_no: info.mobile_no,
    //                                       role: role.role,
    //                                       email: emailPass.email,
    //                                       password: emailPass.password,
    //                                       front_id: url1,
    //                                       back_id: url2,
    //                                       face_id: url3,
    //                                       profile_photo:
    //                                         "https://www.drshaneholmes.com/wp-content/uploads/2020/03/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    //                                       verified: "0",
    //                                       status: "0",
    //                                       service: rateServices.service,
    //                                       rate: `Php${rateServices.rate} /hr`,
    //                                       desc: descPortfolio.desc,
    //                                       portfolio: url4,
    //                                       rating: "0",
    //                                       created_at: Date.now()
    //                                       // service:
    //                                     })
    //                                     .then((docRef) => {
    //                                       //success
    //                                       //   setCommentText("");
    //                                       console.log(docRef.id);
    //                                       db.collection("collection_users")
    //                                         .doc(docRef.id)
    //                                         .update({
    //                                           uid: docRef.id,
    //                                         })
    //                                         .then(function () {
    //                                           setModalLoading(false);
    //                                           navigation.navigate(
    //                                             "VerificationRequest"
    //                                           );
    //                                         });
    //                                     })
    //                                     .catch((err) => {
    //                                       //error
    //                                     });
    //                                 });
    //                             }
    //                           );
    //                         });
    //                     }
    //                   );
    //                 });
    //             }
    //           );
    //         });
    //     }
    //   );

    // }

  };

  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.container}>
      <ScrollView style={styles.screen}>
        <Text
          style={{
            paddingHorizontal: 20,
            textAlign: "center",
            fontSize: 26,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginTop: 130,
          }}
        >
          You are all set.
        </Text>

        <Image
          style={{ width: "100%", height: 260, marginTop: 20 }}
          source={MyImage.checkmark}
          resizeMode="contain"
        />

        {/* <Text
          style={{
            paddingHorizontal: 60,
            textAlign: "center",
            fontSize: 20,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginTop:15
          }}
        >
          Creating a wefixit account let's you find your 
          desired freelancer that are available in your areas.
        </Text> */}

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
            onPress={continueSignUp}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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

  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});

export default YouAllSet;
