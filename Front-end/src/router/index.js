import Home from "../page/home"
import Register from "../page/register"
import History from "../page/history"

const publicRouters = [
    {
        path: '/', component: Home
    },
    {
        path: '/register', component: Register
    },
    {
        path: '/history', component: History
    }
]

export  {
    publicRouters
}