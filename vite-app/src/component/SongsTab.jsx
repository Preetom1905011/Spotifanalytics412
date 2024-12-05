import React, { useState } from 'react';
import Select from 'react-select';

export default function MultiSelectWithRadioAndLimit() {
  
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [popularity, setPopularity] = useState('most'); // Default to "Most Popularity"
  const [limit, setLimit] = useState(10); // Default limit to 10

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

  const handleGenreChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  const handleRadioChange = (event) => {
    setPopularity(event.target.value);
  };

  const handleLimitChange = (selected) => {
    setLimit(selected.value);
  };

  return (
    <div>
      <h2>Select Preferences</h2>

      

      {/* Searchable Multi-Select Dropdown for Genres */}
      <div>
        <h3>Artist</h3>
        <Select
          options={artistOptions}
          isMulti
          placeholder="Select Artist..."
          onChange={handleGenreChange}
          value={selectedOptions}
        />
      </div>

      {/* Radio Buttons */}
      <div>
        <h3>Popularity</h3>
        <label>
          <input
            type="radio"
            value="most"
            checked={popularity === 'most'}
            onChange={handleRadioChange}
          />
          Most Popularity
        </label>
        <label>
          <input
            type="radio"
            value="least"
            checked={popularity === 'least'}
            onChange={handleRadioChange}
          />
          Least Popularity
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
        <p>Popularity: {popularity === 'most' ? 'Most Popularity' : 'Least Popularity'}</p>
        <p>Selected Genres:</p>
        {selectedOptions.length > 0 ? (
          selectedOptions.map((option) => <div key={option.value}>{option.label}</div>)
        ) : (
          <p>No genres selected.</p>
        )}
        <p>Limit: {limit}</p>
      </div>
    </div>

  );
}
