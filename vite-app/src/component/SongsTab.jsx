import React, { useState } from 'react';
import Select from 'react-select';

const artistOptions = [
  { value: 'artist1', label: 'Artist 1' },
  { value: 'artist2', label: 'Artist 2' },
  { value: 'artist3', label: 'Artist 3' },
  { value: 'artist4', label: 'Artist 4' },
  { value: 'artist5', label: 'Artist 5' }
];

function SongsTab({ selectedArtists, handleArtistChange, order, setOrder, limit, setLimit }) {
  
  // axios request here
  const artistOptions = [
    { value: 'Post Malone', label: 'Post Malone' },
    { value: 'Talyor Swift', label: 'Talyor Swift' },
    { value: 'Lauv', label: 'Lauv' },
  ];

  const limitOptions = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 40, label: '40' },
    { value: 50, label: '50' },
  ];


  const handleRadioChange = (event) => {
    setOrder(event.target.value);
  };

  const handleLimitChange = (selected) => {
    setLimit(selected.value);
  };

  return (
    <div style={{ margin: '20px' }}>
      <h3>Options</h3>
      {/* Searchable Multi-Select Dropdown for Genres */}
      <div>
       <Select
        value={selectedArtists}
        onChange={handleArtistChange}
        options={artistOptions}
        placeholder="Select Artists"
        isMulti={true}
      />
      </div>

      {/* Radio Buttons */}
      <div style={{paddingTop: '1rem'}}>
        <label style={{paddingRight: '1rem'}}>
          <input
            type="radio"
            value="most"
            checked={order === 'most'}
            onChange={handleRadioChange}
          />
          Most Popular
        </label>
        <label>
          <input
            type="radio"
            value="least"
            checked={order === 'least'}
            onChange={handleRadioChange}
          />
          Least Popular
        </label>
      </div>

      {/* Limit Select Dropdown */}
      <div>
        <h3>Limit</h3>
        <Select
          options={limitOptions}
          placeholder="Select a limit..."
          onChange={handleLimitChange}
          value={limitOptions.find((option) => option.value === limit)}
        />
      </div>

      {/* Display Selected Preferences */}
      <div>
        <h3>Selected Preferences:</h3>
        <p>Popularity: {order === 'most' ? 'Most Popularity' : 'Least Popularity'}</p>
        <p>Selected Artists:</p>
        {selectedArtists.length > 0 ? (
          selectedArtists.map((option) => <div key={option.value}>{option.label}</div>)
        ) : (
          <p>No Artists selected.</p>
        )}
        <p>Limit: {limit}</p>
      </div>
    </div>

  );
}

export default SongsTab;