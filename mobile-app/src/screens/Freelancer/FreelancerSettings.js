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

import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { Avatar, } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const FreelancerSettings = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = React.useState(false);

  const sampleProfile = "https://th.bing.com/th/id/R.782adc2b6062ab00461359da5b02b753?rik=Y%2fJZM98TPsfXxA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-PNG-File.png&ehk=nJ0Yls4aiMdSvREO5hB2GU7Hc3cL04UQeojwLhvL8Gk%3d&risl=&pid=ImgRaw&r=0";

  const [info, setInfo] = useState({});
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [servicesOffer, setServicesOffer] = useState([]);
  const [portfolioName, setPortfolioName] = useState("");
  const [vportfolioName, showPortfolioName] = useState("");
  const [rate, setRate] = useState("");
  const [desc, setDesc] = useState("");
  const [service, setService] = useState("");
  const [portfolio, setPortfolio] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const [modalAlert, setModalAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [image, setImage] = useState(null);

  const [roleModal, setRoleModal] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [validText, setValidText] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const loadData = () => {
    fetch('http://192.168.42.241/wefixit/backend/api/users/user_fetch_self.php', {
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
        let services = result.service_offer.split(',');

        console.log(result);
        setServicesOffer(services);
        setInfo(result);
        setLoadingInfo(false);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error)
      });
  }

  useEffect(() => {
    loadData();
  }, [isFocused]);

  const choosePortfolio = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setPortfolio(result);
    setPortfolioName(result.name);
    showPortfolioName(true);
  }

  const addService = () => {
    if (!servicesOffer) {
    } else {
      setServicesOffer([...servicesOffer, service]);
      setService("");
    }
  }

  const deleteService = (index) => {
    let itemsCopy = [...servicesOffer];
    itemsCopy.splice(index, 1);
    setServicesOffer(itemsCopy)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false)
    }, 1000)
  }, []);

  const saveChanges = () => {
    // rate 
    // servicesOffer
    // desc

    // console.log(portfolio);

    if (Object.keys(portfolio).length === 0 && portfolio.constructor === Object) {
      //ALANG PORTFOLIO UPLOAD
      let user_data = {
        profile_picture: info.profile_photo,
        pay_rate: rate,
        services_offer: servicesOffer,
        self_intro: desc,
        portfolio: info.portfolio
      }

      fetch('http://192.168.42.241/wefixit/backend/api/users/talent_getting_started_pic.php', {
        method: 'PUT',
        body: JSON.stringify(user_data),
        headers: {
          //Header Defination
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          setAlertText("Profile updated.");
          setModalAlert(true);
        })
        .catch((error) => {
          //Hide Loader
          console.log(error)
        });

    } else {
      //PAG MAY PORTFOLIO
      let uploadData = new FormData();
      uploadData.append('submit', 'ok');
      uploadData.append('file', { type: 'application/pdf', uri: portfolio.uri, name: 'sample.pdf' })

      fetch('http://192.168.42.241/wefixit/backend/api/mobile_portfolio_upload.php', {
        method: 'POST',
        body: uploadData
      }).then(response => response.text())
        .then(responseJson => {
          const result = JSON.parse(responseJson);
          // console.log(result.urlpic);

          let user_data = {
            profile_picture: info.profile_photo,
            pay_rate: rate,
            services_offer: servicesOffer,
            self_intro: desc,
            portfolio: result.urlpic
          }

          fetch('http://192.168.42.241/wefixit/backend/api/users/talent_getting_started_pic.php', {
            method: 'PUT',
            body: JSON.stringify(user_data),
            headers: {
              //Header Defination
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              setAlertText("Profile updated.");
              setModalAlert(true);
            })
            .catch((error) => {
              //Hide Loader
              console.log(error)
            });

        }).catch(err => {
          console.log(err)
        })
    }


    // console.log("gago")
    // console.log(portfolio);
  }

  const changeProfile = async () => {
    // alert("tae")
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4,3],
      quality: 1
    })
    // console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);

      let uploadData = new FormData();
      uploadData.append('submit', 'ok');
      uploadData.append('file', { type: 'image/jpg', uri: result.uri, name: 'uploadimagetmp.jpg' })

      fetch('http://192.168.42.241/wefixit/backend/api/mobile_profile_picture_upload.php', {
        method: 'POST',
        body: uploadData
      }).then(response => response.text())
        .then(responseJson => {
          const result = JSON.parse(responseJson);
          console.log(result.urlpic);

          let user_data = {
            profile_picture: result.urlpic,
          }

          fetch('http://192.168.42.241/wefixit/backend/api/users/client_profile_pic.php', {
            method: 'PUT',
            body: JSON.stringify(user_data),
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
              // alert("Profile Updated.");
              setAlertText("Profile picture updated.");
              setModalAlert(true);
            })
            .catch((error) => {
              //Hide Loader
              console.log(error)
            });


        }).catch(err => {
        })


    }

  }

  const switchRole = () => {
    // alert("gago")
    // navigation.navigate("TalentSettings");
    fetch('http://192.168.42.241/wefixit/backend/api/users/switch_into_client.php', {
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
        setRoleModal(false);
        setAlertText("Account switched success.");
        setModalAlert(true);

        setTimeout(() => {
          // navigation.navigate("LoadingScreen");
        }, 700)
        // setInfo(result);
        // setLoadingInfo(false);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error)
      });

    // success please logout and login again
    // logout
  }

  const changePassword = () => {
    if (!oldPassword || !newPassword || !confPassword) {
      // alert("Please")
      setValidText("Please fill all the fields.");
      setShowValidation(true);
    } else {
      if (newPassword.length < 8) {
        setValidText("Password must be least of 8 characters long.");
        setShowValidation(true);
      }
      else if (newPassword !== confPassword) {
        setValidText("Password not match.");
        setShowValidation(true);
      } else {

        let password_data = {
          old_password: oldPassword,
          new_password: newPassword
        }

        fetch('http://192.168.42.241/wefixit/backend/api/users/change_password.php', {
          method: 'POST',
          body: JSON.stringify(password_data),
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
            console.log(result.message)
            if (result.message === "Wrong password") {
              setValidText("Wrong password please try again.");
              setShowValidation(true);
            } else if (result.message === "Password has been changed") {
              setModalVisible(false);
              setAlertText("Password has been changed.");
              setModalAlert(true);
              setShowValidation(false);
              setOldPassword("");
              setNewPassword("");
              setConfPassword("");
            }
          })
          .catch((error) => {
            //Hide Loader
            console.log(error)
          });

      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#1d4354",
          paddingHorizontal: 15,
          paddingVertical: 5
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
          /></TouchableOpacity>
        <View style={{ alignItems: "flex-start", marginLeft: 90, marginTop: 5 }}>
          <Text style={{ ...styles.title, color: "#fff", fontWeight: "400" }}>Settings</Text>
        </View>
      </View>
      <View style={styles.screen}>

        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >

          {loadingInfo ? (<View></View>) : (
            <View style={{
              marginTop: 25, marginBottom: 15, alignItems: "center",
              borderRadius: 20, borderWidth: 1, borderColor: "#c3c3c3",
              paddingVertical: 10,
            }}>
              <Avatar.Image
                style={{ marginBottom: 7 }}
                size={80}
                source={{
                  uri: image || info.profile_photo
                }}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  textAlign: "center",
                  backgroundColor: "#14a800",
                  width: 120,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginBottom: 7
                }}
                onPress={changeProfile}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Change profile
                </Text>
              </TouchableOpacity>

              <Text style={styles.caption}>This is a freelancer account</Text>
              <Text style={{
                ...styles.caption,
                textDecorationStyle: "solid",
                textDecorationLine: "underline",
                textDecorationColor: "#14a800",
                color: "#14a800",
                marginTop: 5
              }}
                onPress={() => setRoleModal(true)}
              >
                Switch to client account.
              </Text>

              <View style={{ flexDirection: "column" }}>
                <Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}>Name :</Text>
                <TextInput style={styles.input} placeholder={info.name} editable={false} />

                <Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}>Address :</Text>
                <TextInput style={styles.input} placeholder={info.address} editable={false} />

                <Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}>Birthday :</Text>
                <TextInput style={styles.input} placeholder={info.birthday} editable={false} />

                <Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}>Rate :</Text>
                <TextInput style={styles.input} placeholder={info.rate} value={rate || info.rate}
                  onChangeText={(rate) => setRate(rate)}
                />

                <Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}>Please list down the services you can offer :</Text>
                <TextInput style={styles.input} placeholder="Ex. Web Developing"
                  value={service}
                  onChangeText={(service) => setService(service)}
                />
                <View style={{
                  marginTop: -30, zIndex: 1,
                  marginRight: 12, marginBottom: 15, width: 40,
                  height: 13, alignSelf: 'flex-end',
                }}>
                  <TouchableOpacity style={{
                    backgroundColor: '#14a800',
                    position: 'relative', justifyContent: 'center', width: 40,
                    height: 25, marginTop: -12,
                  }} onPress={addService}>
                    <Text style={{ textAlign: 'center', color: "#fff" }}>Add</Text>
                  </TouchableOpacity>

                </View>

                <View style={{ flexDirection: "row", marginBottom: 5 }}>

                  {servicesOffer.map((item, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                          textAlign: "center",
                          backgroundColor: "#fff",
                          minWidth: 50,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                          borderWidth: 1,
                          borderColor: "#555",
                          marginRight: 10,
                          paddingHorizontal: 10,
                          marginBottom: 10,
                          marginBottom: 5
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
                      </TouchableOpacity>
                    );
                  })}

                </View>

                <Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  marginTop: 10,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}>Description of your profile :</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={15}
                  style={{ ...styles.input, height: 150, textAlignVertical: "top" }}
                  placeholder={info.self_intro}
                  value={desc || info.self_intro}
                  onChangeText={(desc) => setDesc(desc)}
                />

                {info.portfolio === "" ? (<></>) : (<>
                  <Text style={{
                    paddingLeft: 5,
                    marginBottom: 5,
                    fontSize: 18,
                    color: "#1d4354",
                    fontFamily: "sans-serif-light",
                    textDecorationLine: 'underline'
                  }}>View my portfolio</Text>
                </>)}


                <Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  marginTop: 10,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}>Upload your portfolio (PDF) :</Text>

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
                    marginLeft: 'auto',
                    marginTop: -25
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
                  <Text style={{
                    paddingLeft: 5,
                    marginBottom: 5,
                    fontSize: 16,
                    color: "#555",
                    fontFamily: "sans-serif-light",
                    marginRight: 'auto'
                  }}>{portfolioName}</Text>
                ) : (<Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                  marginRight: 'auto'
                }}>No file chosen</Text>)}


                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between", marginTop: 40
                }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                      textAlign: "center",
                      backgroundColor: "#14a800",
                      width: 140,
                      height: 30,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 30,
                      marginBottom: 7
                    }}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#fff",
                      }}
                    >
                      Change password
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                      textAlign: "center",
                      backgroundColor: "#14a800",
                      width: 120,
                      height: 30,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 30,
                      marginBottom: 7
                    }}
                    onPress={saveChanges}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#fff",
                      }}
                    >
                      Save Changes
                    </Text>
                  </TouchableOpacity>

                </View>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={{...styles.modalView, height: 420}}>
                      <Text style={{ ...styles.title, marginBottom: 17, }}>Change password</Text>
                      {showValidation ? (<>
                        <Text style={{
                          marginBottom: 15, color: "rgb(216, 0, 12)",
                          backgroundColor: 'rgb(255, 186, 186)',
                          width: 270, padding: 7, textAlign: 'center'
                        }}>{validText}</Text>
                      </>) : (<></>)}

                      <View style={{ flexDirection: "column", }}>
                        <Text style={{
                          paddingLeft: 5,
                          marginBottom: 5,
                          fontSize: 16,
                          color: "#555",
                          fontFamily: "sans-serif-light",
                        }}>Old password:</Text>
                        <TextInput
                          secureTextEntry={true}
                          value={oldPassword} onChangeText={(oldPassword) => setOldPassword(oldPassword)}
                          style={{ ...styles.input, width: 270 }}
                        />

                        <Text style={{
                          paddingLeft: 5,
                          marginBottom: 5,
                          fontSize: 16,
                          color: "#555",
                          fontFamily: "sans-serif-light",
                        }}>New password:</Text>
                        <TextInput
                          secureTextEntry={true}
                          value={newPassword} onChangeText={(newPassword) => setNewPassword(newPassword)}
                          style={{ ...styles.input, width: 270 }}
                        />

                        <Text style={{
                          paddingLeft: 5,
                          marginBottom: 5,
                          fontSize: 16,
                          color: "#555",
                          fontFamily: "sans-serif-light",
                        }}>Confirm password:</Text>
                        <TextInput
                          secureTextEntry={true}
                          value={confPassword} onChangeText={(confPassword) => setConfPassword(confPassword)}
                          style={{ ...styles.input, width: 270 }}
                        />

                      </View>

                      <View style={{
                        flexDirection: "row",
                        alignItems: "flex-end", position: "absolute", right: 20, bottom: 10
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
                          onPress={() => setModalVisible(!modalVisible)}
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
                            marginBottom: 7
                          }}
                          onPress={changePassword}
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

              </View>


            </View>
          )}




        </ScrollView>
      </View >

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
        visible={roleModal}
        onRequestClose={() => {
          setRoleModal(!roleModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, height: 150 }}>

            <View style={{ flexDirection: "column", }}>
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 18,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'center',
                lineHeight: 25
              }}>Are you sure you want {'\n'} to switch as client account? </Text>

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
                onPress={() => setRoleModal(false)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#555",
                  }}
                >
                  Cancel
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
                onPress={switchRole}
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
    paddingHorizontal: 10,
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
    color: "#555"
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
    backgroundColor: "rgba(0, 0, 0, 0.5)"
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

export default FreelancerSettings;
