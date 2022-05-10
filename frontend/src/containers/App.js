import React,{useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

import routes from '../routes';
import Home from '../components/base/Home';
import LogIn from '../components/auth/LogIn';
import SignUp from '../components/auth/SignUp';
import Setting from '../components/auth/Setting';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import Association from '../components/details/Association';
import Activity from '../components/details/Activity';

function App() {

  const [authenticated ,setAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.getItem('access_token') || localStorage.getItem('refresh_token') ? setAuthenticated(true):setAuthenticated(false);

    console.log(authenticated);
  }, []);


  const AuthenticatedRoute = () =>{
    if(authenticated)
    {
      return(
        <>
          <Route path={routes.setting} element={<Setting />}/>
        </>
      )
    }else{
      return(
        <>

        </>
      )
    }
  }


  return (
    <>
      <NavBar is_authenticated={authenticated} />
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.signIn} element={<LogIn />} />
          <Route path={routes.signUp} element={<SignUp />} />
          <Route path={routes.association} element={<Association />} />
          <Route path={routes.activity} element={<Activity />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
