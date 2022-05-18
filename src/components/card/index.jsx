import React from "react";
import { Button } from "react-bootstrap";
import "./styles.scss";

const product1 = require("../../assets/imgs/imgs.jpg");

export default function Card({ product }) {
  console.log("PRODUCT: ", product);
  return (
    <div className="card-product pb-3 pt-2 my-4 mx-2">
      <img className="image" src={product.image} alt="" />
      <div className="info-product mx-3 ">
        <h5>{product.name}</h5>
        <p>Hãng: {product.brand}</p>
        <p>Chip:{product.chip}</p>
        <p>Giá: {product.price}</p>
      </div>
      <div className="btn-view">
        <Button variant="primary">Xem Sản Phẩm</Button>
      </div>
    </div>
  );
}
