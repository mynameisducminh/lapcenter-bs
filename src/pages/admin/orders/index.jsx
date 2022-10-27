import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, navigate } from "react-router-dom";
import Narbar from "../../../components/nabar";
import "./styles.scss";
import { Spinner } from "react-bootstrap";
// import iconCart from "../../../assets/imgs/carts.png";
import iconDelete from "../../../assets/imgs/delete.png";
import iconEye from "../../../assets/imgs/eye.png";
import axios from "axios";

const Orders = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const user = localStorage.getItem("customerName");
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");
  const [product, setProduct] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  console.log("asdashda", userId);
  console.log("12312", accessToken);

  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/order`)
      .then(function (response) {
        // handle success
        const data = response.data.orders;
        console.log("Orders : ", data);
        setData(data.reverse());
        setLoading(false);
        setTotalPage(response.data.totalPage);
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
  const handleShowOrdersStatus = (orderStatus) => {
    if (orderStatus === 1) {
      return "Vừa đặt hàng";
    }
    if (orderStatus === 2) {
      return "Đang giao hàng";
    }
    if (orderStatus === 3) {
      return "Đã nhận hàng";
    }
    if (orderStatus === 4) {
      return "Đã trả hàng";
    }
  };
  const handleShowColorOrderStatus = (orderStatus) => {
    if (orderStatus === 1) {
      return "text-success";
    }
    if (orderStatus === 2) {
      return "text-primary";
    }
    if (orderStatus === 3) {
      return "text-info";
    }
    if (orderStatus === 4) {
      return "text-danger";
    }
  };
  const handleChangePage = (pageNumber) => {
    console.log("PAGE NUMBER: ", pageNumber);
    setLoading(true);
    setPage(pageNumber);

    axios
      .get(
        `https://lap-center.herokuapp.com/api/order?pageSize=24&pageNumber=${pageNumber}`
      )
      .then(function (response) {
        console.log("SUCCESS: ", response.data);
        setLoading(false);
        setData(response.data.orders);
        setTotalPage(response.data.totalPage);
      })
      .catch(function (error) {
        setLoading(false);
        console.log("ERROR: ", error);
      })
      .then(function () {});
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <Narbar />
      <div className="ordersContainer">
        <h3 className="text-center my-4">Quản lý đơn hàng</h3>
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
              <p className="tbh-name">Tên khách hàng</p>
              <p className="tbh-brand">Tên sản phẩm</p>
              <p className="tbh-price">Số lượng</p>
              <p className="tbh-price">Trạng thái</p>
              <p className="tbh-actions">Hành động</p>
            </div>
            {data?.map((item) => (
              <div className="d-flex tb-body fw-bold justify-content-between border-top-0">
                <p className="tbh-name mt-2">{item.customerName}</p>
                <p className="tbh-brand mt-2">{item.productName}</p>
                <p className="tbh-price mt-2">{item.quantity}</p>
                <p
                  className={`tbh-price mt-2 ${handleShowColorOrderStatus(
                    item.orderStatus
                  )}`}
                >
                  {handleShowOrdersStatus(item.orderStatus)}
                </p>

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
                  <div
                    className="bg-icon"
                    onClick={() => {
                      navigate(`/buy/${item._id}`, {
                        state: { id: item._id },
                      });
                    }}
                  >
                    <img
                      className="icon"
                      src={iconEye}
                      alt=""
                      width={25}
                      height={25}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="my-5" />
            {data?.length === 0 && (
              <div className="text-center mt-2">
                <p>Không có sản phẩm nào trong giỏ hàng!!!</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div div className="pagination">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}lable
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={(e) => handleChangePage(e.selected + 1)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default Orders;
