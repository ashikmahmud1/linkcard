import React, {Component} from 'react';
import {} from 'react-native';
import {Icon} from 'react-native-elements'; // 0.19.0
import {DrawerNavigator, createStackNavigator, TabBarOptions} from 'react-navigation'; // 1.2.1
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import ScanScreen from '../ScanScreen';
import SettingScreen from '../SettingScreen';
import PatientScreen from '../PatientScreen';
//import { PatientStack } from '../router';

import {Ionicons} from '@expo/vector-icons'; // 6.3.1
//import SignUp from "../signup";
import Patient from "../IndividualPatient";
import Provider from "../Facilitator";
//import PatientScreen from '../PatientScreen'

export const PatientStack = createStackNavigator({
        PatientScreen: {
            screen: PatientScreen
        },
        Patient: {
            screen: Patient
        },
        Provider: {
            screen: Provider
        }
    },
    {
        navigationOptions: {
            header: null
        }
    }
);
const TabNavigation = createBottomTabNavigator(
    {
        Scan: {
            screen: ScanScreen,
            navigationOptions: {
                tabBarLabel: 'Scan',
                tabBarIcon: () => (
                    <Icon
                        type="MaterialCommunityIcons"
                        name="apps"
                        size={30}
                        color="#7117ea"
                    />
                ),
            },
        },
        Patient: {
            screen: PatientStack,
            navigationOptions: {
                header: {
                    visible: false
                },
                tabBarLabel: 'Patients',
                tabBarIcon: () => <Icon
                    type='MaterialCommunityIcons'
                    name='people'
                    size={30}
                    color="#7117ea"


                />
            }
        },
        Setting: {
            screen: SettingScreen,
            navigationOptions: {
                headerVisible: false,
                tabBarLabel: 'Setting',
                tabBarIcon: ({focused}) => (
                    <Icon
                        type="MaterialCommunityIcons"
                        name={focused ? 'settings' : 'settings'}
                        size={30}
                        color="#7117ea"

                    />
                ),
            },
        },
    },
    {
        lazyLoad: true,
        animationEnabled: false,
        tabBarPosition: 'bottom',
        tabBarOptions: {

            showIcon: true,
            showLabel: true,
            activeTintColor: '#7117ea',
            inactiveTintColor: '#7117ea',
            style: {
                backgroundColor: '#eff0f1'
            },
            iconStyle: {
                width: 40

            },
            tabStyle: {
                height: 60
            }

        },
    },
);
TabNavigation.navigationOptions = {
    footer: {
        style: {
            backgroundColor: '#7117ea',
            color: '#7117ea',
        },
    },
};
TabNavigation.tabBarComponent = BottomTabBar;
TabNavigation.tabBarPosition = 'bottom';
TabNavigation.tabBarOptions = {
    activeTintColor: '#7117ea',
    inactiveTintColor: '#7117ea',
};
TabNavigation.animationEnabled = false;
TabNavigation.swipeEnabled = false;

class Welcome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <TabNavigation/>;
    }
}

export default Welcome;
