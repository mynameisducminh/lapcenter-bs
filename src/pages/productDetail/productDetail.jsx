import React, { useEffect, useState } from "react";
import Narbar from "../../components/nabar";
import "./productDetail.scss";
import { Button, Spinner, Modal } from "react-bootstrap";
import Footer from "../../components/footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SameCard from "../../components/SameCard";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default function ProductDetail() {
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [productsBrand, setProductsBrand] = useState();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const isLogin = localStorage.getItem("customerName");
  const userId = localStorage.getItem("userId");
  const [modalConfirm, setModalConfirm] = useState(false);
  const [message, setMessage] = useState();
  console.log("product id: ", state.id);

  //callAPI
  const getProductId = () => {
    setLoading(true);
    axios
      .get(
        `https://lap-center.herokuapp.com/api/product/getProductById/${state  .id}`
      )
      .then(function (response) {
        const data = response.data.response;
        console.log("SUCCESS: ", data);
        setProduct(data);
        setLoading(false);
        setImage(data.images[0]);
      })
      .catch(function (error) {
        setLoading(false);
        console.log("ERROR: ", error);
      })
      .then(function () {});
  };

  const getProductBrand = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/product`, {
        params: {
          productBrand: state.brand,
        },
      })
      .then(function (response) {
        console.log("SUCCESS 1: ", response.data);
        setProductsBrand(response.data.products);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log("ERROR 1: ", error);
      });
  };

  const handleAddToCart = () => {
    setLoading(true);
    axios
      .post("https://lap-center.herokuapp.com/api/cart/addProductToCart", {
        userId: userId,
        // productId: state.id,
        productId: product._id,
        productName: product.name,
        productBrand: product.brand,
        image: image,
        // image: product.images[0],
        price: product.price
        })
      .then((res) => {
        setModalConfirm(true);
        console.log("SUCCESS")
        setMessage("Thêm đơn hàng thành công");
        setLoading(false);
      })
      .catch((err) => {
        setModalConfirm(true);
        console.log("ERROR")
        setMessage("Thêm đơn hàng thất bại");
        setLoading(false);
      });
    // setModalShow(false);
  };

  useEffect(() => {
    getProductId();
    getProductBrand();
    console.log("ham nay chay 1 lan duy nhat");
  }, [location]);

  return (
    <>
      <Narbar />
      {!loading ? (
        <div>
          <div className="productDetailcontainer">
            <div className="title">
              <h3>{product?.name}</h3>
              <span>Tình trạng: còn hàng</span>
              <span className="mx-4">Bảo hành: 24 tháng</span>
            </div>
            <hr />
            <div className="info row">
              <div className="productImage col">
                <img src={image} alt="" className="image" />
                <div className="text-center">
                  {product?.images.length > 0 &&
                    product?.images.map((item, index) => (
                      <img
                        src={item}
                        alt=""
                        className="imgSmail"
                        key={index}
                        onClick={() => setImage(item)}
                      />
                    ))}
                </div>
              </div>
              <div className="price col">
                <span>Giá bán</span>{" "}
                <span className="amount">{product?.price} VND</span>
                <div className="gift">Khuyến mãi: Quà tặng</div>
                <div className="gitInfo">Thông tin quà tặng</div>
                <div className="text-center">
                  <Button
                    className="my-4 bg-danger"
                    onClick={() => {
                      navigate(`/buy/${product._id}`, {
                        state: { id: product._id },
                      });
                    }}
                  >
                    Mua Ngay
                  </Button>
                  <br />
                  {isLogin && (
                    <Button className="my-4 bg-success" onClick={handleAddToCart}>
                      Thêm vào giỏ hàng
                    </Button>
                  )}
                  <br />
                  <span>
                    Gọi ngay{" "}
                    <span className="text-danger h4">036 879 6524</span> để giữ
                    hàng
                  </span>
                </div>
              </div>
              <div className="contact col">
                <b>Điện thoại tư vấn - Đặt hàng</b>
                <ul>
                  <li>Thành Đạt: 19001098</li>
                  <li>Đức Minh: 19008198</li>
                  <li>Trung Tuấn: 18992233</li>
                </ul>
                <b>Địa chỉ mua hàng</b>
                <ul>
                  <li>Đà Nẵng: 179 Nguyẽn Văn Linh</li>
                  <li>Huế: 89 Hùng Vương</li>
                  <li>Laos: 89 Lê Đình Lý</li>
                </ul>
              </div>
            </div>
            <hr />
            <table className="table my-5 table-secondary ">
              <thead>
                <tr>
                  <th scope="col">PHẦN CỨNG</th>
                  <th scope="col">THÔNG SỐ KỸ THUẬT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Model</td>
                  <td>{product?.model}</td>
                </tr>
                <tr>
                  <td>CPU</td>
                  <td>{product?.cpu}</td>
                </tr>
                <tr>
                  <td>RAM</td>
                  <td>{product?.ram}</td>
                </tr>
                <tr>
                  <td>Ổ cứng</td>
                  <td>{product?.disk}</td>
                </tr>
                <tr>
                  <td>CARD đồ họa</td>
                  <td>{product?.card}</td>
                </tr>
                <tr>
                  <td>Màn hình</td>
                  <td>{product?.monitor}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-danger h5">Sản phẩm cùng thương hiệu </p>
            <hr />
          </div>
          <Carousel responsive={responsive}>
            {productsBrand?.length > 0 &&
              productsBrand?.map((item, index) => (
                <SameCard product={item} key={index} />
              ))}
          </Carousel>
        </div>
      ) : (
        <div className="text-center">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
      )}
      <Footer />
      
      <Modal
        show={modalConfirm}
        onHide={() => setModalConfirm(false)}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thông báo đơn hàng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalConfirm(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
