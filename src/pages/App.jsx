import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Box } from "@mui/material";
import Cards from "../components/ui/cards"
import "../style/main.scss";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";

const App = () => {
  return (
      <Box className="container-md px-0 px-sm-4">
        <Navbar />
        <Cards />
        <Footer />
      </Box>
  );
}

export default App;
