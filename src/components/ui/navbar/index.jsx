import { useContext } from "react";
import { AppBar, Box, IconButton, Typography, Toolbar } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { ShareContext } from "../../shared/context/share-state";
import GenericModal from "../modal";

const Navbar = () => {
  const { searchQuery, setSearchQuery, isApiLoading, setOpenModal } =
    useContext(ShareContext);

  const handleInputChange = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="navbar" position="static">
        <Toolbar className="d-flex justify-content-between">
          <img
            className="img-logo pe-2"
            src={`/images/pokeball.png`}
            loading="lazy"
          />
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Pokedex
          </Typography>
          <Box className="search-container">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search"
              onChange={(e) => handleInputChange(e)}
              disabled={isApiLoading}
            />
          </Box>
          <Box>
            <IconButton
              size="large"
              aria-label="about"
              aria-haspopup="true"
              color="inherit"
              onClick={() => setOpenModal(true)}
            >
                <InfoIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <GenericModal />
    </Box>
  );
};
export default Navbar;
