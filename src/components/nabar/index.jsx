import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

export default function Narbar() {
  return (
    <div className="d-flex justify-content-between navbar-container">
      <div className="logoicon">
        <div className="text-danger">
          <h1>LAPCENTER</h1>
        </div>
      </div>
      <div className="mainmenu">
        <ul className="d-flex justify-content-between">
          <li>
            <Link to="/">Trang Chu</Link>
          </li>
          <li>
            <Link to="/about">Gioi Thieu</Link>
          </li>
          <li>
            <Link to="/asd">Lien He</Link>
          </li>
          <li>
            <Link to="/login">Dang Nhap</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
