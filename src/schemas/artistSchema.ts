import * as z from "zod/v4";

const Artist = z.object({
  name: z.string().trim(),
  nationality: z.string().trim()
})

export default Artist