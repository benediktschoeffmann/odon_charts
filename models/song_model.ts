import Artist from "./artist_model";

type Song = {
  title: String;
  releaseYear: number;
  genres: String[];
  artists: Artist[];
};

export default Song