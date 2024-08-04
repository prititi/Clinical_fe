// src/routes/Routes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Register } from "./pages/Register";
import ImageUploadPage from "./pages/ImageUploadPage";

const MainContainer = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/upload" element={<ImageUploadPage />} />
      </Routes>
    </Layout>
  </Router>
);

export default MainContainer;
