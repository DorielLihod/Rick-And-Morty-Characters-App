import {
  AppBar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  //Props from child to parent that contain the view string
  changeView: (viewStr: string) => void;
}

const NavBar = ({ changeView }: Props) => {
  //Store the string of view
  const [view, setView] = useState("Table");

  //handle the view string and pass the string to parent
  const handleChangeView = (event: SelectChangeEvent) => {
    setView(event.target.value as string);
    changeView(event.target.value as string);
  };

  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Rick And Morty Characters App
        </Typography>
        <Box sx={{ marginTop: 1, marginBottom: 1 }}>
          <FormControl>
            <InputLabel sx={{ color: "white" }} id="demo-simple-select-label">
              View
            </InputLabel>
            <Select
              sx={{ color: "white" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="View"
              value={view}
              onChange={handleChangeView}
            >
              <MenuItem value="Table">Table</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
