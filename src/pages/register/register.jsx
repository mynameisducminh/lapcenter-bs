import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Narbar from "../../components/nabar";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      <Narbar />
      <div className="form-register">
        <h2>Đăng Ký</h2>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="3">
              Customer's name
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) => handleChane(e.target.value, "name")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="3">
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Email"
                onChange={(e) => handleChane(e.target.value, "email")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="3">
              Phone
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Phone"
                onChange={(e) => handleChane(e.target.value, "phone")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="3">
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="Password"
                placeholder="Password"
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
