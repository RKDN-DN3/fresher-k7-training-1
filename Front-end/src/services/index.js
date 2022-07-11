import axiosClient from '../axios';
const getUser = () => {
    return axiosClient.post('/api/user/Login', {
        "emailOrUserName": "adminuser",
        "password": "@Abc123"
    })
}

export {
    getUser
}