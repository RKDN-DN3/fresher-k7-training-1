import Home from "../page/home"
import Register from "../page/register"

const publicRouters = [
    {
        path: '/', component: Home
    },
    {
        path: '/register', component: Register
    }
]

export  {
    publicRouters
}