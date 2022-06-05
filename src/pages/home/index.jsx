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
    axios
      .get("https://lap-center.herokuapp.com/api/product")
      .then(function (response) {
        // handle success
        console.log("SUCCESS: ", response.data);
        setlist(response.data.products)
      })
      .catch(function (error) {
        // handle error
        console.log('ERROR: ',error);
      })
      .then(function () {
        // always executed
      });
  };

  const handleChange = (val) => {
    console.log("val: ", val);
    setSearch(val);
    setlist(
      data.filter((item) =>
        item?.name?.toLowerCase()?.includes(val.toLowerCase())
      )
    );
  };

  const onSubmitSearch = () => {
    setlist(
      data.filter((item) =>
        item?.name?.toLowerCase()?.includes(search.toLowerCase())
      )
    );
  };

  const handleSelectChange = (e) => {
    setBrand(e.target.value);
    setlist(
      data.filter((item) =>
        item?.brand?.toLowerCase()?.includes(e.target.value.toLowerCase())
      )
    );
    console.log(e.target.value);
  };

  const sortPrice = (e) => {
    const val = e.target.value;
    setPrice(val);
    if (val === "1") {
      setlist(data.sort((a, b) => a.price - b.price));
    } else {
      setlist(data.sort((a, b) => b.price - a.price));
    }
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
            {/* <Button variant="primary " onClick={onSubmitSearch}>
              Tìm Kiếm <SearchOutlined />
            </Button>{" "} */}
            <Button variant="primary " onClick={onSubmitSearch}>
              Search <SearchOutlined />
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
              <option value="1">Từ thấp đến cao</option>
              <option value="2">Từ cao đến thấp</option>
            </select>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-lg-around list_products">
          {list.map((item) => (
            <Card product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
