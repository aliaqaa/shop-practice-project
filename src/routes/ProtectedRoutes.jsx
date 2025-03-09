import React from 'react';  
import { Navigate, Outlet } from 'react-router';  // Correct import  
import Cookies from 'js-cookie';  

function ProtectedRoute({ children }) {  // Changed to a functional component that receives children  
  const token = Cookies.get("token");  

  return token ? (  
    <Outlet/>  // Render the children if the token exists  
  ) : (  
    <Navigate to="/login"  />  // Redirect to login if no token  
  );  
}  

export default ProtectedRoute;  