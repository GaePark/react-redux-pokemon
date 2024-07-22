import { Header } from "antd/es/layout/layout";
import React from "react";

const Nav = () => {
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    ></Header>
  );
};

export default Nav;
