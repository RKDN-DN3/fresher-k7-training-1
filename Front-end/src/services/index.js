import axiosClient from '../axios';

const header = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } };
};
const getAllItem = (token) => {
    return axiosClient.get('/api/todos/get-todos', header(token));
};

const createItem = (data, token) => {
    return axiosClient.post('/api/todos/create-todo', data, header(token));
};

const deleteItem = (id, token) => {
    return axiosClient.delete(`api/todos/delete-todo/${id}`, header(token));
};

const loginUser = (userLogin) => {
    return axiosClient.post('/api/user/Login', userLogin);
};

const editItem = (data, token) => {
    return axiosClient.put('/api/todos/update-todo', data, header(token));
};

const registerUser = (userRegister) => {
    return axiosClient.post('/api/user/Register', userRegister);
};

const getUser = (token) => {
    return axiosClient.get('/api/profile/get-user', header(token));
};

const editUser = (data, token) => {
    return axiosClient.put('/api/profile/update-user', data, header(token));
};

export { getAllItem, createItem, loginUser, deleteItem, editItem, registerUser, getUser, editUser };
