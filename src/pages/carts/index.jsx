import React, { useState, useEffect } from "react";
import { useNavigate, navigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import "./styles.scss";
import { Spinner } from "react-bootstrap";
import iconCart from "../../assets/imgs/carts.png";
import iconDelete from "../../assets/imgs/delete.png";
// import iconHistory from "../../assets/imgs/history.png"
import axios from "axios";

const MyCarts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const user = localStorage.getItem("customerName");
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");
  const [product, setProduct] = useState();

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
      <Navbar />
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
                  <div
                    className="bg-icon mx-2"
                    onClick={() => handDelete(item._id)}
                  >
                    <img
                      className="icon"
                      src={iconDelete}
                      alt=""
                      width={25}
                      height={25}
                    />
                  </div>
                  <div className="bg-icon" onClick={() => {
                      navigate(`/buy/${item._id}`, {
                        state: { id: item._id },
                      });
                    }}>
                    <img
                      className="icon"
                      src={iconCart}
                      alt=""
                      width={25}
                      height={25}
                    />
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
      </div>
    </>
  );
};

export default MyCarts;
