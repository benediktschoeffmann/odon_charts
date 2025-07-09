import Artist from "./artistSchema";
import * as z from "zod/v4";

const Song = z.object({
  title: z.string().trim(),
  releaseYear: z.number(),
  genres: z.array(z.string()),
  artists: z.array(Artist).nonempty({
    message: "A song must have at leaste one artist"
  })
})

export default Song