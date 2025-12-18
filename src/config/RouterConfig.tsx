import React from 'react'
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";
import ProductDetail from '../pages/ProductDetail.tsx';

function RouterConfig() {
    return (

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product-detail/:productID" element={<ProductDetail />} />

        </Routes>

    )
}

export default RouterConfig