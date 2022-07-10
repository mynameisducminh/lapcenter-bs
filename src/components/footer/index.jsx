import React from "react";
import "./styles.scss";

export default function Footer() {
  return (
    <div className="footerContainer">
      <div className="content">
        <div className="general">
          <h5>Thông tin chung</h5>
          <ul>
            <li>Giới thiệu về công ty</li>
            <li>Tin tuyển dụng</li>
            <li>Liên hệ, góp ý</li>
            <li>Tin tức</li>
          </ul>
        </div>
        <div className="brand">
          <h5>Chi nhánh</h5>
          <ul>
            <li>Đà Nẵng: 179 Nguyẽn Văn Linh</li>
            <li>Huế: 89 Hùng Vương</li>
            <li>Laos: 89 Lê Đình Lý</li>
            <li>China: 89 Lê Đình Lý</li>
          </ul>
        </div>
        <div className="contact">
          <h5>Kênh xã hội</h5>
          <ul>
            <li>
              <i class="fa-brands fa-facebook"></i>
            </li>
            <li>
              <i class="fa-brands fa-instagram"></i>
            </li>
            <li>
              <i class="fa-solid fa-message"></i>
            </li>
            <li>
              <i class="fa-solid fa-phone"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
