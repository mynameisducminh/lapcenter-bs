import React, { useState, useEffect } from "react";
import "./styles.scss";
import Narbar from "../../components/nabar";
import { Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import Footer from "../../components/footer";

const BuyNow = () => {
  const img =
    "https://fptshop.com.vn/Uploads/Originals/2021/2/22/637496003345935125_dell-vostro-v3500-den-dd.jpg";
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddess] = useState();
  const [quantity, setQuantity] = useState(1);

  const [totalprice, setTotalprice] = useState(0);
  const [product, setProduct] = useState();
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);

  const getProductId = () => {
    // setLoading(true);
    axios
      .get(
        `https://lap-center-v1.herokuapp.com/api/product/getProductById/60c07aaea1364c3894ac0b51`
      )
      .then(function (response) {
        const data = response.data.response;
        console.log("SUCCESS: ", data);
        setProduct(data);
        // setLoading(false);
        setImage(data.images[0]);
        setTotalprice(1 * data.price);
      })
      .catch(function (error) {
        // setLoading(false);
        console.log("ERROR: ", error);
      })
      .then(function () {});
  };

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

  useEffect(() => {
    console.log("ham nay chay dau tien");
    getProductId();
  }, []);

  return (
    <div className="buyContainer">
      <Narbar />
      <div className="content">
        <b className="text-danger mt-2">Để đặt hàng</b>
        <span className="mt-2">
          , quý khách hàng vui lòng kiểm tra sản phẩm, số lượng, giá, màu sắc và
          điền các thông tin dưới đây:
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

        <Form>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextEmail"
          >
            <Col sm="12">
              <Form.Label>Họ và tên khách hàng</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
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
                as="textarea"
                rows={1}
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
                as="textarea"
                rows={1}
                type="text"
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
            <Button variant="success" disabled={disable}>Đặt hàng</Button>{" "}
          </div>
        </Form>
      </div>
    </div>
  );
};
<Footer />;
export default BuyNow;