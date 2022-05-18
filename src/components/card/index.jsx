import React from "react";
import { Button } from "react-bootstrap";
import "./styles.scss";

const product1 = require("../../assets/imgs/imgs.jpg");

export default function Card() {
  return (
    <div className="card-product pb-3 pt-2 my-4 mx-2">
      <img className="image" src={product1} alt="" />
      <div className="info-product mx-3 ">
        <h5><b>TELEPHONE</b></h5>
        <p>Hãng: OPPO</p>
        <p>Chip: helio</p>
        <p>Giá: 10 man</p>
      </div>
      <div className="btn-view">
        <Button variant="primary">Xem Sản Phẩm</Button>
      </div>
    </div>
  );
}
