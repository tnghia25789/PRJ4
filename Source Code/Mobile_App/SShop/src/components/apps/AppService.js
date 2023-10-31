import CustomAxios from "../../helpers/Axisinstance";
import axios from "axios";
const provinces = 'https://provinces.open-api.vn/api/p'
const districts = 'https://provinces.open-api.vn/api/d';
const wards = 'https://provinces.open-api.vn/api/w';

//
export const getProvinces = async () => {
    const response = await axios.get(provinces);
    return response;
}; 

export const getDistricts = async () => {
    const response = await axios.get(districts);
    return response;
}; 

export const getWards = async () => {
    const response = await axios.get(wards);
    return response;
}; 

//---------------------------------Category---------------------------------
//lay danh sach categories
export const getCategories = async () => {
    const response = await CustomAxios().get('api/categories');
    return response;
}; 

// categories theo id 
export const getCategoriesById = async (id) => {
    const response = await CustomAxios().get(`api/categories/${id}`);
    return response;
};


//---------------------------------Product---------------------------------
//Lay tat ca san pham
export const getProducts = async () => {
    const response = await CustomAxios().get('/api/products');
    return response;
};

// lay list bán chạy nhất
export const getProductsBestSeller = async () => {
    const response = await CustomAxios().get('/api/products/bestseller');
    return response;
}

//Lay list
export const getProductsLasted = async () => {
    const response = await CustomAxios().get('/api/products/latest');
    return response;
};

//
export const getProductsRated = async () => {
    const response = await CustomAxios().get('/api/products/rated');
    return response;
};

//Lay san pham theo category id va product id
export const getProductsSuggest = async (categoryId,productId) => {
    const response = await CustomAxios().get(`/api/products/suggest/${categoryId}/${productId}`);
    return response;
};

//Lay san pham theo categoryid
export const getProductsByCategoryId = async (id) => {
    const response = await CustomAxios().get(`/api/products/category/${id}`);
    return response;
};

//Lay tat ca san pham theo id
export const getProductsById = async (id) => {
    const response = await CustomAxios().get(`/api/products/${id}`);
    return response;
};

//---------------------------------Cart---------------------------------
//Lay cart theo user
export const getCartByUser = async (email) => {
    const response = await CustomAxios().get(`/api/cart/user/${email}`);
    return response;
};

// tao cart
export const putCart = async (email) => {
    const response = await CustomAxios().put(`/api/cart/user/${email}`);
    return response;
};

//---------------------------------Cart Detail---------------------------------
//Lay cart detail theo cart id
export const getCartDetailByCartId = async (id) => {
    const response = await CustomAxios().get(`/api/cartDetail/cart/${id}`);
    return response;
};

//Lay cart detail theo  id
export const getCartDetailById = async (id) => {
    const response = await CustomAxios().get(`/api/cartDetail/${id}`);
    return response;
};

export const postCartDetail = async (quantity,price,cartId,productId) => {
    const body = {
        quantity: quantity,
        price:price,
        cart:{cartId:cartId},
        product:{productId:productId}
    }
    const response = await CustomAxios().post('/api/cartDetail', body);
    return response;
}

export const putCartDetail = async (cartDetailId, quantity,price,cartId,productId) => {
    const body = {
        cartDetailId: cartDetailId,
        quantity: quantity,
        price:price,
        cart:{cartId:cartId},
        product:{productId:productId}
    }
    const response = await CustomAxios().put('/api/cartDetail', body);
    return response;
}

// remove cart detail
export const removeCartDetail = async (id) => {
    
    const response = await CustomAxios().delete(`/api/cartDetail/${id}`);
    return response;
}

//---------------------------------Order---------------------------------
//Lay Orders theo user
export const getOrderById = async (id) => {
    const response = await CustomAxios().get(`/api/orders/${id}`);
    return response;
};

// 
export const getOrderByUser = async (email) => {
    const response = await CustomAxios().get(`/api/orders/user/${email}`);
    return response;
};

// 
export const postOrder = async (email,cartId,amount,address,phone,userId) => {
    const body = {
        cartId: cartId,
        phone: phone,
        amount:amount,
        address: address,
        user:{userId:userId}
    }
    const response = await CustomAxios().post(`/api/orders/${email}`,body);
    return response;
};

export const putOrderById = async (id) => {
    const response = await CustomAxios().get(`/api/orders/cancel/${id}`);
    return response;
};
//---------------------------------Order Detail---------------------------------
//Lay cart detail theo cart id
export const getOrderDetailById = async (id) => {
    const response = await CustomAxios().get(`/api/orderDetail/order/${id}`);
    return response;
};

//---------------------------------Rates---------------------------------
// Get All
export const getRates = async () => {
    const response = await CustomAxios().get(`/api/rates`);
    return response;
};

// Get Rate by OrderDetailId
export const getRatesByOrderDetailId = async (id) => {
    const response = await CustomAxios().get(`/api/rates/${id}`);
    return response;
};

// Get Rate by Product Id
export const getRatesByProductId = async (id) => {
    const response = await CustomAxios().get(`/api/rates/product/${id}`);
    return response;
};

//---------------------------------User---------------------------------

export const login = async (email, password) => {
    const body = {
        email: email,
        password: password
    }
    const response = await CustomAxios().post('/api/auth/signin', body);
    return response;
}

//---------------------------------Favorites---------------------------------
// Get by user
export const getFavoritesByUser = async (email) => {
    const response = await CustomAxios().get(`/api/favorites/email/${email}`);
    return response;
};

// Get by Product
export const getFavoritesByProduct = async (id) => {
    const response = await CustomAxios().get(`/api/favorites/product/${id}`);
    return response;
};

//  Get by Product for  User
export const getFavoritesByUserProduct = async (id,email) => {
    const response = await CustomAxios().get(`/api/favorites/${id}/${email}`);
    return response;
};

// add favorites
export const postFavorites = async (userId,productId) => {
    const body = {
        user:{
            userId: userId
        },
        product:{
            productId: productId
        }
    }
    const response = await CustomAxios().post('/api/favorites/email', body);
    return response;
};

// remove favorites
export const removeFavorites = async (id) => {
    
    const response = await CustomAxios().delete(`/api/favorites/${id}`);
    return response;
};

//---------------------------------Send OTP---------------------------------
//send otp
export const sendMailOtp = async (email) => {
    // const body = {
    //     email: email       
    // }
    const response = await CustomAxios().post(`api/send-mail/otp`, email);
    return response;
};

//---------------------------------Register---------------------------------
//customer register
export const register = async (email, password, name, status, gender, image, address, phone, registerDate, role) => {
    const body = {    
        email: email,
        password: password,
        name: name,
        status: status,
        gender: gender,
        image: image,
        address: address,
        phone: phone,
        registerDate: registerDate,
        role: role      
    }
    const response = await CustomAxios().post(`api/auth/signup`, body);
    return response;
};