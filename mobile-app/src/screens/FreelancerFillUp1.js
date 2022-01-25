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
    AsyncStorage
} from "react-native";

import MyImage from "../assets/images/freelancer";

function FreelancerFillUp1({navigation}) {

    const [myService, setMyService] = useState([]);
    const [service, setService] = useState("");
    const [rate, setRate] = useState("");

    const addService = () => {
        if (!service) {
            // setVServices(true);
        } else {
            // setVServices(false);
            setMyService([...myService, service]);
            setService("");
        }
    };

    const deleteService = (index) => {
        let itemsCopy = [...myService];
        itemsCopy.splice(index, 1);
        setMyService(itemsCopy);
    };

    const nextScreen = () => {
        let data = {
            service: myService,
            rate: rate
        }
        try {
            AsyncStorage.removeItem("freelancer_session");
            AsyncStorage.setItem(
                "freelancer_session",
                JSON.stringify(data)
            );
            navigation.navigate("FreelancerFillUp2");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <KeyboardAvoidingView behavior={"height"} style={styles.container}>
            <ScrollView style={styles.screen}>
                <Image
                    style={{ width: "100%", height: 170, marginTop: 90 }}
                    source={MyImage.img_2}
                    resizeMode="contain"
                />

                <View
                    style={{ marginTop: 20, paddingHorizontal: 30, marginBottom: 10 }}
                >
                    <Text
                        style={{
                            paddingLeft: 5,
                            marginBottom: 5,
                            fontSize: 16,
                            color: "#555",
                            fontFamily: "sans-serif-light",
                        }}
                    >
                        Rate :
                    </Text>
                    <TextInput style={styles.input} placeholder="Ex. Php100 /hr"
                        keyboardType={"number-pad"}
                        value={rate}
                        onChangeText={(rate) => setRate(rate)}
                    />
                    <Text
                        style={{
                            paddingLeft: 5,
                            marginBottom: 5,
                            fontSize: 16,
                            color: "#555",
                            fontFamily: "sans-serif-light",
                        }}
                    >
                        Please list down the services you can offer :
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex. Web Developing"
                        value={service}
                        onChangeText={(service) => setService(service)}
                    />
                    <View
                        style={{
                            marginTop: -30,
                            zIndex: 1,
                            marginRight: 20,
                            marginBottom: 15,
                            width: 40,
                            height: 13,
                            alignSelf: "flex-end",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#14a800",
                                position: "relative",
                                justifyContent: "center",
                                width: 50,
                                height: 28,
                                marginTop: -18,
                            }}
                            onPress={addService}
                        >
                            <Text style={{ textAlign: "center", color: "#fff" }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        marginBottom: 5,
                        maxWidth: 300,
                        alignSelf: "center",
                    }}
                >
                    {myService.map((item, index) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={{
                                    textAlign: "center",
                                    backgroundColor: "#fff",
                                    height: 30,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: "#555",
                                    marginRight: 10,
                                    paddingHorizontal: 10,
                                    marginBottom: 5,
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

                <View
                    style={{
                        marginTop: 80,
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
});

export default FreelancerFillUp1;
