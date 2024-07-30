import { useEffect, useState } from "react";
import { Image } from "antd";
import "./Pokemon.style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PokeDBTypes } from "../../../types/Pokemon.Types";

interface pokemonTypes {
  poke: {
    name: string;
    url: string;
  };
}

const Pokemon = ({ poke }: pokemonTypes): JSX.Element => {
  const [pokeDB, setPokeDB] = useState<PokeDBTypes>();
  const upper_name = poke.name.toUpperCase();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async (): Promise<void> => {
    const { data } = await axios.get(poke.url);
    setPokeDB(data);
  };

  const onClickDetail = (): void => {
    navigate(`/${poke.name}`);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "70%" }}>
        <div
          className="pokeImg"
          style={{
            position: "relative",
            width: "100%",
            minHeight: "188px",
            border: "2px solid #cccccc",
            borderRadius: "5px",
          }}
          onClick={onClickDetail}
        >
          {pokeDB?.sprites.other["official-artwork"]["front_default"] && (
            <Image
              src={
                pokeDB["sprites"]["other"]["official-artwork"]["front_default"]
              }
              alt={poke.name}
              preview={false}
            />
          )}
          <div style={{ position: "absolute", top: "2px", right: "5px" }}>
            NO. {pokeDB?.id}
          </div>
        </div>
        <div style={{ fontWeight: "bold" }}>{upper_name}</div>
      </div>
    </div>
  );
};

export default Pokemon;
