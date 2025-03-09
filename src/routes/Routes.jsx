import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import DefaultLayout from "../Layouts/DefaultLayout";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoutes";
import Landing from "../pages/landing/Landing";
import CmsPanel from "../pages/CmsPanel/CmsPanel";
import ProductsLists from "../pages/productsLists/productsLists";
import Product from "../pages/product/product";
import Basket from "../pages/basket/Basket";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/landing" element={<Landing />} />
          <Route path="/landing/:id" element={<ProductsLists />} />
          <Route path="/landing/:id/:id" element={<Product />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/panel" element={<CmsPanel />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
