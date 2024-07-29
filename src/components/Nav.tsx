import { Header } from "antd/es/layout/layout";
import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const onClickHome = (): void => {
    navigate("/");
    window.location.reload();
  };
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
    >
      <img
        src="./react-redux-pokemon/images/pngegg.png"
        alt="logo"
        style={{ height: "100%", cursor: "pointer" }}
        onClick={onClickHome}
      />
    </Header>
  );
};

export default Nav;
