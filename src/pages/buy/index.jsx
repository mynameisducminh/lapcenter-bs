import React, { useState, useEffect } from "react";
import "./styles.scss";
import Narbar from "../../components/nabar";
import { Form, Col, Row, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Footer from "../../components/footer";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const BuyNow = () => {
  const img =
    "https://fptshop.com.vn/Uploads/Originals/2021/2/22/637496003345935125_dell-vostro-v3500-den-dd.jpg";
  const { state } = useLocation();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddess] = useState();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalprice, setTotalprice] = useState(0);
  const [product, setProduct] = useState();
  const [image, setImage] = useState("");
  console.log("STATE ID: ", state.id);
  const [modalShow, setModalShow] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [message, setMessage] = useState();

  const getProductId = () => {
    setLoading(true);
    axios
      .get(
        `https://lap-center.herokuapp.com/api/product/getProductById/${state?.id}`
      )
      .then(function (response) {
        const data = response.data.response;
        console.log("SUCCESS: ",response );
        setProduct(data);
        setLoading(false);
        setImage(data?.images[0]);
        setTotalprice(1 * data.price);
      })
      .catch(function (error) {
        setLoading(false);
        console.log("ERROR: ", error);
      })
      .then(function () {});
  };
  console.log("state: ", state);

  const handleChane = (val, field) => {
    if (field === "name") {
      setName(val);
    }
    if (field === "address") {
      setAddess(val);
    }
    if (field === "email") {
      setEmail(val);
    }
    if (field === "phone") {
      setPhone(val);
    }
  };

  const handleChangeQuantity = (val) => {
    const value = parseInt(val);
    if (value < 1) {
      setQuantity(1);
      setTotalprice(1 * product?.price);
    } else {
      setQuantity(val);
      setTotalprice(val * product?.price);
    }
  };

  const handleUpOrDownQuantity = (method) => {
    if (method === "plus") {
      setQuantity(quantity + 1);
      setTotalprice((quantity + 1) * product?.price);
    } else {
      if (quantity < 2) {
        setQuantity(1);
      } else {
        setQuantity(quantity - 1);
        setTotalprice((quantity - 1) * product?.price);
      }
    }
  };

  const handleOrderProduct = () => {
    setLoading(true);
    axios
      .post("https://lap-center.herokuapp.com/api/order/addOrder", {
        customerName: name,
        phone: phone,
        email: email,
        address: address,
        productName: product?.name,
        productBrand: product?.brand,
        quantity: quantity,
        orderStatus: 1,
      })
      .then((res) => {
        setModalConfirm(true);
        setMessage("Tạo đơn hàng thành công");
        setLoading(false);
      })
      .catch((err) => {
        setModalConfirm(true);
        setMessage("Tạo đơn hàng thất bại");
        setLoading(false);
      });
    setModalShow(false);
  };

  useEffect(() => {
    console.log("ham nay chay dau tien");
    getProductId();
  }, []);

  let checkInfo = false;
  if (!name || !phone || !email || !address) checkInfo = false;
  if (name && phone && email && address) checkInfo = true;

  return (
    <div className="buyContainer">
      <Narbar />
      {!loading ? (
        <div className="content">
          <b className="text-danger mt-2">Để đặt hàng</b>
          <span className="mt-2">
            , quý khách hàng vui lòng kiểm tra sản phẩm, số lượng, giá, màu sắc
            và điền các thông tin dưới đây:
          </span>
          <div className="d-flex justify-content-between mt-4">
            <img src={image} alt="" width={90} height={70} />
            <p className="h5 fw-bold mt-3">{product?.name}</p>
            <div>
              <Button
                variant="info"
                className="mx-2 px-2"
                onClick={() => handleUpOrDownQuantity("minus")}
              >
                <i class="fa-solid fa-minus" />
              </Button>{" "}
              <input
                type="number"
                className="inp"
                value={quantity}
                onChange={(e) => handleChangeQuantity(e.target.value)}
              />
              <Button
                variant="info"
                className="mx-2"
                onClick={() => handleUpOrDownQuantity("plus")}
              >
                <i class="fa-solid fa-plus" />
              </Button>{" "}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div />
            <p className="fw-bold">{product?.price} VND</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="fw-bold">Tổng tiền</p>
            <p className="fw-bold text-danger h6 ">{totalprice} VND</p>
          </div>

          <Form className="mt-5 order">
            <Form.Group
              as={Row}
              className="mb-3 d-flex justify-content-between"
              controlId="formPlaintextEmail"
            >
              <Col sm="12">
                <Form.Label>Họ và tên khách hàng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Họ và tên khách hàng"
                  value={name}
                  onChange={(e) => handleChane(e.target.value, "name")}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 d-flex justify-content-between"
              controlId="formPlaintextPassword"
            >
              <Col sm="12">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => handleChane(e.target.value, "email")}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 d-flex justify-content-between"
              controlId="formPlaintextEmail"
            >
              <Col sm="12">
                <Form.Label>Số điện thoại khách hàng</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Số điện thoại khách hàng"
                  value={phone}
                  onChange={(e) => handleChane(e.target.value, "phone")}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 d-flex justify-content-between"
              controlId="formPlaintextEmail"
            >
              <Col sm="12">
                <Form.Label>Địa Chỉ nhận hàng</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  placeholder="Địa Chỉ nhận hàng"
                  value={address}
                  onChange={(e) => handleChane(e.target.value, "address")}
                />
              </Col>
            </Form.Group>
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="success"
                className="mb-5"
                disabled={!checkInfo}
                onClick={() => setModalShow(true)}
              >
                Đặt hàng
              </Button>{" "}
            </div>
          </Form>
        </div>
      ) : (
        <div className="loading">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
      )}
      <Footer />;
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
          <div className="d-flex">
            <div>
              <img src={image} alt="" height={160} width={200} />
            </div>
            <div>
              <div>
                <h5> Thông tin sản phẩm</h5>
                <span className="ml-2">Tên sản phẩm: </span>
                <span className="fw-bold">{product?.name}</span>
                <br />
                <span className="ml-2">Hang: </span>
                <span className="fw-bold">{product?.brand}</span>
                <br />
                <span className="fw-bold">So luong: </span>
                <br />
                <span className="ml-2">Tong thanh toan: </span>
                <span className="fw-bold">{totalprice} VND</span>
              </div>
              <div>
                <h5> Thong tin khach hang</h5>
                <span className="ml-2">Ten khach hang: </span>
                <span className="fw-bold">{name}</span>
                <br />
                <span className="ml-2">So dien thoai: </span>
                <span className="fw-bold">{phone}</span>
                <br />
                <span className="ml-2">Email: </span>
                <span className="fw-bold">{email}</span>
                <br />
                <span className="ml-2">Dia chi nhan hang: </span>
                <span className="fw-bold">{address}</span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleOrderProduct}>Xác nhận</Button>
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
    </div>
  );
};
export default BuyNow;
