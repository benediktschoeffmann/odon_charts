import Song from "./songSchema";
import * as z from "zod/v4";


//type ChartSong = {
//  song: Song,
//  year: number
//};

const ChartSong = z.object({
  week: z.number(),
  year: z.number(),
  song: Song
}
)

export default ChartSong