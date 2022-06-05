import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Narbar from "../../components/nabar";
import "./register.scss";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();

  const handleChane = (val, field) => {
    if (field === "username") {
      setUsername(val);
    }
    if (field === "password") {
      setPassword(val);
    } else {
      setConfirmpassword(val);
      console.log("CONFIRMPASWORD: ", val);
    }
  };

  const handleRegister = () => {
    alert("Tạo tài khoản thành công");
    navigate("/login");
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
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => handleChane(e.target.value, "username")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => handleChane(e.target.value, "password")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Confirm Password
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="Confirm Password"
                placeholder="Confirm Password"
                onChange={(e) => handleChane(e.target.value, "confirmpassword")}
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
