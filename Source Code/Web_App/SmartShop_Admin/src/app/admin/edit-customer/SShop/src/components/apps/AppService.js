import CustomAxios from "../../helpers/Axisinstance";


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
export const postCart = async (email) => {
    const response = await CustomAxios().post(`/api/cart/user/${email}`);
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
// export const postOrder = async (email) => {
//     const response = await CustomAxios().post(`/api/orders/user/${email}`);
//     return response;
// };

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

export const login = async (email, password) => {
    const body = {
        email: email,
        password: password
    }
    const response = await CustomAxios().post('api/auth/signin', body);
    return response;
}