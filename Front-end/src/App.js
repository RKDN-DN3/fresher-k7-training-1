import GlobalStyle from "./components/layout/GlobalStyle";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { publicRouters } from './router'
import DefaultLayout from './components/layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./components/NotFound";
import Login from "./page/login";
import { token } from "./util/getTokenLocal";

function App() {
  console.log(token)
  return (
    <GlobalStyle>
      <BrowserRouter>
        <Routes>
          {publicRouters?.map((route, index) => {
            let Component = Login;
            if(token) {
              Component = route.component;
            }
            let LayoutRender = DefaultLayout;
            
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutRender>
                    <Component />
                  </LayoutRender>
                }
              />
            )
          })}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </GlobalStyle>
  );
}

export default App;
