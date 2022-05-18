import React from "react";
import Card from "../../components/card";
import Narbar from "../../components/nabar";

export default function Home() {
  return (
    <div>
      <Narbar />
      <div><h1><b>Home</b></h1></div>
      <div className="d-flex flex-wrap justify-content-lg-around">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
