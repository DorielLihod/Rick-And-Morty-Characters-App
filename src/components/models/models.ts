export interface FetchCharacters {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Characters[];
}

export interface Characters {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
}

export interface Episode {
  id: number;
  name: string;
  episode: string;
}
