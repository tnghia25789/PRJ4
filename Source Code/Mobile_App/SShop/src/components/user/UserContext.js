import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { getUserById,getUserByMail,login }from './UserService';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { children } = props;

  const onGetUserById = async (id) => {
    try {
      const res = await getUserById(id);
      return res;
    } catch (error) {
      console.log('onGetUserById error: ', error);
    }
  };

  const onGetUserByMail = async (email) => {
    try {
      const res = await getUserByMail(email);
      return res;
    } catch (error) {
      console.log('onGetUserByMail error: ', error);
    }
  };

  const onLogin = async (email,password) => {
   
    try {
      const response = await login(email, password);
      if (response) {
        if(response.role != 'user'){
          console.log("Login fail!");
          return null;
        }
        const token = response.accessToken;
        await AsyncStorage.setItem('token', token);
        // const res = await onUpdateFcmToken(response.data._id, fcmToken);
        // setUser(res.data);
        console.log('AccessToken onLogin UserContext: ', token);
        return response;
      }
      return null;
    } catch (error) {
      console.log("OnLogin Error: ", error);
      // setUser(null);
      return null;
    }
  };

  return (
    <UserContext.Provider value={{
      onGetUserById, onGetUserByMail, onLogin
    }}>
      {children}
    </UserContext.Provider>
  )
}