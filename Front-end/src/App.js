import GlobalStyle from "./components/layout/GlobalStyle";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { publicRouters } from './router'
import DefaultLayout from './components/layout/DefaultLayout';
function App() {

  return (
    <GlobalStyle>
      <BrowserRouter>
        <Routes>
          {publicRouters?.map((route, index) => {

            const Component = route.component;
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
        </Routes>
      </BrowserRouter>
    </GlobalStyle>

  );
}

export default App;
