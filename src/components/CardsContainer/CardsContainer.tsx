import CharacterCard from "../CharactersTable/CharacterCard/CharacterCard";
import Grid from "@mui/material/Grid";
import { Character } from "../models/models";
import { Box, Typography } from "@mui/material";

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

const CardsContainer = ({
  characters,
  error,
  episodes,
  selectedCharacter,
}: Props) => {
  return (
    <Box
      alignItems="center"
      sx={{
        maxWidth: "99%",
        minHeight: 645,
        marginLeft: "0.5%",
        paddingTop: 1,
      }}
    >
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
      {!error && (
        <Grid container spacing={2}>
          {characters?.map((character) => (
            <Grid item xs={2.4} key={character.id}>
              <CharacterCard
                character={character}
                episodes={(fristAndLastEpisodes) =>
                  episodes(fristAndLastEpisodes)
                }
                selectedCharacter={(img, name) => selectedCharacter(img, name)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CardsContainer;
