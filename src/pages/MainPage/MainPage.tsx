import React, { useEffect } from "react";
import axios from "../../api/axios";
import requests from "../../api/requests";
import { Breadcrumb, Pagination } from "antd";
import { Content } from "antd/es/layout/layout";
import Pokemon from "./Pokemon/Pokemon";
import { useDispatch, useSelector } from "react-redux";
import { setAllPokemon } from "../../store/allPokemonSlice";
import { setShowPokemon } from "../../store/pokemonSlice";
import { AppDispatch, RootState } from "../../store";

interface resultsType {
  name: string;
  url: string;
}

const MainPage = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { showPoke } = useSelector((state: RootState) => state.pokemon);
  const { allPoke } = useSelector((state: RootState) => state.allPokemon);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async (): Promise<void> => {
    const { data } = await axios.get(`${requests.fetchPokemon}`);
    dispatch(setAllPokemon(data.results));
    const show = data.results.filter(
      (value: resultsType, i: number) => i + 1 <= 20
    );
    dispatch(setShowPokemon(show));
  };

  const renderPokemon = () => {
    const a = showPoke.map((poke) => <Pokemon key={poke.name} poke={poke} />);
    return a;
  };

  const onChangePage = (page: number) => {
    const limit = page * 20;
    const show = allPoke.slice(limit - 20, limit);
    dispatch(setShowPokemon(show));
  };

  return (
    <Content
      style={{
        padding: "0 48px",
        alignItems: "center",
        maxWidth: "1440px",
        margin: "0 auto",
      }}
    >
      <Breadcrumb
        items={[{ title: "Home" }]}
        style={{ margin: "16px 0" }}
      ></Breadcrumb>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "6px",
          height: "90%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr 1fr",
          marginBottom: "10px",
          overflow: "hidden",
        }}
      >
        {showPoke && renderPokemon()}
      </div>
      {allPoke && (
        <Pagination
          defaultCurrent={1}
          align="center"
          pageSize={20}
          total={allPoke.length}
          showSizeChanger={false}
          showQuickJumper
          onChange={(page) => onChangePage(page)}
        />
      )}
    </Content>
  );
};

export default MainPage;
