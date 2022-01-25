import React from 'react';
import {Platform, StatusBar,StyleSheet} from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {ClientDrawer} from "./ClientDrawer";

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
import Home from '../Home';
import ClientProfile from '../ClientProfile';
import ClientHelp from '../ClientHelp';
import ClientNotification from '../ClientNotification';
import ClientSettings from "../ClientSettings";
import ClientMessage from "../ClientMessage";
import ClientAppointments from "../ClientAppointments";
import ClientFreelancers from "../ClientFreelancers";
import ClientChats from "../ClientChats";
import ClientViewProfile from "../ClientViewProfile";



const Drawer = createDrawerNavigator();

const ClientNavigation = () =>{
    return (
        <Drawer.Navigator
          drawerContent={
            props => <ClientDrawer {...props} />
          }
          drawerStyle={styles.container}
        >
            {/* <Drawer.Screen name="Home" component={Home}/> */}
            <Drawer.Screen name="ClientProfile" component={ClientProfile}/>
            <Drawer.Screen name="ClientFreelancers" component={ClientFreelancers}/>
            <Drawer.Screen name="ClientHelp" component={ClientHelp}/>
            <Drawer.Screen name="ClientNotification" component={ClientNotification}/>
            <Drawer.Screen name="ClientSettings" component={ClientSettings}/>
            <Drawer.Screen name="ClientMessage" component={ClientMessage}/>
            <Drawer.Screen name="ClientAppointments" component={ClientAppointments}/>
            <Drawer.Screen name="ClientChats" component={ClientChats}/>
            <Drawer.Screen name="ClientViewProfile" component={ClientViewProfile}/>
            
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default ClientNavigation;
