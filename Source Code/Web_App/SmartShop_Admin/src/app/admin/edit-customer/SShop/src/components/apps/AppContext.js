import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import {
    //categories
    getCategories,getCategoriesById,

    //products
    getProducts,getProductsBestSeller,getProductsLasted,getProductsRated
    ,getProductsSuggest,getProductsByCategoryId,getProductsById,

    //Carts
    getCartByUser,postCart,

    //Cart Details
    getCartDetailByCartId,getCartDetailById,

    //Order
    getOrderById,getOrderByUser,

    //Order Details
    getOrderDetailById,

    //Rates
    getRates,getRatesByOrderDetailId,getRatesByProductId,
    login
} from './AppService';


export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(null);
  

  
  //-------------------------------------------------Product-------------------------------------------------
  //Lay tat ca san pham
  const onGetProducts = async () => {
    try {
      const res = await getProducts();
      return res;
    } catch (error) {
      console.log('onGetProducts error: ', error);
    }
  };

  const onGetProductsBestSeller = async () => {
    try {
      const res = await getProductsBestSeller();
      return res;
    } catch (error) {
      console.log('onGetProductsBestSeller error: ', error);
    }
  };

  const onGetProductsLasted = async () => {
    try {
      const res = await getProductsLasted();
      return res;
    } catch (error) {
      console.log('onGetProductsLasted error: ', error);
    }
  };

  const onGetProductsRated = async () => {
    try {
      const res = await getProductsRated();
      return res;
    } catch (error) {
      console.log('onGetProductsRated error: ', error);
    }
  };

  const onGetProductsSuggest = async (categoryId,productId) => {
    try {
      const res = await getProductsSuggest(categoryId,productId);
      return res;
    } catch (error) {
      console.log('onGetProductsSuggest error: ', error);
    }
  };

  const onGetProductsByCategoryId = async (id) => {
    try {
      const res = await getProductsByCategoryId(id);
      return res;
    } catch (error) {
      console.log('onGetProductsByCategoryId error: ', error);
    }
  };

  const onGetProductsById = async (id) => {
    try {
      const res = await getProductsById(id);
      return res;
    } catch (error) {
      console.log('onGetProductsById error: ', error);
    }
  };

  //-------------------------------------------------Category-------------------------------------------------
  const onGetCategories = async () => {
    try {
      const res = await getCategories();
      return res;
    } catch (error) {
      console.log('onGetCategories error: ', error);
    }
  };
  
  const onGetCategoriesById = async (id) => {
    try {
      const res = await getCategoriesById(id);
      return res;
    } catch (error) {
      console.log('ongetCategoriesById error: ', error);
    }
  };

  //-------------------------------------------------Cart-------------------------------------------------
  const onGetCartByUser = async (email) => {
    try {
      const res = await getCartByUser(email);
      return res;
    } catch (error) {
      console.log('onGetCartByUser error: ', error);
    }
  };
  
  //-------------------------------------------------Cart Detail-------------------------------------------------
  const onGetCartDetailByCartId = async (id) => {
    try {
      const res = await getCartDetailByCartId(id);
      return res;
    } catch (error) {
      console.log('onGetCartDetailByCartId error: ', error);
    }
  };
  
  const onGetCartDetailById = async (id) => {
    try {
      const res = await getCartDetailById(id);
      return res;
    } catch (error) {
      console.log('onGetCartDetailById error: ', error);
    }
  };

    //-------------------------------------------------Order-------------------------------------------------
    const onGetOrderById = async (id) => {
      try {
        const res = await getOrderById(id);
        return res;
      } catch (error) {
        console.log('onGetOrderById error: ', error);
      }
    };

    const onGetOrderByUser = async (email) => {
      try {
        const res = await getOrderByUser(email);
        return res;
      } catch (error) {
        console.log('onGetOrderByUser error: ', error);
      }
    };
    
    //-------------------------------------------------Cart Detail-------------------------------------------------
    const onGetOrderDetailById = async (id) => {
      try {
        const res = await getOrderDetailById(id);
        return res;
      } catch (error) {
        console.log('onGetOrderDetailById error: ', error);
      }
    };

    //-------------------------------------------------Rates-------------------------------------------------
    const onGetRates = async () => {
      try {
        const res = await getRates();
        return res;
      } catch (error) {
        console.log('onGetRates error: ', error);
      }
    };
    
    const onGetRatesByOrderDetailId = async (id) => {
      try {
        const res = await getRatesByOrderDetailId(id);
        return res;
      } catch (error) {
        console.log('onGetRatesByOrderDetailId error: ', error);
      }
    };

    const onGetRatesByProductId = async (id) => {
      try {
        const res = await getRatesByProductId(id);
        return res;
      } catch (error) {
        console.log('onGetRatesByProductId error: ', error);
      }
    };

    const onLogin = async (email,password) => {
   
      try {
        const response = await login(email, password);
        if (response) {
          if(response.roles[0] != 'ROLE_USER'){
            console.log("Login fail!");
            return null;
          }
          const token = response.token;
          await AsyncStorage.setItem('token', token);
          setUser(response.token);
          // const res = await onUpdateFcmToken(response.data._id, fcmToken);
          // setUser(res.data);
          // console.log('AccessToken onLogin UserContext: ', token);
          return response;
        }
        return null;
      } catch (error) {
        console.log("OnLogin Error: ", error);
        setUser(null);
        return null;
      }
    };

  return (
    <AppContext.Provider value={{
      //Product
      onGetProducts,onGetProductsBestSeller,onGetProductsLasted,
      onGetProductsRated,onGetProductsSuggest,onGetProductsByCategoryId,onGetProductsById,

      //Category
      onGetCategories,onGetCategoriesById,

      //Cart
      onGetCartByUser,

      //Cart Detail
      onGetCartDetailByCartId,onGetCartDetailById,

      //Order
      onGetOrderById,onGetOrderByUser,

      //Order Detail
      onGetOrderDetailById,

      //Rates
      onGetRates,onGetRatesByOrderDetailId,onGetRatesByProductId,

      onLogin
    }}>
      {children}
    </AppContext.Provider>
  )
}