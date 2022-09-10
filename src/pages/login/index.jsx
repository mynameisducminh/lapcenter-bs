import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Narbar from "../../components/nabar";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import iconHome from "../../assets/imgs/iconHome.png";
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
    axios
      .post(url, {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log("SUCCESS: ", response.data);
        //localStorage gồm 4 functions chính:
        // - setItem => dùng để đặt tên biến và giá trị
        // - getItem => dùng để lấy giá trị cần lấy
        // - removeItem => xóa tên biến và giá trị cúa biển đó ra khỏi store
        // - clear => xóa tất cả các biến và giá trị của nó khỏi store
        localStorage.setItem("customerName", response.data.userName);
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("isAdmin", response.data?.isAdmin);
        navigate("/");
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
        alert("tên tài khoản hoặc mật khẩu không đúng vui lòng thử lại!!!");
      });
  };

  return (
    <div className="logincontainer">
      <img
        src={iconHome}
        alt=""
        width={45}
        height={45}
        className="iconHome"
        title="Trang chủ"
        onClick={() => navigate("/")}
      />
      <div className="formlogin">
        <h2>Đăng Nhập</h2>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextEmail"
          >
            <Col sm="12">
              <Form.Label>Email hoặc số điện thoại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email hoặc số điện thoại"
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
            <Col sm="12">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
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
            <a onClick={() => navigate("/register")}>
              {" "}
              <i>Tạo tài khoản mới</i>
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
}
