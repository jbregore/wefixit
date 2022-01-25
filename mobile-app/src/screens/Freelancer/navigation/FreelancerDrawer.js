import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, RefreshControl, ActivityIndicator } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItem
} from "@react-navigation/drawer";
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import StarRating from 'react-native-star-rating';
import { useIsFocused } from "@react-navigation/native";
// import MyImage from "../../../assets/images/Talent"


export function FreelancerDrawer({ navigation, props }) {
    const [info, setInfo] = useState({});
    const [loadingInfo, setLoadingInfo] = useState(true);
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const sampleProfile = "https://th.bing.com/th/id/R.782adc2b6062ab00461359da5b02b753?rik=Y%2fJZM98TPsfXxA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-PNG-File.png&ehk=nJ0Yls4aiMdSvREO5hB2GU7Hc3cL04UQeojwLhvL8Gk%3d&risl=&pid=ImgRaw&r=0";

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
                setInfo(result);
                setLoadingInfo(false);
            })
            .catch((error) => {
                //Hide Loader
                console.log(error)
            });
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            loadData();
            setRefreshing(false)
        }, 1000)
    }, []);

    useEffect(() => {
        loadData();
    }, [isFocused]);


    useEffect(() => {
        console.log(info)
    }, [loadingInfo])

    const logout = () => {
        setIsLoading(true);
        fetch('http://192.168.42.241/wefixit/backend/api/users/logout.php', {
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
                console.log(result)
                navigation.navigate("Login");
            })
            .catch((error) => {
                //Hide Loader
                console.log(error)
            });

    }

    return (
        <>  
            {isLoading ? (<>
            <ActivityIndicator size="large" />
            </>) : (<></>)}
            {loadingInfo ? (<View></View>) : (
                <View style={{ flex: 1 }}>
                    <DrawerContentScrollView {...props} refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                        <View style={styles.drawerContent}>
                            <View style={styles.userInfoSection}>

                                <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 15 }}>
                                    <Avatar.Image
                                        size={50}
                                        source={{
                                            uri: info.profile_photo || sampleProfile
                                        }}
                                    />
                                    <View style={{ marginLeft: 15, flexDirection: "column" }}>
                                        <Title style={styles.title}>{info.name}</Title>
                                        <Caption style={styles.caption}>Freelancer</Caption>
                                    </View>
                                </View>

                                <View style={{ height: 40, justifyContent: "center" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <StarRating
                                            // disabled={true}
                                            maxStars={5}
                                            rating={Number(info.rating)}
                                            // style={{color: 'red'}}
                                            starSize={16}
                                            fullStarColor="#14a800"
                                            emptyStarColor="#14a800"
                                        // starStyle={styles.star}
                                        // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                        />


                                    </View>

                                    <Caption style={{ ...styles.caption, marginTop: 5 }}>
                                        <Caption style={{ color: "#14a800", fontSize: 14 }}>{info.rating.substring(0,4)} {" "}</Caption>
                                        Rating</Caption>
                                </View>

                            </View>

                            <Drawer.Section style={styles.drawerSection}>
                                <DrawerItem
                                    icon={() => (
                                        <MaterialCommunityIcons name="account-circle-outline" size={24} color="#555" />
                                    )}
                                    label="My Profile"
                                    onPress={() => { navigation.navigate("FreelancerProfile") }}
                                />

                                <DrawerItem
                                    icon={() => (
                                        <Ionicons name="briefcase-outline" size={24} color="#555" />
                                    )}
                                    label="Appointments"
                                    onPress={() => { navigation.navigate("FreelancerAppointment") }}
                                />

                                <DrawerItem
                                    icon={() => (
                                        <Ionicons name="md-people-circle-outline" size={24} color="#555" />
                                    )}
                                    label="Clients"
                                    onPress={() => { navigation.navigate("FreelancersClient") }}
                                />

                                <DrawerItem
                                    icon={() => (
                                        <AntDesign name="message1" size={24} color="#555" />
                                    )}
                                    label="Messages"
                                    onPress={() => { navigation.navigate("FreelancerMessage") }}
                                />

                                <DrawerItem
                                    icon={() => (
                                        <Ionicons name="notifications-outline" size={24} color="black" />
                                    )}
                                    label="Notifications"
                                    onPress={() => { navigation.navigate("FreelancerNotification") }}
                                />

                                <DrawerItem
                                    icon={() => (
                                        <Ionicons name="help" size={24} color="black" />
                                    )}
                                    label="Help"
                                    onPress={() => { navigation.navigate("FreelancerHelp") }}
                                />

                                <DrawerItem
                                    icon={() => (
                                        <Ionicons name="settings-outline" size={24} color="#555" />
                                    )}
                                    label="Settings"
                                    onPress={() => { navigation.navigate("FreelancerSettings") }}
                                />

                            </Drawer.Section>

                        </View>
                    </DrawerContentScrollView>
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={() => (
                                <SimpleLineIcons name="logout" size={24} color="#555" />
                            )}
                            label="Logout"
                            onPress={logout}
                        />
                    </Drawer.Section>
                </View>
            )}

        </>

        
    )
}

const styles = StyleSheet.create({
    // star: {
    //     color: '#14a800',
    // },
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: "bold"
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15
    },
    paragraph: {
        fontWeight: "bold",
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})