import React from 'react';
import Select from 'react-select';

const artistOptions = [
  { value: 'artist1', label: 'Artist 1' },
  { value: 'artist2', label: 'Artist 2' },
  { value: 'artist3', label: 'Artist 3' },
  { value: 'artist4', label: 'Artist 4' },
  { value: 'artist5', label: 'Artist 5' }
];

function SongsTab({ selectedArtists, handleArtistChange }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Select Artists</h3>
      <Select
        value={selectedArtists}
        onChange={handleArtistChange}
        options={artistOptions}
        placeholder="Select artists"
        isMulti={true}
      />
    </div>
  );
}

export default SongsTab;