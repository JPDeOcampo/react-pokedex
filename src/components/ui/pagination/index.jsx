import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

const GenericPagination = ({ totalPost, postPerPage, setCurrentPage }) => {
  let pages = [];
  for (let i = 1; i < Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }
  const handlePagination = (page) => {
      setCurrentPage(page);
  };
  
  return (
    <Box className="d-flex justify-content-center p-5">
      <Stack spacing={2}>
        <Pagination
          className="fs-1"
          count={pages.length}
          shape="rounded"
          onChange={(event, page) => handlePagination(page)}
        />
      </Stack>
    </Box>
  );
};
export default GenericPagination;
