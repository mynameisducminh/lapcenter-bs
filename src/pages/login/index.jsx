import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Narbar from "../../components/nabar";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const fakeAccount = { username: "admin", password: "admin" };

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleChane = (val, field) => {
    if (field === "username") {
      setUsername(val);
      console.log("USERNAME: ", val);
    } else {
      setPassword(val);
      console.log("PASSWORD: ", val);
    }
  };

  const handleLogin = () => {
    const url = "https://lap-center.herokuapp.com/api/login";
    // if (
    //   username === fakeAccount.username &&
    //   password === fakeAccount.password
    // ) {
    //   console.log("ĐĂNG NHẬP THÀNH CÔNG");
    //   navigate("/");
    // } else {
    //   console.log("ĐĂNG NHẬP KHÔNG THÀNH CÔNG");
    //   alert("tên tài khoản hoặc mật khẩu không đúng vui lòng thử lại!!!");
    // }
    axios
      .post(url, {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log("SUCCESS: " ,response.data);
        navigate('/')
      })
      .catch(function (error) {
        console.log("ERROR: ",error);
        alert("tên tài khoản hoặc mật khẩu không đúng vui lòng thử lại!!!");
      });
  };

  return (
    <div className="logincontainer">
      <Narbar />
      <div className="formlogin">
        <h2>Đăng Nhập</h2>
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
                value={username}
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
                value={password}
                onChange={(e) => handleChane(e.target.value, "password")}
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="success" onClick={handleLogin}>
              Đăng Nhập
            </Button>{" "}
          </div>
          <div className="dk">
            <a onClick={() => navigate("/register")}>Tạo tài khoản mới</a>
          </div>
        </Form>
      </div>
    </div>
  );
}
