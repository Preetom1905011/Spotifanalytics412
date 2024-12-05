import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SelectTab() {
  const [tracks, setTracks] = useState([]); // Tracks state
  const [albums, setAlbums] = useState([]); // Albums state
  const [artists, setArtists] = useState([]); // Artists state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tracks
        const tracksResponse = await axios.get(
          'http://localhost:5000/api/tracks?artistNames[]=Hozier&artistNames[]=Jungkook&limit=5&order=asc'
        );
        const combinedTracks = Object.values(tracksResponse.data).flat();
        setTracks(combinedTracks);

        // Fetch albums
        const albumsResponse = await axios.get(
          'http://localhost:5000/api/albums?artistNames[]=Joker&artistNames[]=Harlequin&start=2023-01-01&end=2023-12-31&order=desc'
        );
        const combinedAlbums = Object.values(albumsResponse.data).flat();
        setAlbums(combinedAlbums);

        // Fetch artists
        try {
          const artistsResponse = await axios.get(
            'http://localhost:5000/api/artists?genres[]=k-pop&genres[]=dance&limit=10&order=desc'
          );
          console.log('Artists Response:', artistsResponse.data);
          setArtists(artistsResponse.data || []); // Fallback to an empty array if no data
        } catch (err) {
          console.error('Artists fetch error:', err);
          if (err.response) {
            console.error('Server Error Details:', err.response.data);
          }
          setError('Failed to fetch artists.');
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="selectTab">
      <h1>Tracks List</h1>
      <ul>
        {tracks.length > 0 ? (
          tracks.map((track, index) => (
            <li key={index}>
              <strong>{track.tr_name}</strong> - Popularity: {track.tr_popularity}
            </li>
          ))
        ) : (
          <li>No tracks available</li>
        )}
      </ul>

      <h1>Albums List</h1>
      <ul>
        {albums.length > 0 ? (
          albums.map((album, index) => (
            <li key={index}>
              <strong>{album.album_name}</strong> - Release Date: {album.release_date}
            </li>
          ))
        ) : (
          <li>No albums available</li>
        )}
      </ul>

      <h1>Artists List</h1>
      <ul>
        {artists.length > 0 ? (
          artists.map((artist, index) => (
            <li key={index}>
              <strong>{artist.name}</strong> - Genre: {artist.genre}
            </li>
          ))
        ) : (
          <li>No artists available</li>
        )}
      </ul>
    </div>
  );
}
