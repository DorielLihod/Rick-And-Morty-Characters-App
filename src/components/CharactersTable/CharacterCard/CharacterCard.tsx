import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Grid } from "@mui/material";
import "./CharacterCard.css";

import { Character } from "../../models/models";

interface Props {
  //Props from the parent that contain the character details
  character: Character;
  //Props from child to parent that contain array of string - frist and last episodes
  episodes: (fristAndLastEpisodes: string[]) => void;
  //Props from child to parent that contain image url and name of selected characters
  selectedCharacter: (imageUrl: string, characterName: string) => void;
}

const CharacterCard = ({ character, episodes, selectedCharacter }: Props) => {
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
    <Card
      sx={{ maxWidth: "100%", maxHeight: "100%", minHeight: "100%" }}
      onClick={() => {
        getFirstAndLastEpisodes(
          character.episode[0],
          character.episode[character.episode.length - 1]
        );
        selectedCharacter(character.image, character.name);
      }}
    >
      <CardContent sx={{ padding: 1, marginBottom: 0 }}>
        <Grid item key={"as"}>
          <Box display="flex" alignItems="center" sx={{ height: 50 }}>
            <Avatar alt={character.name} src={character.image} />
            <Typography variant="h6" style={{ marginLeft: "15px" }}>
              {character.name}
            </Typography>
          </Box>
        </Grid>
      </CardContent>
      <Grid
        sx={{
          paddingTop: 2,
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <Typography display="inline">Status</Typography>
        <Typography display="inline" sx={{ color: "gray", paddingLeft: 5.5 }}>
          {character.status}
        </Typography>

        <hr className="divider" />

        <Typography display="inline">Species</Typography>
        <Typography display="inline" sx={{ color: "gray", paddingLeft: 4 }}>
          {character.species}
        </Typography>

        <hr className="divider" />
      </Grid>
    </Card>
  );
};

export default CharacterCard;
