import { Box, Typography } from "@mui/material";
const Footer = () => {
  return (
    <Box className="footer d-flex justify-content-center">
      <Typography>
        &copy; 2022 - {new Date().getFullYear()} PokeDex | Designed by
        {"Jonathan De Ocampo"}
      </Typography>
    </Box>
  );
};
export default Footer;
