import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Narbar from "../../components/nabar";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import iconHome from "../../assets/imgs/iconHome.png"

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const handleChane = (val, field) => {
    if (field === "name") {
      setName(val);
    }
    if (field === "password") {
      setPassword(val);
    }
    if (field === "email") {
      setEmail(val);
    }
    if (field === "phone") {
      setPhone(val);
    }
  };
  const handleRegister = () => {
    const url = "https://lap-center.herokuapp.com/api/register";
    axios
      .post(url, {
        name: name,
        email: email,
        phone: phone,
        password: password,
      })
      .then(function (response) {
        console.log("SUCCESS: ", response.data);
        navigate("/login");
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
        alert("Lỗi đăng lý xin vui lòng thử lại!!!");
      });
  };
  return (
    <div className="register-container">
      {/* <Narbar /> */}
      <img src={iconHome} alt="" width={45} height={45} className='iconHome' title='Trang chủ' onClick={() => navigate('/')}/>
      <div className="form-register">
        <h2>Đăng Ký</h2>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextEmail"
          >
            <Col sm="12">
            <Form.Label>
              Tên khách hàng
            </Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên khách hàng"
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
            <Form.Label>
            Email hoặc số điện thoại
            </Form.Label>
              <Form.Control
                type="text"
                placeholder="Email hoặc số điện thoại"
                value={email}
                onChange={(e) => handleChane(e.target.value, "email")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Col sm="12">
            <Form.Label>
              Số điện thoại
            </Form.Label>
              <Form.Control
                type="text"
                value={phone}
                placeholder="Số điện thoại"
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
            <Form.Label column sm="3">
              Mật khẩu
            </Form.Label>
              <Form.Control
                type="Password"
                placeholder="Mật khẩu"
                onChange={(e) => handleChane(e.target.value, "password")}
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="success" onClick={handleRegister}>
              Đăng Ký
            </Button>{" "}
          </div>
        </Form>
      </div>
    </div>
  );
}
