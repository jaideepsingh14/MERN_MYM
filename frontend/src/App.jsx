import React, {useEffect} from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Auth Components
import PrivateRoute from './components/auth/PrivateRoute';
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Logout from "./pages/Auth/Logout";

import Header from "./components/Header";
// import Footer from "./components/Footer";

import NotFound from './pages/NotFound';

function App() {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const isLoggedIn = async () => {
    try {
      const res = await fetch('http://localhost:3001/auth', {
        method : "POST",
        credentials : "include"
      });
      if(res.status === 401){
        navigate("/logout");
      }
      console.log("Printing cookies in react App.js")
      console.log(cookies)
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   if(cookies.username && cookies.username != null && cookies.username != undefined && cookies.username != "")
  //     isLoggedIn();
  // }, [cookies]);

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<PrivateRoute auth={cookies.userid != null} redirectpath="login" />} >
          <Route exact path="/" element={<PrivateRoute auth={false} redirectpath="/" />} />>
        </Route>
        <Route path="/" element={<PrivateRoute auth={cookies.userid == null} redirectpath="/" />} >
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/*<Footer/>*/}
    </React.Fragment>
  );
}

export default App;