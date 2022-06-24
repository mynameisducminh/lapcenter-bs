import React from "react";
import "./styles.scss";

export default function Footer() {
  return (
    <div className="footerContainer">
      <div className="content">
        <div className="general">
          <h5>Thong tin chung</h5>
          <ul>
            <li>Gio thieu ve cong ty</li>
            <li>Tin tuyen dung</li>
            <li>Lien he, gop y</li>
            <li>Tin tuc</li>
          </ul>
        </div>
        <div className="brand">
          <h5>Chi nhanh</h5>
          <ul>
            <li>Đà Nẵng: 179 Nguyẽn Văn Linh</li>
            <li>Huế: 89 Hùng Vương</li>
            <li>Laos: 89 Lê Đình Lý</li>
            <li>China: 89 Lê Đình Lý</li>
          </ul>
        </div>
        <div className="contact">
          <h5>Kenh xa hoi</h5>
          <ul>
            <li>Facebook</li>
            <li>Intargram</li>
            <li>Gmail</li>
            <li>Zalo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
