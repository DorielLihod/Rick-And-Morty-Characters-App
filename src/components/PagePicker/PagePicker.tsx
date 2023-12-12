import React, { useState } from "react";
import { Box, Pagination } from "@mui/material";

interface Props {
  //Props from child to parent that contain number of current page
  currentPage: (currentPageNumber: number) => void;

  //Props from parent that contain numbers of pages
  pagesNumber?: number;
}

const PagePicker = ({ currentPage, pagesNumber }: Props) => {
  //Store the current page
  const [page, setPage] = useState(1);

  //Handle the change of page - update parent and child
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    currentPage(value);
  };

  return (
    <Box sx={{ paddingTop: "1.5%" }}>
      <Pagination page={page} onChange={handleChangePage} count={pagesNumber} />
    </Box>
  );
};

export default PagePicker;
