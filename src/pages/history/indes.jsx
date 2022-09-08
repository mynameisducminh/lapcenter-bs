import React, { useState, useEffect } from "react";
import { useNavigate, navigate } from "react-router-dom";
import Narbar from "../../components/nabar";
import { Spinner } from "react-bootstrap";
import iconCart from "../../assets/imgs/carts.png";
import iconDelete from "../../assets/imgs/delete.png";
import "./styles.scss";

// import iconHistory from "../../assets/imgs/history.png"
import axios from "axios";

const MyHistory = () => {
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
      .get(`https://lap-center.herokuapp.com/api/history/${userId}`)
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

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <Narbar />
      <div className="myHistoryContainer">
        <h3 className="text-center my-4">
          {" "}
          Lịch sử mua hàng của <span className="text-danger">{user}</span>{" "}
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
              <p className="tbh-img">STT</p>
              <p className="tbh-name">Tên sản phẩm</p>
              <p className="tbh-brand">Hãng</p>
              <p className="tbh-price">Số Lượng</p>
            </div>
            {data?.map((item, index) => (
              <div className="d-flex tb-body fw-bold justify-content-between border-top-0 text-center">
                {/* <p className="tbh-img">Hình ảnh</p> */}
                <p className="tbh-img">{index + 1}</p>
                <p className="tbh-name mt-2">{item.productName}</p>
                <p className="tbh-brand mt-2">{item.productBrand}</p>
                <p className="tbh-price mt-2">{item.quantity}</p>
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

export default MyHistory;
