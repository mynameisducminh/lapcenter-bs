import React from "react";
import { Button } from "react-bootstrap";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const product1 = require("../../assets/imgs/imgs.jpg");

export default function Card({ product }) {
  const navigate = useNavigate();
  // const url = product && product?.images[0]
  return (
    <div className="card-product pb-3 pt-2 my-4 mx-2" title={product.name}>
      <img className="image" src={product.images[0]} alt="" />
      <div className="info-product mx-3 ">
        <h5 className="nameCard">{product.name}</h5>
        <p>Hãng: {product.brand}</p>
        <p className="chipCard">Chip:{product.cpu}</p>
        <p>Giá: {product.price}</p>
      </div>
      <div className="btn-view">
        <Button
          variant="primary"
          onClick={() => {
            navigate(`/product/${product._id}`, {
              state: { id: product._id, brand: product.brand },
            });
          }}
        >
          Xem sản phẩm
          <i class="fa-solid fa-eye"></i>
        </Button>
      </div>
    </div>
  );
}
