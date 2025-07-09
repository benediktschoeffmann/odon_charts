import Artist from "./artistSchema";

type Song = {
  title: String;
  releaseYear: number;
  genres: String[];
  artists: Artist[];
};

export default Song