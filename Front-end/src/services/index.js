import axiosClient from '../axios';

const getAllItem = (token) => {
  return axiosClient.get('/api/todos/get-todos', { headers: { "Authorization": `Bearer ${token}` } })
}

const createItem = (data, token) => {
  return axiosClient.post('/api/todos', data, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteItem = (id, token) => {
  return axiosClient.delete(`api/todos/delete-todo/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}


const loginUser = (userLogin) => {
  return axiosClient.post("/api/user/Login", userLogin);
};

export {
  getAllItem,
  createItem,
  loginUser,
  deleteItem
}
