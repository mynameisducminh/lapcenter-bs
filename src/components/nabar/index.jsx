import React from "react";
import './styles.scss'

export default function Narbar() {
  return (
    <div className="d-flex justify-content-between navbar-container">
      <div className="logoicon">
        <div className="text-danger"><h1>LAPCENTER</h1></div>
      </div>
      <div className="mainmenu">
        <ul className="d-flex">
          <li>TRANG CHỦ</li>
          <li>GIỚI THIỆU</li>
          <li>LIÊN HỆ</li>
          <li>ĐĂNG NHẬP</li>
        </ul>
      </div>
    </div>
  );
}
