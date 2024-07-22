import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import requests from "../../api/requests";
import { GetProps as AntProps, Input, Pagination, Tooltip } from "antd";
import { Content } from "antd/es/layout/layout";
import Pokemon from "./Pokemon/Pokemon";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllPokemon,
  setSearchPokemon,
  setTooltipPokemon,
} from "../../store/allPokemonSlice";
import { setSearchShowPokemon, setShowPokemon } from "../../store/pokemonSlice";
import { AppDispatch, RootState } from "../../store";
import Search from "antd/es/input/Search";

interface resultsType {
  name: string;
  url: string;
}

type SearchProps = AntProps<typeof Input.Search>;

const MainPage = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState(false);
  const [temporary, setTemporary] = useState<resultsType[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const { showPoke } = useSelector((state: RootState) => state.pokemon);
  const { searchShowPoke } = useSelector((state: RootState) => state.pokemon);
  const { allPoke } = useSelector((state: RootState) => state.allPokemon);
  const { tooltipPoke } = useSelector((state: RootState) => state.allPokemon);
  const { searchPoke } = useSelector((state: RootState) => state.allPokemon);

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
    setLoading(false);
  };

  const renderPokemon = (): React.ReactNode =>
    showPoke.map((poke) => <Pokemon key={poke.name} poke={poke} />);

  const renderSearchPokemon = (): React.ReactNode =>
    searchShowPoke.map((poke) => <Pokemon key={poke.name} poke={poke} />);

  const onChangePage = (page: number): void => {
    const limit = page * 20;
    const show = allPoke.slice(limit - 20, limit);
    dispatch(setShowPokemon(show));
  };

  const onChangeSearchPage = (page: number): void => {
    const limit = page * 20;
    const show = searchPoke.slice(limit - 20, limit);
    dispatch(setSearchShowPokemon(show));
  };

  const test = (): React.ReactNode => (
    <ul style={{ listStyle: "none" }}>
      {tooltipPoke.map((poke) => (
        <li
          key={poke.name}
          style={{ cursor: "pointer" }}
          onClick={() => onClickTest(poke.name)}
        >
          {poke.name}
        </li>
      ))}
    </ul>
  );

  const onClickTest = (name: string): void => {
    setSearch(name);
    const pokeFilter = allPoke.filter((el) => el.name.includes(name));
    const maxSearch = pokeFilter.slice(0, 5);
    setTemporary(pokeFilter);
    dispatch(setTooltipPokemon(maxSearch));
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };
  const onKeyUpSearch = (): void => {
    if (search) {
      setTooltipOpen(true);
      const pokeFilter = allPoke.filter((el) => el.name.includes(search));
      const maxSearch = pokeFilter.slice(0, 5);
      setTemporary(pokeFilter);
      dispatch(setTooltipPokemon(maxSearch));
    } else {
      setTemporary([]);
      dispatch(setTooltipPokemon([]));
      setTooltipOpen(false);
    }
  };

  const onSearch: SearchProps["onSearch"] = () => {
    if (temporary && search) {
      const show = temporary.filter(
        (value: resultsType, i: number) => i + 1 <= 20
      );
      dispatch(setSearchPokemon(temporary));
      dispatch(setSearchShowPokemon(show));
      setSearchTerm(true);
      setSearch("");
      setTemporary([]);
      dispatch(setTooltipPokemon([]));
      setTooltipOpen(false);
    } else {
      setSearchTerm(false);
    }
  };

  return (
    <Content
      style={{
        padding: "0 48px",
        alignItems: "center",
        maxWidth: "1440px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <Tooltip placement="bottomLeft" title={test} open={tooltipOpen}>
        <Search
          placeholder="input search text"
          enterButton
          style={{ margin: "10px 0" }}
          value={search}
          onChange={onChangeSearch}
          onKeyUp={onKeyUpSearch}
          onSearch={onSearch}
        />
      </Tooltip>
      {searchTerm ? (
        <>
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
              width: "100%",
            }}
          >
            {renderSearchPokemon()}
          </div>
          <Pagination
            defaultCurrent={1}
            align="center"
            pageSize={20}
            total={searchPoke.length}
            showSizeChanger={false}
            showQuickJumper
            onChange={(page) => onChangeSearchPage(page)}
          />
        </>
      ) : (
        <>
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
              width: "100%",
            }}
          >
            {loading && <div>LOADING...</div>}
            {renderPokemon()}
          </div>
          <Pagination
            defaultCurrent={1}
            align="center"
            pageSize={20}
            total={allPoke.length}
            showSizeChanger={false}
            showQuickJumper
            onChange={(page) => onChangePage(page)}
          />
        </>
      )}
    </Content>
  );
};

export default MainPage;
