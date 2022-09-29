import React, { useState, useEffect } from "react";
import { useNavigate, navigate } from "react-router-dom";
import Narbar from "../../../components/nabar";
import "./styles.scss";
import { Spinner, Button } from "react-bootstrap";
import iconCart from "../../../assets/imgs/carts.png";
import iconDelete from "../../../assets/imgs/delete.png";
import iconEye from "../../../assets/imgs/eye.png";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

const Orders = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const user = localStorage.getItem("customerName");
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");
  const [product, setProduct] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [dataItem, setDataItem] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [modalConfirm, setModalConfirm] = useState(false);
  const [message, setMessage] = useState();

  const handleChooseItem = (item) => {
    setDataItem(item);
    setModalShow(true);
    setSelectedStatus(item.orderStatus);
  };

  const handleSelectChange = (event) => {
    //parseInt => chuyển kiểu dữ liệu từ string sang number (integer)
    setSelectedStatus(parseInt(event.target.value));
    console.log(parseInt(event.target.value));
  };

  const handleUpdateOderStatus = () => {
    setLoading(true);
    axios
      .patch(
        `https:lap-center.herokuapp.com/api/order/editOrderStatus/${dataItem._id}`,
        {
          orderStatus: selectedStatus,
        }
      )
      .then(function (response) {
        setModalConfirm(true);
        setLoading(false);
        setMessage("Cập nhật trạng thái đơn hàng thành công!");
        console.log(response);
        setModalShow(false);
        fetchAPI();
      })
      .catch(function (error) {
        setModalConfirm(true);
        setLoading(false);
        setMessage("Cập nhật trạng thái đơn hàng không thành công!");
        setModalShow(false);
        console.log(error);
      });
  };

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
      })
      .catch(function (error) {
        // handle error
        console.log("ERROR: ", error);
      });
  };

  const handDelete = (orderId) => {
    console.log("ORDERID: ", orderId);
    setLoading(true);
    axios
      .delete(
        `https://lap-center.herokuapp.com/api/order/removeOrder/${orderId}`
      )
      .then(function (response) {
        setLoading(false);
        setModalConfirm(true);
        setMessage("Đã xóa sản phẩm khỏi danh sách đơn hàng.");
        fetchAPI();
      })
      .catch(function (error) {
        setLoading(false);
        setModalConfirm(true);
        setMessage("Lỗi. Không thể xóa sản phẩm khỏi danh sách đơn hàng.");
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
              <p className="tbh-name mx-2">Tên khách hàng</p>
              <p className="tbh-brand">Tên sản phẩm</p>
              <p className="tbh-price">Số lượng</p>
              <p className="tbh-price">Trạng thái</p>
              <p className="tbh-actions">Hành động</p>
            </div>
            {data?.map((item) => (
              <div className="d-flex tb-body fw-bold justify-content-between border-top-0">
                <p className="tbh-name mt-2 mx-2">{item?.customerName}</p>
                <p className="tbh-brand mt-2">{item?.productName}</p>
                <p className="tbh-price mt-2">{item?.quantity}</p>
                <p
                  className={`tbh-price mt-2 ${handleShowColorOrderStatus(
                    item?.orderStatus
                  )}`}
                >
                  {handleShowOrdersStatus(item?.orderStatus)}
                </p>

                <div className="tbh-actions mt-2 d-flex">
                  <div
                    className="bg-icon mx-2"
                    onClick={() => handDelete(item?._id)}
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
                    onClick={() => handleChooseItem(item)}
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
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-danger"
          >
            Xác nhận thông tin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="d-flex">
              <p>Tên khách hàng:</p>
              <span className="mx-2 fw-bold">{dataItem?.customerName}</span>
            </div>
            <div className="d-flex">
              <p>Tên sản phẩm:</p>
              <span className="mx-2 fw-bold">{dataItem?.productName}</span>
            </div>
            <div className="d-flex">
              <p>Hãng:</p>
              <span className="mx-2 fw-bold">{dataItem?.productBrand}</span>
            </div>
            <div className="d-flex">
              <p>Số lượng:</p>
              <span className="mx-2 fw-bold"> {dataItem?.quantity}</span>
            </div>
            <div className="d-flex">
              <p>Số điện thoại:</p>
              <span className="mx-2 fw-bold">{dataItem?.phone}</span>
            </div>
            <div className="d-flex">
              <p>Địa chỉ:</p>
              <span className="mx-2 fw-bold">{dataItem?.address}</span>
            </div>
            <div className="d-flex">
              <p>Trạng thái đơn hàng:</p>
              <select
                value={selectedStatus}
                onChange={handleSelectChange}
                className="select-status mx-2"
              >
                <option value="1">Vừa đặt hàng</option>
                <option value="2">Đang giao hàng</option>
                <option value="3">Đã nhận hàng</option>
                <option value="4">Gửi trả hàng</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-succes" onClick={handleUpdateOderStatus}>
            {/* <Button className="btn-succes" onClick={handleSelectChange}> */}
            Cập nhật
          </Button>
          <Button className="btn-light" onclick={() => null}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalConfirm}
        onHide={() => setModalConfirm(false)}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thông báo đơn hàng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalConfirm(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Orders;
