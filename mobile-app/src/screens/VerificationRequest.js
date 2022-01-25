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

const VerificationRequest = ({ navigation }) => {
    const [selected, setSelected] = React.useState(false);
    const [state, setState] = React.useState("");
    const isFocused = useIsFocused();

    const loadData = () => {

        setTimeout(() => {
            navigation.navigate("Login");
        }, 6000);
    }

    useEffect(() => {
        loadData();
    }, [isFocused]);



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
                        marginTop: 100,
                    }}
                >
                    Verification Request
                </Text>

                <Image
                    style={{ width: "100%", height: 280, marginTop: 20 }}
                    source={MyImage.waitlang}
                    resizeMode="contain"
                />

                <Text
                    style={{
                        paddingHorizontal: 20,
                        textAlign: "center",
                        fontSize: 18,
                        color: "#555",
                        fontFamily: "sans-serif-light",
                    }}
                >
                    Our team has already been adviced and will soon
                    authorize your access to the app, this will
                    take a few minutes. You will receive a text message and 
                    confirmation e-mail when the process is complete.
                </Text>



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

export default VerificationRequest;
