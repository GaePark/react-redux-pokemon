import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import requests from "../../api/requests";
import { Content } from "antd/es/layout/layout";
import { Image } from "antd";
import * as S from "./DetailPage.styles";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import {
  flavor_text_entriesTypes,
  generaTypes,
  speciesTypes,
} from "../../types/species.Types";
import { PokeDBTypes, statsTypes } from "../../types/Pokemon.Types";

const DetailPage = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const [pokeDB, setPokeDB] = useState<PokeDBTypes>();
  const [speciesDB, setSpeciesDB] = useState<speciesTypes>();
  const [loading, setLoading] = useState<boolean>(true);
  const [flavor, setFlavor] = useState<string>("");
  const [genera, setGenera] = useState<string>("");

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = async (): Promise<void> => {
    let genera;
    const poke = await axios.get(
      `${requests.fetchPokemon}${location.pathname}`
    );
    const species = await axios.get(
      `${requests.fetchSpecies}${location.pathname}`
    );

    if (
      species.data.genera.find(
        (genera: generaTypes) => genera.language.name === "ko"
      )
    ) {
      genera = species.data.genera.find(
        (genera: generaTypes) => genera.language.name === "ko"
      );
    } else {
      genera = species.data.genera.find(
        (genera: generaTypes) => genera.language.name === "en"
      );
    }

    if (
      species.data.flavor_text_entries.find(
        (text: flavor_text_entriesTypes) => text.language.name === "ko"
      )
    ) {
      const text = species.data.flavor_text_entries.find(
        (text: flavor_text_entriesTypes) => text.language.name === "ko"
      );
      setFlavor(text.flavor_text);
    } else {
      const text = species.data.flavor_text_entries.find(
        (text: flavor_text_entriesTypes) => text.language.name === "en"
      );
      setFlavor(text.flavor_text);
    }
    const pokeDB: PokeDBTypes = poke.data;
    const speciesDB: speciesTypes = species.data;
    setGenera(genera.genus);
    setPokeDB(pokeDB);
    setSpeciesDB(speciesDB);
    setLoading(false);
  };

  const onClickPrev = (): void => {
    if (pokeDB?.id === 1) {
      navigate(`/1025`);
      window.location.reload();
      return;
    }
    navigate(`/${pokeDB ? pokeDB.id - 1 : ""}`);
    window.location.reload();
  };
  const onClickNext = (): void => {
    if (pokeDB?.id === 1025) {
      navigate(`/1`);
      window.location.reload();
      return;
    }
    navigate(`/${pokeDB ? pokeDB.id + 1 : ""}`);
    window.location.reload();
  };

  if (loading) {
    return <Content>LOADING...</Content>;
  } else {
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FaAngleLeft
            style={{
              width: "48px",
              height: "48px",
              color: "#333",
              cursor: "pointer",
            }}
            onClick={onClickPrev}
          />
          <FaAngleRight
            style={{
              width: "48px",
              height: "48px",
              color: "#333",
              cursor: "pointer",
            }}
            onClick={onClickNext}
          />
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "6px",
            marginBottom: "10px",
            overflow: "hidden",
            width: "100%",
            marginTop: "20px",
            border: `4px solid ${speciesDB?.color.name}`,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            {pokeDB?.sprites["other"]["official-artwork"]["front_default"] && (
              <Image
                src={
                  pokeDB["sprites"]["other"]["official-artwork"][
                    "front_default"
                  ]
                }
                alt={location.pathname}
                preview={false}
                style={{ width: "475px", height: "475px" }}
              />
            )}
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <h2 style={{ color: "#ccc " }}>NO. {pokeDB?.id}</h2>
              <h1 style={{ textAlign: "center" }}>
                {pokeDB?.species.name.toUpperCase()}
              </h1>
              <div style={{ textAlign: "center" }}>{flavor}</div>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr style={{ backgroundColor: "#ccc", width: "100%" }}>
                    <th>타입</th>
                    <th>키</th>
                    <th>분류</th>
                  </tr>
                  <tr>
                    <th>
                      <img
                        src={`./images/${pokeDB?.types[0].type.name}.svg`}
                        alt="0"
                        style={{ width: "24px" }}
                      />{" "}
                      {pokeDB?.types[1] ? (
                        <img
                          src={`./images/${pokeDB?.types[1].type.name}.svg`}
                          alt="1"
                          style={{ width: "24px" }}
                        />
                      ) : (
                        ""
                      )}
                    </th>
                    <th>{pokeDB?.height}0cm</th>
                    <th>{genera}</th>
                  </tr>
                </tbody>
              </table>
              <div>
                {pokeDB?.stats.map((el: statsTypes) => (
                  <div style={{ position: "relative" }} key={el.stat.name}>
                    <span style={{ fontWeight: "bold" }}>
                      {el.stat.name.toUpperCase()}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        left: "5px",
                        top: "68%",
                        transform: "translate(0, -50%)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {el.base_stat}
                    </span>
                    <S.Progress
                      value={el.base_stat}
                      max={255}
                      color={speciesDB?.color.name}
                    ></S.Progress>
                    <span
                      style={{
                        position: "absolute",
                        right: "5px",
                        top: "70%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      255
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Content>
    );
  }
};

export default DetailPage;
