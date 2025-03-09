import React from "react";
import AppRouter from "../routes/Routes";
import { Toaster } from 'react-hot-toast';  

function Index() {
  return (
    <div className="container mx-auto text-center">
      <AppRouter />
      <Toaster />  

    </div>
  );
}

export default Index;
