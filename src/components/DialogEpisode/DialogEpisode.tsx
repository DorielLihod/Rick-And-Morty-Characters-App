import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Episode } from "../models/models";
import apiClient from "../../services/api-client";
import { Box, Typography } from "@mui/material";
import "./DialogEpisode.css";

interface Props {
  //Props from parent sign if the dialog is open
  isOpenChild: boolean;
  //Props from parent Object of Character details
  charctersDetails: {
    imageUrl: string;
    characterName: string;
  };
  //Props from parent get the id of first and last episode
  idEpisodes: string[];
}

const DialogEpisode = ({
  isOpenChild,
  idEpisodes,
  charctersDetails,
}: Props) => {
  //store the error message if exist
  const [error, setError] = useState("");
  //Store the state of dialog open/close
  const [open, setOpen] = useState(false);

  //Store the data after fetch of data from api - Episodes
  const [episodes, setEpisodes] = useState<Episode[]>();
  //Store the number of Episode after the fetch first and last episodes - 1 or 2
  const [numberOfEpisodes, setNumberOfEpidose] = useState(0);

  //fetch the data from the api - Episodes
  //fetch the data only if the dialog is open
  useEffect(() => {
    if (isOpenChild === true) {
      apiClient
        .get<Episode[]>(`/episode/${idEpisodes[0]},${idEpisodes[1]}`)
        .then((res) => {
          setEpisodes(res.data);
          setNumberOfEpidose(res.data.length);
          setError("");
        })
        .catch((err) => setError(err.message));
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [episodes?.length, isOpenChild, idEpisodes]);

  //handle the close operation
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {!error && (
        <Dialog open={open} onClose={handleClose}>
          {/*Image of character*/}
          <Box sx={{ maxHeight: "100%", minWidth: 450 }}>
            <img src={charctersDetails.imageUrl} className="img-character" />
          </Box>
          {/*Name of character*/}
          <DialogTitle
            sx={{ fontSize: "30px", paddingTop: "1%", paddingBottom: "2%" }}
          >
            {charctersDetails.characterName}
          </DialogTitle>
          <DialogContent sx={{ marginTop: 0, marginBottom: 0 }}>
            {/*First Appearance*/}
            <Typography variant="h6" display="inline">
              First Appearance
            </Typography>
            <Typography
              display="inline"
              variant="h6"
              sx={{ color: "gray", paddingLeft: "3%" }}
            >
              {episodes && episodes[0].episode}
            </Typography>

            <hr className="divider" />

            {/*Last Appearance*/}
            <Typography variant="h6" display="inline">
              Last Appearance
            </Typography>
            <Typography
              display="inline"
              variant="h6"
              sx={{ color: "gray", paddingLeft: "3%" }}
            >
              {numberOfEpisodes == 2
                ? episodes && episodes[1].episode
                : episodes && episodes[0].episode}
            </Typography>

            <hr className="divider" />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DialogEpisode;
