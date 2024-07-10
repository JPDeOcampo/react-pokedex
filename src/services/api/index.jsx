import { useEffect, useState } from "react";

const PokemonAPIProvider = () => {
  const [pokemonResult, setPokemonResult] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [isApiLoading, setIsApiLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=650&offset=0");
        if (response.ok) {
          const data = await response.json();
          const results = data.results;
          setPokemonResult(results);
        } else {
          console.error("Error fetching data:", response.status, response.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchDataForPokemon = async (url) => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error(
            "Error fetching data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    };
    const fetchAllData = async () => {
      const dataArray = await Promise.all(
        pokemonResult.map((pokemon) => fetchDataForPokemon(pokemon.url))
      );
      setPokemonData(dataArray);
      if (dataArray.length > 0) {
        setIsApiLoading(false);
      }
    };
    if(pokemonResult.length > 0){
      fetchAllData();
    }
  }, [pokemonResult]);

  return { pokemonData, isApiLoading };
};
export default PokemonAPIProvider;
