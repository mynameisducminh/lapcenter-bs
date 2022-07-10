import React, { useState, useEffect } from "react";
import Card from "../../components/card";
import Narbar from "../../components/nabar";
import { data } from "../../data";
import { Form, Button, Spinner } from "react-bootstrap";
import "./styles.scss";
import axios from "axios";
import Footer from "../../components/footer";
import ReactPaginate from "react-paginate";

export default function Home() {
  const [list, setlist] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("ham nay chay dau tien");
    // fetchAPI();
    fetchAxios();
  }, []);

  const fetchAPI = () => {
    fetch("https://reqres.in/api/users/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const fetchAxios = () => {
    setLoading(true);

    axios
      .get("https://lap-center-v1.herokuapp.com/api/product")
      .then(function (response) {
        console.log("SUCCESS: ", response.data);
        setLoading(false);
        setlist(response.data.products);
      })
      .catch(function (error) {
        setLoading(false);
        console.log("ERROR: ", error);
      })
      .then(function () {});
  };

  const handleChange = (val) => {
    console.log("val: ", val);
    setSearch(val);
  };

  const onSubmitSearch = () => {
    handleCallApi(search, brand, price);
  };

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setBrand(val);

    handleCallApi(search, val, price);
  };

  const sortPrice = (e) => {
    const val = e.target.value;
    setPrice(val);

    handleCallApi(search, brand, val);
  };

  const handleCallApi = (productName, productBrand, priceSort) => {
    setLoading(true);
    axios
      .get(`https://lap-center-v1.herokuapp.com/api/product`, {
        params: {
          productName: productName,
          productBrand: productBrand,
          orderByColumn: "price",
          orderByDirection: priceSort,
        },
      })
      .then(function (response) {
        console.log("SUCCESS: ", response.data);
        setlist(response.data.products);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log("ERROR: ", error);
      });
  };

  return (
    <div className="homecontainer">
      <Narbar />
      <div className="content">
        <div className="menu_top">
          <div className="d-flex">
            <Form.Control
              type="text"
              id="hi"
              value={search}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              aria-describedby="passwordHelpBlock"
              className="inp"
              placeholder="Nhập tên sản phẩm"
            />
            <Button
              variant="primary "
              className="btnsearch"
              onClick={onSubmitSearch}
            >
              Tìm kiếm
              <i class="fa-solid fa-magnifying-glass"></i>
            </Button>{" "}
          </div>
          <div className="selectForm d-flex">
            <b className="txtFilter">Hãng</b>
            <select
              className="selectBox"
              value={brand}
              onChange={handleSelectChange}
            >
              <option selected value="">
                Tất cả
              </option>
              <option value="Asus">ASUS</option>
              <option value="Dell">DELL</option>
              <option value="Acer">ACER</option>
              <option value="Lenovo">LENOVO</option>
            </select>
          </div>
          <div className="selectForm d-flex">
            <b className="txtFilter">Giá</b>
            <select className="selectBox" value={price} onChange={sortPrice}>
              <option selected value="">
                Tất cả
              </option>
              <option value="asc">Từ thấp đến cao</option>
              <option value="desc">Từ cao đến thấp</option>
            </select>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-lg-around list_products">
          {!loading && list.length > 0 ? (
            list.map((item) => <Card product={item} key={item.id} />)
          ) : (
            <div className="text-center">
              <Spinner animation="grow" size="sm" />
              <Spinner animation="grow" size="sm" />
              <Spinner animation="grow" size="sm" />
            </div>
          )}
        </div>
        <div className="pagination">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={50}
            marginPagesDisplayed={2}
            pageRangeDisplayed={4}
            onPageChange={(e) => console.log("EEE:", e.selected + 1)}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
