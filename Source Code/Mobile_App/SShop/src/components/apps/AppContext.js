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
    getCartByUser,putCart,

    //Cart Details
    getCartDetailByCartId,getCartDetailById,postCartDetail,putCartDetail,removeCartDetail,

    //Order
    getOrderById,getOrderByUser,postOrder,putOrderById,

    //Order Details
    getOrderDetailById,

    //Rates
    getRates,getRatesByOrderDetailId,getRatesByProductId,

    //Favorites
    getFavoritesByUserProduct,getFavoritesByProduct,getFavoritesByUser,postFavorites,removeFavorites,

    //
    getProvinces,getDistricts,getWards,

    //SendOtp
    sendMailOtp,

    //Register
    register,
    login
} from './AppService';


export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [countCart, setCountCart] = useState(0);
  const [countFavorite, setCountFavorite] = useState(0);
  const [listCartDetail, setListCartDetail] = useState([]);
  const [numberChange, setNumberChange] = useState(0);
  const [countOrder, setCountOrder] = useState(0);

    //-------------------------------------------------Customer Register-------------------------------------------------
  //send otp
  const onSendOtp = async (email) => {
    try {
      const res = await sendMailOtp(email);
      return res;
    } catch (error) {
      console.log('onSendOtp error: ', error);
    }
  };

  //customer register
  const onRegister = async (email, password, name, status, gender, image, address, phone, registerDate, role) => {
    try {
      const response = await register(email, password, name, status, gender, image, address, phone, registerDate, role);     
      return response;
    } catch (error) {
      console.log("OnRegister Error: ", error);
      return false;
    }
  };

  //--------------------------------------------------------------------------------------------------------
  const onGetProvinces = async () => {
    try {
      const res = await getProvinces();
      return res;
    } catch (error) {
      console.log('onGetProvinces error: ', error);
    }
  };

  const onGetDistricts = async () => {
    try {
      const res = await getDistricts();
      return res;
    } catch (error) {
      console.log('onGetDistricts error: ', error);
    }
  };

  const onGetWards = async () => {
    try {
      const res = await getWards();
      return res;
    } catch (error) {
      console.log('onGetWards error: ', error);
    }
  };
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

  const onPutCartUser = async (email) => {
    try {
      const res = await putCart(email);
      return res;
    } catch (error) {
      console.log('onPutCartUser error: ', error);
    }
  };
  
  //-------------------------------------------------Cart Detail-------------------------------------------------
  const onGetCartDetailByCartId = async (id) => {
    try {
      const res = await getCartDetailByCartId(id);
      setCountCart(res.length);
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

  const onPostCartDetail = async (quantity,price,cartId,productId) => {
    try {
      const res = await postCartDetail(quantity,price,cartId,productId);
      onGetCartDetailByCartId(cartId);
      setNumberChange(numberChange + 1);
      return res;
    } catch (error) {
      console.log('onPostCartDetail error: ', error);
    }
  };

  const onPutCartDetail = async (cartDetailId, quantity,price,cartId,productId) => {
    try {
      const res = await putCartDetail(cartDetailId, quantity,price,cartId,productId);
      onGetCartDetailByCartId(cartId);
      setNumberChange(numberChange + 1);
      return res;
    } catch (error) {
      console.log('onPutCartDetail error: ', error);
    }
  };

  const onRemoveCartDetail = async (id) => {
    try {
      const res = await removeCartDetail(id);
      
      return res;
    } catch (error) {
      console.log('onRemoveCartDetail error: ', error);
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
    
    const onPostOrder = async (email,cartId,amount,address,phone,userId) => {
      try {
        const res = await postOrder(email,cartId,amount,address,phone,userId);
        return res;
      } catch (error) {
        console.log('onPostOrder error: ', error);
      }
    };

    const onPutOrderById = async (id) => {
      try {
        const res = await putOrderById(id);
        return res;
      } catch (error) {
        console.log('onPutOrderById error: ', error);
      }
    };
    //-------------------------------------------------Order Detail-------------------------------------------------
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

    
    //-------------------------------------------------Favorites-------------------------------------------------
    const onGetFavoritesByUser = async (email) => {
      try {
        const res = await getFavoritesByUser(email);
        
        return res;
      } catch (error) {
        console.log('onGetFavoritesByUser error: ', error);
      }
    };
    
    const onGetFavoritesByProduct = async (id) => {
      try {
        const res = await getFavoritesByProduct(id);
        return res;
      } catch (error) {
        console.log('onGetFavoritesByProduct error: ', error);
      }
    };

    const onGetFavoritesByUserProduct = async (id,email) => {
      try {
        const res = await getFavoritesByUserProduct(id,email);
        return res;
      } catch (error) {
        console.log('onGetFavoritesByUserProduct error: ', error);
      }
    };

    const onPostFavorites = async (userId,productId) => {
      try {
        const res = await postFavorites(userId,productId);

        const resF = await getFavoritesByUser(user.email);
        setCountFavorite(resF.length);
        return res;
      } catch (error) {
        console.log('onPostFavorites error: ', error);
      }
    };

    const onDeleteFavorites = async (id) => {
      try {
        const res = await removeFavorites(id);
        const resF = await getFavoritesByUser(user.email);
        setCountFavorite(resF.length);
        return res;
      } catch (error) {
        console.log('onDeleteFavorites error: ', error);
      }
    };

    //--------------------------------------------User-------------------------------------------------------
    const onLogin = async (email,password) => {
   
      try {
        const response = await login(email, password);
        if (response) {
          if(response.roles[0] != 'ROLE_USER'){
            console.log("Login fail!");
            return null;
          }
          const resCart = await getCartByUser(email);
          const resCount = await getCartDetailByCartId(resCart.cartId);
          setCountCart(resCount.length);

          const resF = await getFavoritesByUser(email);
          setCountFavorite(resF.length);
          const token = response.token;
          await AsyncStorage.setItem('token', token);
          setUser(response);
          return response;
        }
        return null;
      } catch (error) {
        console.log("OnLogin Error: ", error);
        setUser(null);
        return null;
      }
    };

    const onLogout = async () => {
      try {
        await AsyncStorage.removeItem('idUser');
        await AsyncStorage.removeItem('token');        
        //await GoogleSignin.signOut();    

        // setUser(null);
        return true;
      } catch (e) {
        console.log("OnLogout Error: ", e);        
      }
    };

    const onUpateCartFromFavorite = async (Fid,quantity,price,cartId,productId) => {
      try {
        const res = await postCartDetail(quantity,price,cartId,productId);
        await removeFavorites(Fid);
      return res;
      } catch (e) {
        console.log("onUpateCartFromFavorite Error: ", e);        
      }
    };
  return (
    <AppContext.Provider value={{
      user,setUser,
      //Product
      onGetProducts,onGetProductsBestSeller,onGetProductsLasted,onGetProductsRated,
      onGetProductsSuggest,onGetProductsByCategoryId,onGetProductsById,

      //Category
      onGetCategories,onGetCategoriesById,

      //Cart
      onGetCartByUser,onPutCartUser,

      //Cart Detail
      onGetCartDetailByCartId,onGetCartDetailById,onPostCartDetail,onPutCartDetail,onRemoveCartDetail,onUpateCartFromFavorite,

      //Order
      onGetOrderById,onGetOrderByUser,onPostOrder,onPutOrderById,

      //Order Detail
      onGetOrderDetailById,

      //Rates
      onGetRates,onGetRatesByOrderDetailId,onGetRatesByProductId,

      //User
      onLogin, onLogout,

      //Favorites
      onGetFavoritesByUser,onGetFavoritesByProduct,onGetFavoritesByUserProduct,onPostFavorites,onDeleteFavorites,

      //
      onGetProvinces,onGetDistricts,onGetWards,

      //SendOtp
      onSendOtp,

      //Register
      onRegister,
    
      countCart, setCountCart,
      countFavorite, setCountFavorite,
      listCartDetail, setListCartDetail,
      numberChange,setNumberChange,
      countOrder, setCountOrder,
    }}>
      {children}
    </AppContext.Provider>
  )
}