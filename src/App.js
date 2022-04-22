import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import Index from "./pages/index/index";
import Dashboard from "./pages/dashboard/dashboard";
// import Swal from "sweetalert2/dist/sweetalert2.js";
//  import 'sweetalert2/src/sweetalert2.scss'
import "sweetalert2/src/sweetalert2";
// import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

// import { login } from "./utils";

function App() {
  // const saved = localStorage.getItem("user");

  // const initialValue = JSON.parse(saved);
  // console.log("initial value", initialValue);
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/Dashboard"  element={<Dashboard />} />
          <Route exact path="/login" element={<Login />}  />
          <Route exact path="/Index"  element={<Index />}  />
          <Route exact path="/" element={<Index />}  />
          {/* <PublicRoute path="/*" element={<Index/>}></PublicRoute> */}
          {/* <PrivateRoute exact path="/*" component={Master}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// <Routes>
//       <Route exact path="/" component={Index}/>
//       <Route exact path="/login"  component={Login}/>
//       <Route exact path="/dashboard" component={Dashboard}/>
//       {/* <Route path="*" element={<NotFound/>}/> */}
// </Routes>

export default App;
