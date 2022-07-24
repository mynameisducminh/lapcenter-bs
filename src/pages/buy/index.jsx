import React, {useState} from "react";
import "./styles.scss";
import Narbar from "../../components/nabar";
import { Form, Col, Row, Button } from "react-bootstrap";

const BuyNow = () => {
  const img =
    "https://fptshop.com.vn/Uploads/Originals/2021/2/22/637496003345935125_dell-vostro-v3500-den-dd.jpg";
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddess] = useState();

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
          <img src={img} alt="" width={90} height={70} />
          <p> Tên sản phẩm</p>
          <div>
            <Button variant="info" className="mx-2 px-2">
              <i class="fa-solid fa-minus" />
            </Button>{" "}
            <input type="NUMBER" className="inp" />
            <Button variant="info" className="mx-2">
              <i class="fa-solid fa-plus" />
            </Button>{" "}
          </div>
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
            <Button variant="success">Đặt hàng</Button>{" "}
          </div>
        </Form>
      </div>
    </div>
  );
};
export default BuyNow;
