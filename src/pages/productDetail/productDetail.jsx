import React, { useEffect, useState } from "react";
import Narbar from "../../components/nabar";
import "./productDetail.scss";
import { Button } from "react-bootstrap";
import Footer from "../../components/footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SameCard from "../../components/SameCard";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default function ProductDetail() {
  const { state } = useLocation();
  const [product, setProduct] = useState();
  console.log("product id: ", state.id);

  //callAPI
  const getProductId = () => {
    axios
      .get(
        `https://lap-center-v1.herokuapp.com/api/product/getProductById/${state.id}`
      )
      .then(function (response) {
        console.log("SUCCESS: ", response.data.response);
        setProduct(response.data.response);
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      })
      .then(function () {});
  };
  useEffect(() => {
    getProductId();
  }, []);

  return (
    <>
      <Narbar />
      <div className="productDetailcontainer">
        <div className="title">
          <h3>{product?.name}</h3>
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
            <span>Giá bán</span>{" "}
            <span className="amount">{product?.price} VND</span>
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
              <td>{product?.model}</td>
            </tr>
            <tr>
              <td>CPU</td>
              <td>{product?.cpu}</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>{product?.ram}</td>
            </tr>
            <tr>
              <td>Ổ cứng</td>
              <td>{product?.disk}</td>
            </tr>
            <tr>
              <td>CARD do hoa</td>
              <td>{product?.card}</td>
            </tr>
            <tr>
              <td>man hinh</td>
              <td>{product?.monitor}</td>
            </tr>
          </tbody>
        </table>
        <p className="text-danger h5">San Pham Cung Thuong Hieu</p>
        <hr />
      </div>
      <Carousel responsive={responsive}>
        <SameCard product={product}/>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Carousel>
      ;
      <Footer />
    </>
  );
}
