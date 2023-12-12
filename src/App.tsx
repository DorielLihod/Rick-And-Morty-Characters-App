import { useEffect, useState } from "react";
import apiClient from "./services/api-client";
import FormFilter from "./components/FormFilter/FormFilter";
import NavBar from "./components/NavBar/NavBar";
import PagePicker from "./components/PagePicker/PagePicker";
import CharactersTable from "./components/CharactersTable/CharactersTable";
import { FetchCharacters } from "./components/models/models";
import DialogEpisode from "./components/DialogEpisode/DialogEpisode";

function App() {
  //Store the data after fetch of data from api - Rick And Morty
  const [characters, setCharacters] = useState<FetchCharacters>();
  //store the error message if exist
  const [error, setError] = useState("");

  //Store the Search,Gender and Status values
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  //Store the state of dialog open/close
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //Store the current page in page picker
  const [currentPage, setCurrentPage] = useState(1);

  //Store the numbers of ids that repsresent the episodes
  const [episodesId, setepisodesId] = useState<string[]>([]);
  //Store object that contain the details of selected character - imgaeUrl + name
  const [selectedCharacter, setSelectedCharacter] = useState({
    imageUrl: "",
    characterName: "",
  });

  //Store true/false if the button Clear all are clicked
  const [isClear, setIsClear] = useState(false);

  //fetch the data from the api
  //The request changes according to the factors - search string, gender, status and current page in the table
  useEffect(() => {
    apiClient
      .get<FetchCharacters>(
        `/character/?page=${currentPage}&name=${search}&gender=${gender}&status=${status}`
      )
      .then((res) => {
        setCharacters(res.data);
        setError("");
      })
      .catch((err) => setError(err.message));

    if (currentPage != 1) {
      setIsClear(false);
    }
  }, [currentPage, search, gender, status]);

  //Show the dialog window if the array of episode IDs is not empty
  useEffect(() => {
    if (episodesId.length != 0) {
      setIsOpen(true);
    }
  }, [episodesId]);

  return (
    <div>
      {/* NavBar on the top of screen */}
      <NavBar />

      {/* Form with filters search,gender and status */}
      <FormFilter
        onSearch={(searchText) => setSearch(searchText)}
        onGender={(GenderText) => {
          setGender(GenderText);
          setCurrentPage(0);
        }}
        onStatus={(StatusText) => {
          setStatus(StatusText);
          setCurrentPage(0);
        }}
        isClear={(flag) => setIsClear(flag)}
      />

      {/* Show the Characters Table if there is no error */}
      <CharactersTable
        characters={characters?.results}
        episodes={(fristAndLastEpisodes) => setepisodesId(fristAndLastEpisodes)}
        selectedCharacter={(img, name) =>
          setSelectedCharacter({ imageUrl: img, characterName: name })
        }
        error={error}
      />

      {/* Show the Page picker under the table if there is no error */}
      <PagePicker
        currentPage={(page) => setCurrentPage(page)}
        pagesNumber={characters?.info.pages}
        isClear={isClear}
      />

      {/* A dialog window containing a picture of the character + first episode + last episode */}
      <DialogEpisode
        isOpenChild={isOpen}
        idEpisodes={episodesId}
        charctersDetails={{
          imageUrl: selectedCharacter.imageUrl,
          characterName: selectedCharacter.characterName,
        }}
      />
    </div>
  );
}

export default App;
