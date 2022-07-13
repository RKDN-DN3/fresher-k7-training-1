import jwtDecode from "jwt-decode";

export const checkTokenExpirationMiddleware = () =>  {
    const data = localStorage.getItem("tokenUserLogin")
    if (jwtDecode(data).exp < Date.now() / 1000) {
        localStorage.clear();
    }
};