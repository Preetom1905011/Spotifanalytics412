import React, { useState } from 'react';
import axios from 'axios';

export default function SelectTab() {
  const [trackArtists, setTrackArtists] = useState(['']); // Tracks artists input
  const [albumArtists, setAlbumArtists] = useState(['']); // Albums artists input
  const [genres, setGenres] = useState(['']); // Genres input
  const [trackLimit, setTrackLimit] = useState(5); // Track limit input
  const [trackOrder, setTrackOrder] = useState('asc'); // Track order input
  const [albumStart, setAlbumStart] = useState('2023-01-01'); // Album start date input
  const [albumEnd, setAlbumEnd] = useState('2023-12-31'); // Album end date input
  const [albumOrder, setAlbumOrder] = useState('desc'); // Album order input
  const [artistLimit, setArtistLimit] = useState(10); // Artist limit input
  const [artistOrder, setArtistOrder] = useState('desc'); // Artist order input

  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Helper to build query strings
      const buildQueryString = (params) =>
        Object.entries(params)
          .map(([key, value]) =>
            Array.isArray(value)
              ? value.map((val) => `${key}[]=${encodeURIComponent(val)}`).join('&')
              : `${key}=${encodeURIComponent(value)}`
          )
          .join('&');

      // Fetch tracks
      const trackQueryString = buildQueryString({
        artistNames: trackArtists,
        limit: trackLimit,
        order: trackOrder,
      });
      const tracksResponse = await axios.get(`http://localhost:5000/api/tracks?${trackQueryString}`);
      const combinedTracks = Object.values(tracksResponse.data).flat();
      setTracks(combinedTracks);

      // Fetch albums
      const albumQueryString = buildQueryString({
        artistNames: albumArtists,
        start: albumStart,
        end: albumEnd,
        order: albumOrder,
      });
      const albumsResponse = await axios.get(`http://localhost:5000/api/albums?${albumQueryString}`);
      const combinedAlbums = Object.values(albumsResponse.data).flat();
      setAlbums(combinedAlbums);
      console.log('Albums API Response:', albumsResponse.data);


      // Fetch artists
      const artistQueryString = buildQueryString({
        genres,
        limit: artistLimit,
        order: artistOrder,
      });
      const artistsResponse = await axios.get(`http://localhost:5000/api/artists?${artistQueryString}`);
      setArtists(artistsResponse.data || []);

      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddInput = (setter) => setter((prev) => [...prev, '']);
  const handleInputChange = (index, setter) => (e) =>
    setter((prev) => prev.map((val, i) => (i === index ? e.target.value : val)));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="selectTab">
      <h1>Enter Query Parameters</h1>

      {/* Track Artists */}
      <h2>Tracks</h2>
      {trackArtists.map((artist, index) => (
        <input
          key={index}
          type="text"
          value={artist}
          placeholder="Enter artist name"
          onChange={handleInputChange(index, setTrackArtists)}
        />
      ))}
      <button onClick={() => handleAddInput(setTrackArtists)}>Add Artist</button>
      <input
        type="number"
        value={trackLimit}
        onChange={(e) => setTrackLimit(Number(e.target.value))}
        placeholder="Track limit"
      />
      <select value={trackOrder} onChange={(e) => setTrackOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {/* Album Artists */}
      <h2>Albums</h2>
      {albumArtists.map((artist, index) => (
        <input
          key={index}
          type="text"
          value={artist}
          placeholder="Enter artist name"
          onChange={handleInputChange(index, setAlbumArtists)}
        />
      ))}
      <button onClick={() => handleAddInput(setAlbumArtists)}>Add Artist</button>
      <input
        type="date"
        value={albumStart}
        onChange={(e) => setAlbumStart(e.target.value)}
        
      />
      <input
        type="date"
        value={albumEnd}
        onChange={(e) => setAlbumEnd(e.target.value)}
      />
      <select value={albumOrder} onChange={(e) => setAlbumOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {/* Artists */}
      <h2>Artists</h2>
      {genres.map((genre, index) => (
        <input
          key={index}
          type="text"
          value={genre}
          placeholder="Enter genre"
          onChange={handleInputChange(index, setGenres)}
        />
      ))}
      <button onClick={() => handleAddInput(setGenres)}>Add Genre</button>
      <input
        type="number"
        value={artistLimit}
        onChange={(e) => setArtistLimit(Number(e.target.value))}
        placeholder="Artist limit"
      />
      <select value={artistOrder} onChange={(e) => setArtistOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button onClick={fetchData}>Fetch Data</button>

      <h1>Tracks List</h1>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>
            <strong>{track.tr_name}</strong> - Popularity: {track.tr_popularity}
          </li>
        ))}
      </ul>

      <h1>Albums List</h1>
      <ul>
        {albums.map((album, index) => (
          <li key={index}>
            <strong>{album.al_name}</strong> - Release Date: {album.al_releasedate}
          </li>
        ))}
      </ul>

      <h1>Artists List</h1>
      <ul>
        {artists.map((artist, index) => (
          <li key={index}>
            <strong>{artist.p_name}</strong> - Genre: {artist.ar_genre}
          </li>
        ))}
      </ul>
      
      
    </div>
  );
}
