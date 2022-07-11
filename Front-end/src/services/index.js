import axiosClient from '../axios';

const getUser = () => {
    return axiosClient.post('/api/user/Login', {
        "emailOrUserName": "adminuser",
        "password": "@Abc123"
    })
}

const getAllItem = (token) => {
    return axiosClient.get('/api/todos/get-todos', { headers: { "Authorization": `Bearer ${token}` } })
}

const createItem = (data, token) => {
    return axiosClient.post('/api/todos', data, { headers: { "Authorization": `Bearer ${token}` } })
}

export {
    getUser,
    getAllItem,
    createItem
}