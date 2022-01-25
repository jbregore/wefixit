import React from 'react';
import {Platform, StatusBar,StyleSheet} from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {FreelancerDrawer} from "./FreelancerDrawer";

import {
  View,
  Text,
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 

//jobs
// import Home from "../Home";

//client
// import Home from '../Home';
import FreelancerProfile from '../FreelancerProfile';
import FreelancerSettings from '../FreelancerSettings';
import FreelancerHelp from '../FreelancerHelp';
import FreelancerNotification from '../FreelancerNotification';
import FreelancerMessage from '../FreelancerMessage';
import FreelancerChats from '../FreelancerChats';
import FreelancerAppointment from '../FreelancerAppointment';
import FreelancerViewProfile from '../FreelancerViewProfile';
import FreelancersClient from '../FreelancersClient';


// import ClientNotification from '../ClientNotification';
// import ClientSettings from "../ClientSettings";
// import ClientMessage from "../ClientMessage";
// import ClientAppointments from "../ClientAppointments";
// import ClientFreelancers from "../ClientFreelancers";
// import ClientChats from "../ClientChats";



const Drawer = createDrawerNavigator();

const FreelancerNavigation = () =>{
    return (
        <Drawer.Navigator
          drawerContent={
            props => <FreelancerDrawer {...props} />
          }
          drawerStyle={styles.container}
        >
            {/* <Drawer.Screen name="Home" component={Home}/> */}
            <Drawer.Screen name="FreelancerProfile" component={FreelancerProfile}/>
            <Drawer.Screen name="FreelancerSettings" component={FreelancerSettings}/>
            <Drawer.Screen name="FreelancerHelp" component={FreelancerHelp}/>
            <Drawer.Screen name="FreelancerNotification" component={FreelancerNotification}/>
            <Drawer.Screen name="FreelancerMessage" component={FreelancerMessage}/>
            <Drawer.Screen name="FreelancerChats" component={FreelancerChats}/>
            <Drawer.Screen name="FreelancerAppointment" component={FreelancerAppointment}/>
            <Drawer.Screen name="FreelancerViewProfile" component={FreelancerViewProfile}/>
            <Drawer.Screen name="FreelancersClient" component={FreelancersClient}/>
            
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default FreelancerNavigation;
