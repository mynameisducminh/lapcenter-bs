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
            <li>A Lưới: 24 Hồ Chí Minh</li>
            <li>Quảng Bình: 70 Ngô Đình Diệm</li>
          </ul>
        </div>
        <div className="contact">
          <h5>Kênh xã hội</h5>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/ducminh2412/"
                target="_blank"
                class="faa-parent animated-hover"
              >
                <i class="faa-tada fab fa-facebook-f"></i>
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/ldminh_/"
                target="_blank"
                class="faa-parent animated-hover"
              >
                <i class="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://mail.google.com/mail/u/0/#inbox"
                target="_blank"
                class="faa-parent animated-hover"
              >
                <i class="fa-solid fa-at"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/ducminh2412/"
                target="_blank"
                class="faa-parent animated-hover"
              >
                <i class="fa-solid fa-phone"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
