// app/api/podcasts/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get YouTube data
    const ytResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${process.env.YOUTUBE_PLAYLIST_ID}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const ytData = await ytResponse.json();

    // Get Spotify data
    const spotifyToken = await getSpotifyToken();
    const spotifyResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
      }
    );
    const spotifyData = await spotifyResponse.json();

    return NextResponse.json({
      youtube: ytData.items,
      spotify: spotifyData.items,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch podcast data" },
      { status: 500 }
    );
  }
}

async function getSpotifyToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}
