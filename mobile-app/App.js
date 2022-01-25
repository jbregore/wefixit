import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  Login, SignUp, SignUpVerification,
  SignUpNext, FaceVerificationSignUp, MapScreen,
  ChooseRole, YouAllSet, VerificationRequest,
  FreelancerFillUp1, FreelancerFillUp2
} from './src/screens';

import {
  ClientHelp, ClientNotification, ClientSettings,
  ClientMessage, ClientProfile, ClientAppointments, ClientFreelancers,
  ClientChats, ClientViewProfile
} from "./src/screens/Client";

import {
  FreelancerProfile, FreelancerSettings, FreelancerHelp, 
  FreelancerNotification, FreelancerMessage, FreelancerChats,
  FreelancerAppointment, FreelancerViewProfile,FreelancersClient
} from "./src/screens/Freelancer";

import ClientNavigation from "./src/screens/Client/navigation/ClientNavigation";
import FreelancerNavigation from "./src/screens/Freelancer/navigation/FreelancerNavigation";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        //header
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Login"}
      >

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ClientFreelancers" component={ClientFreelancers} />
        <Stack.Screen name="ClientChats" component={ClientChats} />
        <Stack.Screen name="YouAllSet" component={YouAllSet} />
        <Stack.Screen name="FreelancerFillUp2" component={FreelancerFillUp2} />
        <Stack.Screen name="FreelancerFillUp1" component={FreelancerFillUp1} />
        <Stack.Screen name="VerificationRequest" component={VerificationRequest} />
        <Stack.Screen name="ChooseRole" component={ChooseRole} />
        <Stack.Screen name="FaceVerificationSignUp" component={FaceVerificationSignUp} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="SignUpVerification" component={SignUpVerification} />
        <Stack.Screen name="SignUpNext" component={SignUpNext} />
        <Stack.Screen name="SignUp" component={SignUp} />

        {/* client navigation */}
        <Stack.Screen name="ClientNavigation" component={ClientNavigation} />

        {/* client's screen */}
        <Stack.Screen name="ClientHelp" component={ClientHelp} />
        <Stack.Screen name="ClientNotification" component={ClientNotification} />
        <Stack.Screen name="ClientSettings" component={ClientSettings} />
        <Stack.Screen name="ClientMessage" component={ClientMessage} />
        <Stack.Screen name="ClientProfile" component={ClientProfile} />
        <Stack.Screen name="ClientAppointments" component={ClientAppointments} />
        <Stack.Screen name="ClientViewProfile" component={ClientViewProfile} />
        

        {/* freelancers navigation */}
        <Stack.Screen name="FreelancerNavigation" component={FreelancerNavigation} />
        
        {/* freelancer screen */}
        <Stack.Screen name="FreelancerProfile" component={FreelancerProfile} />
        <Stack.Screen name="FreelancerSettings" component={FreelancerSettings} />
        <Stack.Screen name="FreelancerHelp" component={FreelancerHelp} />
        <Stack.Screen name="FreelancerNotification" component={FreelancerNotification} />
        <Stack.Screen name="FreelancerMessage" component={FreelancerMessage} />
        <Stack.Screen name="FreelancerChats" component={FreelancerChats} />
        <Stack.Screen name="FreelancerAppointment" component={FreelancerAppointment} />
        <Stack.Screen name="FreelancerViewProfile" component={FreelancerViewProfile} />
        <Stack.Screen name="FreelancersClient" component={FreelancersClient} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
