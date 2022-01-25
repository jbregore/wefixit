import React, { useEffect } from "react";

import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    AsyncStorage
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import RadioButton from "react-native-radio-button";
import { useIsFocused } from "@react-navigation/native";

import MyImage from "../assets/images/login";

const ChooseRole = ({ navigation }) => {
    const [selected, setSelected] = React.useState(false);
    const [state, setState] = React.useState("");
    const isFocused = useIsFocused();

    const loadData = () => {

    }

    useEffect(() => {
        loadData();
    }, [isFocused]);


    const nextScreen = async () => {
        if (!state) {
            return;
        } else if (state === "freelancer") {
            try {
                AsyncStorage.removeItem("signup_session_3");
                AsyncStorage.setItem(
                    "signup_session_3",
                    JSON.stringify({ role: state })
                );
                //enter services and choose portfolio
                navigation.navigate("FreelancerFillUp1");
            } catch (err) {
                console.log(err);
            }
        } else if (state === "client") {
            try {
                AsyncStorage.removeItem("signup_session_3");
                AsyncStorage.setItem(
                    "signup_session_3",
                    JSON.stringify({ role: state })
                );
                navigation.navigate("SignUpVerification");
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior={"height"} style={styles.container}>
            <ScrollView style={styles.screen}>
                <Image
                    style={{ width: "100%", height: 180, marginTop: 150 }}
                    source={MyImage.img_2}
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
                    Choose your role
                </Text>

                <View
                    style={{
                        width: "100%",
                        marginBottom: 20,
                        marginTop: 20,
                        alignItems: "center"
                    }}
                >
                    <View style={{
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: "#c3c3c3",
                        width: 300,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingLeft: 10,
                        borderRadius: 10,
                        marginBottom: 10
                    }}>
                        <RadioButton
                            outerColor={"#14a800"}
                            innerColor={"#c3c3c3"}
                            size={12}
                            isSelected={state == "client" ? true : false}
                            onPress={() => setState("client")}
                        />
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 16,
                                color: "#555",
                            }}
                        >
                            i am a client.
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: "#c3c3c3",
                        width: 300,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingLeft: 10,
                        borderRadius: 10
                    }}>
                        <RadioButton
                            outerColor={"#14a800"}
                            innerColor={"#c3c3c3"}
                            size={12}
                            isSelected={state === "freelancer" ? true : false}
                            onPress={() => setState("freelancer")}
                        />
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 16,
                                color: "#555",
                            }}
                        >
                            i am a freelancer.
                        </Text>
                    </View>

                </View>

                <View
                    style={{
                        marginTop: 10,
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
});

export default ChooseRole;
