import React, { useState, useEffect, useContext } from 'react';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './screens/TabScreens/Home';
import Login from './screens/TabScreens/Login';
import { AppContext } from './AppContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

const BottomNavigation = () => {
    const {  } = useContext(AppContext);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } 
                    // else if (route.name === 'Favorite') {
                    //     iconName = focused
                    //         ? 'bookmark'
                    //         : 'bookmark-outline';
                    // } else if (route.name === 'Notification') {
                    //     iconName = focused
                    //         ? 'notifications'
                    //         : 'notifications-outline';
                    // } else if (route.name === 'Cart') {
                    //     iconName = focused
                    //         ? 'cart'
                    //         : 'cart-outline';
                    // } else if (route.name === 'Profile') {
                    //     iconName = focused
                    //         ? 'person'
                    //         : 'person-outline';
                    // }
                    else if (route.name === 'Login') {
                        iconName = focused
                            ? 'person'
                            : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },

                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                initialRouteName: 'Home',
            })}>

            <Tab.Screen options={{ headerShown: false }} name="Home" component={Home} />
             <Tab.Screen options={{ headerShown: false }} name="Login" component={Login} />
            {/* <Tab.Screen options={{ headerShown: false, tabBarBadge: numberFavorite }} name="Favorite" component={Favorite} />
            <Tab.Screen options={{ headerShown: false, tabBarBadge: numBerNotification }} name="Notification" component={Notification} />
            <Tab.Screen options={{ headerShown: false, tabBarBadge: numberCart }} name="Cart" component={Cart} /> */}
            {/* <Tab.Screen options={{ headerShown: false }} name="Profile" component={Profile} /> */}

        </Tab.Navigator>
    )
}


const AppNavigation = () => {
    

    

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName={'BottomNavigation'}>
                <Stack.Screen options={{ headerShown: false }} name='BottomNavigation' component={BottomNavigation} />


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;