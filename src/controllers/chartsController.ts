const query = "SELECT charts.year AS chartYear, charts.week AS chartWeek, " +
    "songs.title AS title, songs.releaseYear AS releaseYear, " +
    "GROUP_CONCAT( DISTINCT CONCAT(artists.name, ' (', nationalities.description, ')') ORDER BY artists.name ) as artistsWithNationalities," +
    "GROUP_CONCAT(DISTINCT genres.description) as genres FROM charts " +
    "INNER JOIN songs ON charts.songID = songs.ID " +
    "INNER JOIN songs_artists ON songs.ID = songs_artists.songID " +
    "INNER JOIN artists ON songs_artists.artistID = artists.ID " +
    "INNER JOIN songs_genres songs_genres ON songs.ID = songs_genres.songID " +
    "INNER JOIN genres genres ON songs_genres.genreID = genres.ID " +
    "INNER JOIN nationalities ON artists.nationalityID = nationalities.ID" +
    //whereStatement +
    " GROUP BY songs.title;";

    