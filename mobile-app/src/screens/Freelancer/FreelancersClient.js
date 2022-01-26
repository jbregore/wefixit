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
    TouchableWithoutFeedback,
    ScrollView,
    Picker,
    RefreshControl,
    Pressable,
    AsyncStorage,
    ActivityIndicator,
    Modal
} from "react-native";


import { Avatar, } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';
import { useIsFocused } from "@react-navigation/native";


const FreelancersClient = ({ navigation }) => {
    const isFocused = useIsFocused();

    const sampleProfile = "https://th.bing.com/th/id/R.782adc2b6062ab00461359da5b02b753?rik=Y%2fJZM98TPsfXxA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-PNG-File.png&ehk=nJ0Yls4aiMdSvREO5hB2GU7Hc3cL04UQeojwLhvL8Gk%3d&risl=&pid=ImgRaw&r=0";

    const [currentPage, setCurrentPage] = useState(1);
    const [freelancersData, setFreelancersData] = useState([]);
    const [servicesOffer, setServicesOffer] = useState([]);
    const [loadingInfo, setLoadingInfo] = useState(true);
    const [freelancerCount, setFreelancerCount] = useState(0);
    const [myId, setMyId] = useState("");
    const [search, setSearch] = useState("");
    const [modalLoading, setModalLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [state, setState] = React.useState({
        searches: "name",
        choosenIndex: 0
    });

    const loadData = () => {

        let user_page = {
            pagee: currentPage,
            role: "freelancer"
        }
        fetch('http://192.168.42.241/wefixit/backend/api/users/show_clients.php', {
            method: 'POST',
            body: JSON.stringify(user_page),
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

                let data = [];
                for (let row of result) {

                    fetch('http://192.168.42.241/wefixit/backend/api/appointments/show_client_appointments.php', {
                        method: 'POST',
                        body: JSON.stringify({ id: row.user_id }),
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
                            data.push({ ...row, appoint_count: result.total_appoint.total_appoint })
                            // console.log()
                        })
                        .catch((error) => {
                            //Hide Loader
                            console.log(error)
                        });
                }

                setTimeout(() => {
                    setFreelancersData(data);
                    setLoadingInfo(false);
                }, 800)
            })
            .catch((error) => {
                //Hide Loader
                console.log(error)
            });

        //FREELANCER COUNT
        fetch('http://192.168.42.241/wefixit/backend/api/users/freelancer_count.php', {
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
                setFreelancerCount(result.total_freelancer_count.total_freelancer_count)
            })
            .catch((error) => {
                //Hide Loader
                console.log(error)
            });

    }

    useEffect(() => {
        loadData();
    }, [isFocused]);

    useEffect(() => {
        // console.log(freelancersData)
        let datas = [];
        for (let row of freelancersData) {
            let services = row.services_offer.split(',');
            datas.push({ service: services, id: row.user_id });
        }

        setTimeout(() => {
            setServicesOffer(datas);
            setTimeout(() => {
            }, 200)
        }, 200)
    }, [freelancersData])

    const viewProfile = async (profile_userid) => {
        setModalLoading(true);
        try {
            await AsyncStorage.removeItem('id');
            await AsyncStorage.setItem('id', profile_userid);
            setModalLoading(false);
            navigation.navigate('FreelancerViewProfile');
        }
        catch (error) {
            setModalLoading(false);
            console.log(error)
        }
    }

    const FreelancerList = freelancersData.map((row) => (
        <View style={{
            borderRadius: 5, borderWidth: 1, borderColor: "#c3c3c3",
            paddingHorizontal: 10, paddingVertical: 10, marginBottom: 10
        }} key={row.user_id}>
            <View style={{ flexDirection: "row", marginBottom: 15 }}>
                <Avatar.Image
                    style={{ marginTop: 10 }}
                    size={65}
                    source={{
                        uri: row.profile_photo || sampleProfile
                    }}
                />

                <View style={{ marginLeft: 15, flexDirection: "column", maxWidth: 190 }}>
                    <TouchableOpacity onPress={() => viewProfile(row.user_id)}>
                        <Text style={{ ...styles.title2, color: "#14a800" }}>
                            {row.name}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.caption2}>{row.address}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <StarRating
                            maxStars={5}
                            rating={Number(row.rating)}
                            starSize={16}
                            fullStarColor="#14a800"
                            emptyStarColor="#14a800"
                        />
                    </View>
                    <Text style={{ ...styles.title2, color: "#555" }}>
                        {row.age} yrs old
                    </Text>

                </View>


            </View>

            {row.appoint_count == 0 ? (<>
                <Text style={{ marginLeft: 'auto' }}>
                    no previous appointments yet.
                </Text>
            </>) : (<>
                <Text style={{ marginLeft: 'auto' }}>

                    {row.appoint_count} successful appointments</Text>
            </>)}


        </View>
    ))

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            loadData();
            setRefreshing(false)
        }, 1000)
    }, []);


    const sigeSearch = () => {
        // alert("tae")
        // alert(state.searches)
        setModalLoading(true);
        let search_data = {
            search: search,
            filter: state.searches,
            pagee: 1
        }
        setTimeout(() => {

            fetch("http://192.168.42.241/wefixit/backend/api/users/search_clients.php", {
                method: "POST",
                body: JSON.stringify(search_data),
                headers: {
                    //Header Defination
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.text())
                .then((responseJson) => {
                    //Hide Loader
                    const result = JSON.parse(responseJson);
                    // setMyId(result.user_id);
                    // console.log(result);
                    // setFreelancersData(result);
                    let data = [];
                    for (let row of result) {

                        fetch('http://192.168.42.241/wefixit/backend/api/appointments/show_client_appointments.php', {
                            method: 'POST',
                            body: JSON.stringify({ id: row.user_id }),
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
                                data.push({ ...row, appoint_count: result.total_appoint.total_appoint })
                                // console.log()
                            })
                            .catch((error) => {
                                //Hide Loader
                                console.log(error)
                            });
                    }

                    setTimeout(() => {
                        setFreelancersData(data);
                        setLoadingInfo(false);
                        setModalLoading(false);
                    }, 800)
                    setModalLoading(false);


                })
                .catch((error) => {
                    //Hide Loader
                    setModalLoading(false);
                    console.log(error);
                });

            // fetch("http://192.168.42.241/wefixit/backend/api/users/freelancer_count_search.php", {
            //     method: "POST",
            //     body: JSON.stringify(search_data),
            //     headers: {
            //         //Header Defination
            //         Accept: "application/json",
            //         "Content-Type": "application/json",
            //     },
            // })
            //     .then((response) => response.text())
            //     .then((responseJson) => {
            //         //Hide Loader
            //         const result = JSON.parse(responseJson);
            //         // setMyId(result.user_id);
            //         console.log(result.total_freelancer_count.total_freelancer_count);
            //         // setFreelancersData(result);
            //         setFreelancerCount(result.total_freelancer_count.total_freelancer_count);
            //     })
            //     .catch((error) => {
            //         //Hide Loader
            //         console.log(error);
            //     });
        }, 500)

    }

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
                <View style={{ alignItems: "flex-start", marginLeft: 70, marginTop: 5 }}>
                    <Text style={{ ...styles.title, color: "#fff", fontWeight: "400" }}>Browse Clients</Text>
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

                    <View style={{
                        paddingHorizontal: 10,
                        marginBottom: 20,
                        marginTop: 20,
                    }}>
                        <TextInput style={styles.input} placeholder="Search"
                            value={search} onChangeText={(search) => setSearch(search)}
                        />

                        <Pressable
                            activeOpacity={0.5}
                            style={{
                                textAlign: "center",
                                backgroundColor: "#14a800",
                                width: 45,
                                height: 30,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                marginBottom: 7,
                                marginLeft: 'auto',
                                marginTop: -45,
                                marginRight: 5
                            }}
                            onPress={sigeSearch}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "#fff",
                                }}
                            >
                                Go
                            </Text>
                        </Pressable>

                        <Text style={{ ...styles.caption, justifyContent: "flex-end" }}>{freelancersData.length} Clients found.</Text>
                    </View>

                    <View style={{
                        paddingHorizontal: 10,
                        marginBottom: 5,
                        flex: 1,
                        display: 'flex',
                        flexDirection: "row",
                        justifyContent: 'space-between'
                    }}>

                        <View style={{
                            justifyContent: "center",
                            width: '50%', textAlign: 'right'
                        }}>
                            <Text style={{
                                ...styles.caption, marginBottom: 3, textAlign: 'right',
                            }}>Filter by :
                            </Text>
                        </View>

                        <View
                            style={{
                                width: 160,
                                borderColor: "#c3c3c3",
                                borderWidth: 1,
                                borderRadius: 10,
                                justifyContent: 'flex-start'
                            }}>
                            <Picker
                                selectedValue={state.searches}
                                onValueChange={(
                                    itemValue, itemPosition
                                ) => setState({
                                    searches: itemValue,
                                    choosenIndex: itemPosition
                                })}
                                style={{ height: 40 }}
                            >
                                <Picker.Item label="Name" value="name" />
                                <Picker.Item label="Address" value="address" />
                                <Picker.Item label="Age" value="age" />
                                <Picker.Item label="Rating" value="rating" />
                            </Picker>
                        </View>



                    </View>

                    {loadingInfo ? (<View></View>) : (<>{FreelancerList}</>)}
                    {/* <FreelancerList /> */}








                </ScrollView>
            </View>

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
        paddingHorizontal: 5,
        backgroundColor: "#fff",
    },

    input: {
        width: "100%",
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
    },
    caption: {
        fontSize: 16,
        lineHeight: 18,
    },
    title2: {
        fontSize: 18,
        marginTop: 3,
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
});

export default FreelancersClient;
