// lib/spotify.ts
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const PLAYLIST_ID = "your_spotify_playlist_id";

async function getSpotifyToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  return (await response.json()).access_token;
}

export async function getSpotifyPlaylist() {
  const token = await getSpotifyToken();

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  return data.items.map((item: any) => ({
    id: item.track.id,
    title: item.track.name,
    artist: item.track.artists[0].name,
    album: item.track.album.name,
    thumbnail: item.track.album.images[0].url,
    url: item.track.external_urls.spotify,
  }));
}
