import { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "antd";
import "./Pokemon.style.css";
import { useNavigate } from "react-router-dom";

interface pokemonTypes {
  poke: {
    name: string;
    url: string;
  };
}

const Pokemon = ({ poke }: pokemonTypes): JSX.Element => {
  const [pokeDB, setPokeDB] = useState<any>([]);
  const upper_name = poke.name.toUpperCase();

  const navigate = useNavigate();

  useEffect(() => {
    fetchSpecies();
  }, []);

  const fetchSpecies = async (): Promise<void> => {
    const { data } = await axios.get(poke.url);
    setPokeDB(data);
  };

  const onClickDetail = () => {
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
      <div style={{ width: "80%" }}>
        <div
          className="pokeImg"
          style={{ position: "relative" }}
          onClick={onClickDetail}
        >
          {pokeDB["sprites"] && (
            <Image
              src={
                pokeDB["sprites"]["other"]["official-artwork"]["front_default"]
              }
              alt={poke.name}
              preview={false}
              style={{
                width: "100%",
                border: "2px solid #cccccc",
                borderRadius: "5px",
              }}
            />
          )}
          <div style={{ position: "absolute", top: "2px", right: "5px" }}>
            NO. {pokeDB.id}
          </div>
        </div>
        <div>{upper_name}</div>
      </div>
    </div>
  );
};

export default Pokemon;
