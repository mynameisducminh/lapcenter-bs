import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/login";
import Register from "./pages/register/register";
import ProductDetail from "./pages/productDetail/productDetail";
import "@fortawesome/fontawesome-free/css/all.min.css";
import BuyNow from "./pages/buy";
import MyCarts from "./pages/carts";
import Orders from "./pages/admin/orders";
import PageNotFound from "./pages/pageNotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
const isAdmin = localStorage.getItem("isAdmin");

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/buy/:productId" element={<BuyNow />} />
        <Route path="/myCarts" element={<MyCarts />} />
        <Route path="/*" element={<PageNotFound />} />
        {isAdmin === "false" && <Route path="/orders" element={<Orders />} />}
      </Routes>
    </BrowserRouter>{" "}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
