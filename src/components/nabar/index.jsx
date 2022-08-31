import React from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Narbar() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear();
    navigate('/')
    window.location.reload();
  };
  
  return (
    <div className="d-flex justify-content-between navbar-container">
      <div className="logoicon">
        <ul className="text-danger">
          <h3>
            <li>
              <Link to="/">
                LAPCENTER
                <i class="fa-solid fa-laptop"></i>
              </Link>
            </li>
          </h3>
        </ul>
      </div>
      <div className="mainmenu">
        <ul className="d-flex justify-content-between">
          <li>
            <Link to="/">Trang Chủ</Link>
          </li>
          <li>
            <Link to="/about">Giới Thiệu</Link>
          </li>
          <li>
            <Link to="/asd">Liên Hệ</Link>
          </li>
          {accessToken ? (
            <li onClick={handleLogout}>
              <p className="logout">Đăng xuất</p>
            </li>
          ) : (
            <li>
              <Link to="/login">Đăng Nhập</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
