import { useEffect, useState, useContext } from "react";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import CardSkeleton from "../cards/card-skeleton";
import GenericPagination from "../pagination";
import { ShareContext } from "../../shared/context/share-state";

const PokemonCard = ({ pokemon }) => {
  const { loading, setLoading } = useContext(ShareContext);
  const [info, setInfo] = useState(true);
  const typeClassNames = pokemon.types.map((type) => type.type.name);

  useEffect(() => {
    const img = new Image();
    img.src = pokemon.sprites.other.dream_world.front_default;
    img.onload = () => setLoading(false);
  }, [pokemon.sprites.other.dream_world.front_default]);

  return (
    <>
      <Box className="flip-card">
        <Box className="flip-card-inner">
          <Card
            className={`pokemon-card pokemon-card-front ${typeClassNames[0]}`}
            key={pokemon.id}
            sx={{ width: "100%", height: "100%" }}
          >
            <CardContent className="card-content-container">
              <Box className="d-flex justify-content-between">
                <Box>#{pokemon.id}</Box>
                <Box className={`types-icon ${typeClassNames[0]}`}></Box>
              </Box>
              {loading ? (
                <Box className="img-loading-container">
                  <img
                    className="img-loading"
                    src={"/images/pokeball.png"}
                    alt={"pokeball"}
                  />
                  <Typography className="mt-3">Loading...</Typography>
                </Box>
              ) : (
                <CardMedia
                  component="img"
                  height="100%"
                  image={pokemon.sprites.other.dream_world.front_default}
                  alt={pokemon.name}
                />
              )}
              <Box>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="d-flex justify-content-center"
                >
                  {pokemon.name}
                </Typography>
                <Box className="d-flex justify-content-between flex-wrap gap-md-1">
                  {pokemon.types.map((types, i) => (
                    <Box key={i} className="pokemon-abilities">
                      <Box className="types-container">
                        <Box
                          className={`types-icon ${typeClassNames[i]}`}
                        ></Box>
                      </Box>
                      <Typography key={i}>{types.type.name}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card
            className={`pokemon-card pokemon-card-back ${typeClassNames[0]} d-flex justify-content-between`}
            key={pokemon.id + 1}
            sx={{ width: "100%", height: "100%" }}
          >
            <CardContent className="card-content-container">
              <Box className="d-flex justify-content-between align-items-center">
                <Box>#{pokemon.id}</Box>
                <Button
                  className="card-button"
                  onClick={() => setInfo((prev) => !prev)}
                >
                  {!info ? "Pokemon Info" : "Base Stats"}
                </Button>
              </Box>
              <Box className="pokemon-info border rounded p-2 pe-1 text-start">
                {info ? (
                  <Box className="pe-1">
                    <Box className="text-center">
                      <Typography variant="h6">Pokemon Info</Typography>
                    </Box>
                    <Typography>Pokemon id: #{pokemon.id}</Typography>
                    <Typography>Name: {pokemon.name}</Typography>
                    <Typography>Height: {pokemon.height}</Typography>
                    <Typography>Weight: {pokemon.weight}</Typography>
                    <Typography>
                      Base Experience: {pokemon.base_experience}
                    </Typography>
                    <Typography>
                      Name:{" "}
                      {pokemon.abilities.map((abilities, i) => {
                        const isLast = i === pokemon.abilities?.length - 1;
                        return (
                          <span key={i}>
                            {abilities.ability.name}
                            {!isLast && ", "}
                          </span>
                        );
                      })}
                    </Typography>
                  </Box>
                ) : (
                  <Box className="d-flex flex-column gap-2 pe-1 pb-1">
                    <Box className="text-center">
                      <Typography variant="h6" style={{ lineHeight: "25px" }}>
                        Base Stats
                      </Typography>
                    </Box>
                    {pokemon.stats.map((stats, i) => {
                      const barColors = [
                        "bg-success",
                        "bg-info",
                        "bg-warning",
                        "bg-danger",
                      ];
                      return (
                        <Box key={i} className="pokemon-stats">
                          <div
                            className="progress w-100 position-relative"
                            role="progressbar"
                            aria-label="Success example"
                            aria-valuenow={stats.base_stat}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              className={`progress-bar d-flex justify-content-between ${barColors[i]}`}
                              style={{ width: stats.base_stat + "%" }}
                            >
                              <span className="stats-percent">
                                {stats.base_stat + "%"}
                              </span>
                            </div>
                            <span className="stats-name">
                              {stats.stat.name === "attack"
                                ? "ATK"
                                : stats.stat.name === "defense"
                                ? "DEF"
                                : stats.stat.name === "special-attack"
                                ? "SP ATK"
                                : stats.stat.name === "special-defense"
                                ? "SP DEF"
                                : stats.stat.name === "speed"
                                ? "Speed"
                                : "HP"}
                            </span>
                          </div>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
              <Box className="d-flex justify-content-between flex-wrap gap-md-1">
                {pokemon.types.map((types, i) => (
                  <Box key={i} className="pokemon-abilities">
                    <Box className="types-container">
                      <Box className={`types-icon ${typeClassNames[i]}`}></Box>
                    </Box>
                    <Typography key={i}>{types.type.name}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};
const Cards = () => {
  const {
    pokemon,
    isApiLoading,
    currentPageDisplay,
    setCurrentPage,
    postPerPage,
    searchQuery,
  } = useContext(ShareContext);

  return (
    <>
      <Box className="cards-container px-3 px-sm-0">
        {isApiLoading && Array.isArray(currentPageDisplay) ? (
          Array.from({ length: postPerPage }).map((postPage, i) => (
            <CardSkeleton key={i} className="pokemon-cards" />
          ))
        ) : currentPageDisplay.length === 0 && searchQuery.length !== 0 ? (
          <Box className="text-center w-100">No Search Results Found</Box>
        ) : (
          Array.isArray(currentPageDisplay) &&
          currentPageDisplay.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))
        )}
      </Box>
      {currentPageDisplay.length !== 0 && (
        <GenericPagination
          totalPost={pokemon.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default Cards;
