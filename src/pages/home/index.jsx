import React, { useState, useEffect } from "react";
import Card from "../../components/card";
import Narbar from "../../components/nabar";
import { data } from "../../data";
import { Form, Button } from "react-bootstrap";
import "./styles.scss";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Home() {
  const [list, setlist] = useState(data);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    console.log("ham nay chay dau tien");
    // fetchAPI();
    // fetchAxios();
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
    axios
      .get("https://lap-center.herokuapp.com/api/product")
      .then(function (response) {
        console.log("SUCCESS: ", response.data);
        setlist(response.data.products);
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      })
      .then(function () {});
  };

  const handleChange = (val) => {
    console.log("val: ", val);
    setSearch(val);
    // setlist(
    //   data.filter((item) =>
    //     item?.name?.toLowerCase()?.includes(val.toLowerCase())
    //   )
    // );
  };

  const onSubmitSearch = () => {
    // axios
    //   .get("https://lap-center.herokuapp.com/api/product", {
    //     params: {
    //       productName: search,
    //       productBrand: brand,
    //       orderByColumn: "price",
    //       orderByDirection: price,
    //     },
    //   })

    //   .then(function (response) {
    //     console.log("SUCCESS: ", response.data);
    //     setlist(response.data.products);
    //   })
    //   .catch(function (error) {
    //     console.log("ERROR: ", error);
    //   })
    handleCallApi(search, brand, price);
  };

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setBrand(val);
    // axios
    //   .get(`https://lap-center.herokuapp.com/api/product`, {
    //     params: {
    //       productName: search,
    //       productBrand: val,
    //       orderByColumn: "price",
    //       orderByDirection: price,
    //     },
    //   })
    //   .then(function (response) {
    //     console.log("SUCCESS: ", response.data);
    //     setlist(response.data.products);
    //   })
    //   .catch(function (error) {
    //     console.log("ERROR: ", error);
    //   })
    handleCallApi(search, val, price);
  };

  const sortPrice = (e) => {
    const val = e.target.value;
    setPrice(val);
    // axios
    //   .get(
    //     `https://lap-center.herokuapp.com/api/product`,
    //     {
    //       params: {
    //         productName: search,
    //         productBrand: brand,
    //         orderByColumn: 'price',
    //         orderByDirection: val
    //       }
    //     }
    //   )
    //   .then(function (response) {
    //     console.log("SUCCESS: ", response.data);
    //     setlist(response.data.products);
    //   })
    //   .catch(function (error) {
    //     console.log("ERROR: ", error);
    //   })
    handleCallApi(search, brand, val);
  };

  const handleCallApi = (productName, productBrand, priceSort) => {
    axios
      .get(`https://lap-center.herokuapp.com/api/product`, {
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
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  };

  return (
    <div className="homecontainer">
      <Narbar />
      <div className="content">
        <div className="menu_left">
          <Form.Label htmlFor="inputPassword5">
            <b>Tim kiếm sản phẩm</b>
          </Form.Label>
          <div className="d-flex justify-content-between">
            <Form.Control
              type="text"
              id="hi"
              value={search}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              aria-describedby="passwordHelpBlock"
              className="inp"
            />
            <Button variant="primary " onClick={onSubmitSearch}>
            <SearchOutlined />
            </Button>{" "}
          </div>
          <div className="selectForm d-flex">
            <b>Hãng</b>
            <select
              className="selectBox"
              value={brand}
              onChange={handleSelectChange}
            >
              <option selected value=""></option>
              <option value="Asus">ASUS</option>
              <option value="Dell">DELL</option>
              <option value="Acer">ACER</option>
              <option value="Lenovo">LENOVO</option>
            </select>
          </div>
          <div className="selectForm">
            <b>Giá</b>
            <select className="selectBox" value={price} onChange={sortPrice}>
              <option selected value=""></option>
              <option value="asc">Từ thấp đến cao</option>
              <option value="desc">Từ cao đến thấp</option>
            </select>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-lg-around list_products">
          {list.map((item) => (
            <Card product={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
