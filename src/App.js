import { React, useEffect } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import Payment from "./components/Payment";
import Checkout from "./components/Checkout";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useAuth } from "./components/context/GlobalState";

function App() {
  const { dispatch } = useAuth();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className='app'>
      <Routes>
        <Route 
        path="/" 
        element={
        <><Header/> 
        <Home />
        </>} 
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
                <Payment />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      
    </div>
  )
}

export default App