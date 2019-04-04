/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//import { StackNavigator } from 'react-navigation'; // 1.4.0
import { DrawerNavigator, createStackNavigator, createBottomTabNavigator, TabBarOptions } from 'react-navigation'; // 1.4.0

import LoginScreen from './LoginScreen'
import TabScreen from './TabScreen'
import SignupScreen from './SignupScreen'
import Patient from "./IndividualPatient";
import Provider from "./Facilitator";
import PatientScreen from './PatientScreen';
export const AppNavigator = createStackNavigator({
        LoginScreen: { screen: LoginScreen },
        TabScreen: { screen: TabScreen },
        SignupScreen: { screen: SignupScreen},
        PatientScreen: {
            screen: PatientScreen,
        },
        Patient: {
            screen: Patient,
        },
        Provider: {
            screen: Provider
        }
    }, { headerMode: 'none' }
    , {
        initialRouteName: 'LoginScreen',
    },
);