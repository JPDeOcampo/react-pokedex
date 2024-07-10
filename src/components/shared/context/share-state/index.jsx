import { useEffect, useState, createContext } from "react";
import PokemonAPIProvider from "../../../../services/api"

export const ShareContext = createContext();
const ShareState = ({ children }) => {
  //API
  const { pokemonData, isApiLoading } = PokemonAPIProvider();

  //Raw data from API state
  const [pokemon, setPokemon] = useState([]);

  const [loading, setLoading] = useState(true);

  //Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(25);

  //Display data state
  const [currentPageData, setCurrentPageData] = useState([]);
  const [currentPageDisplay, setCurrentPageDisplay] = useState([]);

  const [searchFiltered, setSearchFiltered] = useState([]);

  //Search state
  const [searchQuery, setSearchQuery] = useState("");

  //Modal
  const [openModal, setOpenModal] = useState(false);

  //Data response from API
  useEffect(() => {
    const fetchData = async () => {
      setPokemon(pokemonData);
    };
    fetchData();
  }, [pokemonData]);

  //Set display data per page
  useEffect(() => {
    if (pokemon && pokemon.length > 0) {
      const lastPostIndex = currentPage * postPerPage;
      const firstPostIndex = lastPostIndex - postPerPage;
      setCurrentPageDisplay(pokemon.slice(firstPostIndex, lastPostIndex));
      setCurrentPageData(pokemon.slice(firstPostIndex, lastPostIndex));
      setLoading(true);
    }
  
  }, [pokemon, currentPage, postPerPage]);

  //Search filter
 useEffect(() =>{
    if(searchQuery){
      const filteredItems = currentPageData.filter((page) =>
        page.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCurrentPageDisplay(filteredItems);
    }else {
      setCurrentPageDisplay(currentPageData);
    }
 },[currentPageData, searchQuery]);

  return (
    <ShareContext.Provider value={{
      pokemon,
      isApiLoading,
      postPerPage,
      searchFiltered,
      currentPageDisplay,
      currentPageData,
      searchQuery,
      openModal, 
      loading,
      setPokemon,
      setCurrentPage,
      setPostPerPage,
      setSearchFiltered,
      setCurrentPageDisplay,
      setSearchQuery,
      setOpenModal,
      setLoading
      }}>
      {children}
    </ShareContext.Provider>
  );
};
export default ShareState;
