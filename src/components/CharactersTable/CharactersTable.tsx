import { Character } from "../models/models";
import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface Props {
  //contain string of error
  error: string;
  //Props from the parent that contain the characters data
  characters: Character[] | undefined;
  //Props from child to parent that contain array of string - frist and last episodes
  episodes: (fristAndLastEpisodes: string[]) => void;
  //Props from child to parent that contain image url and name of selected characters
  selectedCharacter: (imageUrl: string, characterName: string) => void;
}

//An array that stores the headers of the table
const headersTable = ["", "Name", "Origin", "Status", "Species", "Gender"];

const CharactersTable = ({
  error,
  characters,
  episodes,
  selectedCharacter,
}: Props) => {
  //Calculation of the identifiers of the first and last chapter
  const getFirstAndLastEpisodes = (
    firstEpisode: string,
    lastEpisode: string
  ) => {
    const stringToRemove = "https://rickandmortyapi.com/api/episode/";
    episodes([
      firstEpisode.replace(stringToRemove, ""),
      lastEpisode.replace(stringToRemove, ""),
    ]);
  };

  return (
    <Box
      alignItems="center"
      sx={{ boxShadow: 5, maxWidth: "99%", minHeight: 645, marginLeft: "0.5%" }}
    >
      {/*If there is error show No Result*/}
      {error && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="645px"
          marginTop="11px"
        >
          <Typography variant="h5" sx={{ color: "gray" }}>
            No Results
          </Typography>
        </Box>
      )}

      {/*If there is no error show The Card container*/}
      {!error && (
        <TableContainer
          component={Paper}
          sx={{ minHeight: 645, maxHeight: 645, marginTop: 1.5 }}
        >
          <Table aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                {headersTable.map((title) => (
                  <TableCell key={title} align="left">
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {characters?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    getFirstAndLastEpisodes(
                      row.episode[0],
                      row.episode[row.episode.length - 1]
                    );
                    selectedCharacter(row.image, row.name);
                  }}
                >
                  <TableCell>
                    <Avatar alt={row.name} src={row.image} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.origin.name}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="left">{row.species}</TableCell>
                  <TableCell align="left">{row.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CharactersTable;
