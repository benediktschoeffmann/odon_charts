import Song from "./songSchema";
import * as z from "zod/v4";


//type ChartSong = {
//  song: Song,
//  year: number
//};

const ChartSong = z.object({
  song: Song,
  year: z.number()
  }
)

export default ChartSong