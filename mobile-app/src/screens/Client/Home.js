import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
import { Feather } from "@expo/vector-icons";

function Home({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
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
                    />
                </TouchableOpacity>
                <View style={{ alignItems: "flex-start", marginLeft: 65, marginTop: 5 }}>
                    <Text style={{ color: "#fff", fontWeight: "400" }}>
                        All Job Postings</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});

export default Home;
