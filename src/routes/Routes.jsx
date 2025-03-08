import React from "react";  
import { BrowserRouter, Routes, Route } from "react-router";  
import DefaultLayout from "../Layouts/DefaultLayout";  
import SignUp from "../pages/auth/SignUp";

const AppRouter = () => (  
    <BrowserRouter>  
      <Routes>  
        <Route element={<DefaultLayout />}>  
          <Route path="/" element={<SignUp />} />  
        </Route>  
      </Routes>  
    </BrowserRouter>  
  );  

export default AppRouter;  


