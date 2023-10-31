import CustomAxios from "../../helpers/Axisinstance";


//get User by id
export const getUserById = async (id) => {
    const response = await CustomAxios().get(`api/auth/${id}`);
    return response;
};

//get User by email
export const getUserByMail = async (email) => {
    const response = await CustomAxios().get(`api/auth/email/${email}`);
    return response;
};

//login
export const login = async (email, password) => {
    const body = {
        email: email,
        password: password
    }
    const response = await CustomAxios().post('api/auth/signin', body);
    return response;
}