import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Narbar from "../../components/nabar";
import "./styles.scss";

export default function Login() {
  return (
    <div className="logincontainer">
      <Narbar />
      <div className="formlogin">
        <h2>Dang Nhap</h2>
        <Form>
          <Form.Group as={Row} className="mb-3 d-flex justify-content-between" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="9">
              <Form.Control type="text" placeholder="Username" />
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
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="success">Dang Nhap</Button>{" "}
          </div>
        </Form>
      </div>
    </div>
  );
}
