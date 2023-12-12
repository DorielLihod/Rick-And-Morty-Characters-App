import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  TextField,
  Grid,
  InputAdornment,
} from "@mui/material";

interface Props {
  //Props from child to parent that contain the search string
  onSearch: (searchText: string) => void;
  //Props from child to parent that contain the gender string
  onGender: (GenderText: string) => void;
  //Props from child to parent that contain the status string
  onStatus: (StatusText: string) => void;
}

//array of strings contain the gender and status title
const genderStr = ["Female", "Male", "Genderless", "Unknown"];
const statusStr = ["Alive", "Dead", "Unknown"];

const FormFilter = ({ onSearch, onGender, onStatus }: Props) => {
  //Store the string of search
  const [search, setSearch] = useState("");
  //Store the string of gender
  const [gender, setGender] = useState("");
  //Store the string of status
  const [status, setStatus] = useState("");

  //handle the search string and pass the string to parent
  const handleChangeSearch = (strSearch: string) => {
    setSearch(strSearch);
    onSearch(strSearch);
  };

  //handle the gender string and pass the string to parent
  const handleChangeGender = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
    onGender(event.target.value as string);
  };

  //handle the status string and pass the string to parent
  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
    onStatus(event.target.value as string);
  };

  //handle the click of clear all
  const handleClickClear = () => {
    //reset the state of gender
    onGender("");
    setGender("");

    //reset the state of status
    onStatus("");
    setStatus("");

    //reset the state of search
    onSearch("");
    setSearch("");
  };

  return (
    <Grid container spacing={2} sx={{ padding: "0.5%", marginTop: "60px" }}>
      <Grid item xs={12}>
        <TextField
          sx={{ width: "100%" }}
          id="outlined-required"
          label="Search"
          value={search}
          onChange={(event) => handleChangeSearch(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={5.3}>
        <FormControl fullWidth sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">Gneder</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Gender"
            value={gender}
            onChange={handleChangeGender}
          >
            {genderStr.map((title) => (
              <MenuItem value={title}>{title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={5.3}>
        <FormControl fullWidth sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Status"
            value={status}
            onChange={handleChangeStatus}
          >
            {statusStr.map((title) => (
              <MenuItem value={title}>{title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1.4}>
        <Button
          sx={{ height: "100%", width: "100%", size: "150%" }}
          variant="contained"
          onClick={handleClickClear}
          size="medium"
        >
          CLEAR ALL
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormFilter;
