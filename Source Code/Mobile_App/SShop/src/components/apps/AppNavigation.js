import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity,ToastAndroid } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './screens/TabScreens/Home';
import Login from './screens/TabScreens/Login';
import Cart from './screens/TabScreens/Cart';
import Favorite from './screens/TabScreens/Favorite';
import ProductDetail from './screens/Product/ProductDetail';
import ListReview from './screens/Review/ListReview';
import ListProduct from './screens/ListProduct/ListProduct';
import Success from './screens/Cart/Success';
import CheckOut from './screens/Cart/CheckOut';
import Register from './screens/TabScreens/Register';
import Profile from './screens/TabScreens/Profile';
import Setting from './screens/Setting/Setting';
import Order from './screens/Order/Order';
import { AppContext } from './AppContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

const BottomNavigation = () => {
    const { user,countCart,countFavorite } = useContext(AppContext);

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
                    else if (route.name === 'Favorite') {
                        iconName = focused
                            ? 'bookmark'
                            : 'bookmark-outline';
                    }
                    // } else if (route.name === 'Notification') {
                    //     iconName = focused
                    //         ? 'notifications'
                    //         : 'notifications-outline';
                    // } 
                    else if (route.name === 'Cart') {
                        iconName = focused
                            ? 'cart'
                            : 'cart-outline';
                    } 
                    else if (route.name === 'Profile') {
                        iconName = focused
                            ? 'person'
                            : 'person-outline';
                    }
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
             
             <Tab.Screen options={{ headerShown: false, tabBarBadge: (user =='' || user == null)? null:countFavorite,tabBarButton: (props) =>
                                                                                                                                        (user === '' || user === null) ? (
                                                                                                                                            <TouchableOpacity
                                                                                                                                            {...props}
                                                                                                                                            onPress={() => {
                                                                                                                                                ToastAndroid.show("You must login first", ToastAndroid.SHORT);
                                                                                                                                            }}
                                                                                                                                            />
                                                                                                                                        ) : (
                                                                                                                                            <TouchableOpacity {...props} />
                                                                                                                                       ), }} name="Favorite" component={Favorite} />
            {/* // <Tab.Screen options={{ headerShown: false, tabBarBadge: numBerNotification }} name="Notification" component={Notification} /> */}
            <Tab.Screen options={{ headerShown: false, tabBarBadge: (user =='' || user == null)? null:countCart,tabBarButton: (props) =>
                                                                                                                                        (user === '' || user === null) ? (
                                                                                                                                            <TouchableOpacity
                                                                                                                                            {...props}
                                                                                                                                            onPress={() => {
                                                                                                                                                ToastAndroid.show("You must login first", ToastAndroid.SHORT);
                                                                                                                                            }}
                                                                                                                                            />
                                                                                                                                        ) : (
                                                                                                                                            <TouchableOpacity {...props} />
                                                                                                                                       ), }} name="Cart" component={Cart} />
            {(user =='' || user == null)?<Tab.Screen options={{ headerShown: false }} name="Login" component={Login} />:
            <Tab.Screen options={{ headerShown: false }} name="Profile" component={Profile} />}

        </Tab.Navigator>
    )
}


const AppNavigation = () => {
    
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName={'BottomNavigation'}>
                <Stack.Screen options={{ headerShown: false }} name='BottomNavigation' component={BottomNavigation} />
                <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />
                <Stack.Screen options={{ headerShown: false }} name='ProductDetail' component={ProductDetail} />
                <Stack.Screen options={{ headerShown: false }} name='ListReview' component={ListReview} />
                <Stack.Screen options={{ headerShown: false }} name='ListProduct' component={ListProduct} />
                <Stack.Screen options={{ headerShown: false }} name='CheckOut' component={CheckOut} />
                <Stack.Screen options={{ headerShown: false }} name='Success' component={Success} />
                <Stack.Screen options={{ headerShown: false }} name='Register' component={Register} />
                <Stack.Screen options={{ headerShown: false }} name='Profile' component={Profile} />
                <Stack.Screen options={{ headerShown: false }} name='Setting' component={Setting} />
                <Stack.Screen options={{ headerShown: false }} name='Order' component={Order} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;