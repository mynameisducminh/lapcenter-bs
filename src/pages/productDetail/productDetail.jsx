import React from "react";
import Narbar from "../../components/nabar";
import "./productDetail.scss";
import { Button } from "react-bootstrap";
import Footer from "../../components/footer";

export default function ProductDetail() {
  return (
    <>
      <Narbar />
      <div className="productDetailcontainer">
        <div className="title">
          <h1>PRODUCT DETAIL PAGE</h1>
          <span>Tình trạng: còn hàng</span>
          <span className="mx-4">Bảo hành: 24 tháng</span>
        </div>
        <hr />
        <div className="info row">
          <div className="productImage col">
            <img
              src="https://philong.com.vn/media/product/24366-5.jpg"
              alt=""
              className="image"
            />
            <div className="text-center">
              <img
                src="https://philong.com.vn/media/product/24366-5.jpg"
                alt=""
                className="imgSmail"
              />
            </div>
          </div>
          <div className="price col">
            <span>Giá bán</span> <span className="amount">2000000 VND</span>
            <div className="gift">Khuyen mai: Qua tang</div>
            <div className="gitInfo">Thong tin qua tang</div>
            <div className="text-center">
              <Button className="my-4 bg-danger">Mua Ngay</Button>
              <br />
              <span>
                Goi ngay <span className="text-danger h4">12312882</span> de giu
                hang
              </span>
            </div>
          </div>
          <div className="contact col">
            <b>Điện thoại tư vấn - Đặt hàng</b>
            <ul>
              <li>Thành Đạt: 12312312</li>
              <li>Đức Minh: 12312231</li>
              <li>Trung Tuấn: 22348383</li>
            </ul>
            <b>Địa chỉ mua hàng</b>
            <ul>
              <li>Đà Nẵng: 179 Nguyẽn Văn Linh</li>
              <li>Huế: 89 Hùng Vương</li>
              <li>Laos: 89 Lê Đình Lý</li>
            </ul>
          </div>
        </div>
        <hr />
        <table className="table my-5 table-secondary ">
          <thead>
            <tr>
              <th scope="col">PHẦN CỨNG</th>
              <th scope="col">THÔNG SỐ KỸ THUẬT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Model</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>CPU</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Ổ CỨNG</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>CARD ĐỒ HỌA</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <td>MÀN HÌNH</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
        <hr />
      </div>
      <Footer />
    </>
  );
}
