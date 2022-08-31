import React, { useState, useEffect } from "react";
import Narbar from "../../components/nabar";
import "./styles.scss";
import { Spinner } from "react-bootstrap";
import axios from "axios";

// const fakeData = [
//   {
//     _id: "6257c89d462518002330074f",
//     userId: "617d08a5ad12171f2c494d8c",
//     productId: "60c07aaea1364c3894ac0b51",
//     productName: "LAPTOP ACER NITRO 5 AN515-45-R0B6",
//     productBrand: "ACER",
//     image: "https://philong.com.vn/media/product/24366-5.jpg",
//     price: 32990000,
//     createdAt: "2022-04-14T07:09:17.158Z",
//     updatedAt: "2022-04-14T07:09:17.158Z",
//     __v: 0,
//   },
//   {
//     _id: "6298ba34505b90002306d2e3",
//     userId: "617d08a5ad12171f2c494d8c",
//     productId: "60c07aaea1364c3894ac0b51",
//     productName: "LAPTOP ACER NITRO 5 AN515-45-R0B6",
//     productBrand: "ACER",
//     image: "https://philong.com.vn/media/product/24366-5.jpg",
//     price: 32990000,
//     createdAt: "2022-06-02T13:25:08.172Z",
//     updatedAt: "2022-06-02T13:25:08.172Z",
//     __v: 0,
//   },
// ];

const MyCarts = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const user = localStorage.getItem("customerName");
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");

  console.log("asdashda", userId);
  console.log("12312", accessToken);

  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/cart/${userId}`)
      .then(function (response) {
        // handle success
        const dulieu = response.data.products;
        console.log("Carts: ", dulieu);
        setData(dulieu.reverse());
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log("ERROR: ", error);
      });
  };

  const handDelete = (cardId) => {
    console.log("CART ID: ", cardId);
    setLoading(true);
    axios
      .delete(
        `https://lap-center-v1.herokuapp.com/api/cart/removeCartInCart/${cardId}`
      )
      .then(function (response) {
        // handle success
        setLoading(false);
        fetchAPI();
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        console.log("ERROR: ", error);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <Narbar />
      <div className="myCartsContainer">
        <h3 className="text-center my-4">
          {" "}
          Giỏ hàng của <span className="text-danger">{user}</span>{" "}
        </h3>
        {/* CUSTOMIZE TABLE HEADER */}
        {loading ? (
          <div className="text-center">
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="sm" />
          </div>
        ) : (
          <div>
            <div className="d-flex tb-header rounded-top fw-bold text-light justify-content-between">
              <p className="tbh-img">Hình ảnh</p>
              <p className="tbh-name">Tên sản phẩm</p>
              <p className="tbh-brand">Hãng</p>
              <p className="tbh-price">Giá</p>
              <p className="tbh-actions">Hành động</p>
            </div>
            {data?.map((item) => (
              <div className="d-flex tb-body fw-bold justify-content-between border-top-0">
                {/* <p className="tbh-img">Hình ảnh</p> */}
                <img className="tbb-img" src={item.image} alt="" />
                <p className="tbh-name mt-2">{item.productName}</p>
                <p className="tbh-brand mt-2">{item.productBrand}</p>
                <p className="tbh-price mt-2">{item.price} VND</p>
                <div className="tbh-actions mt-2 d-flex">
                  <div className="bg-icon">
                    <i class="fa-solid fa-cart-arrow-down fx-2"></i>
                  </div>
                  <div
                    className="bg-icon mx-2"
                    onClick={() => handDelete(item._id)}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </div>
                </div>
              </div>
            ))}
            {data?.length === 0 && (
              <div className="text-center mt-2">
                <p>Không có sản phẩm nào trong giỏ hàng!!!</p>
              </div>
            )}
          </div>
        )}
        {/* CUSTOMIZE TABLE BODY */}
        {/* <div className="d-flex tb-body fw-bold  justify-content-between">
          <p className="tbh-img">Hình ảnh</p>
          <p className="tbh-name">Tên sản phẩm</p>
          <p className="tbh-brand">Hãng</p>
          <p className="tbh-price">Giá</p>
          <p className="tbh-actions">Hành động</p>
        </div> */}
        {/* LOOP DATA */}
      </div>
    </>
  );
};

export default MyCarts;
