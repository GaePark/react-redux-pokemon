import { Outlet, Route, Routes } from "react-router";
import "./App.css";
import DetailPage from "./pages/DetailPage/DetailPage";
import Nav from "./components/Nav";
import MainPage from "./pages/MainPage/MainPage";
import { Layout } from "antd";
import FooterComponent from "./components/FooterComponent";

const DefaultSetting = () => {
  return (
    <Layout style={{ height: "100vh", minHeight: "1100px" }}>
      <Nav />
      <Outlet />
      <FooterComponent />
    </Layout>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultSetting />}>
        <Route index element={<MainPage />} />
        <Route path=":Id" element={<DetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
