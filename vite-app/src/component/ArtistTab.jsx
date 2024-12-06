import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';


function ArtistTab({ selectedGenre, handleGenreChange, order, setOrder, limit, setLimit }) {
  

  const limitOptions = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 40, label: '40' },
    { value: 50, label: '50' },
  ];

  
  const [genreOptions, setGenreOptions] = useState([]);
  // axios request here
  useEffect(() => {
    const fetchAllGenres = async () => {
      try {
        // Make the Axios GET request
        const response = await axios.get("http://localhost:5000/api/genres");

        // Handle response
        const res = response.data.flat().map(artist => ({
          value: artist.genre, // Assuming each artist object has a 'name' property
          label: artist.genre, // Use the same property for the label
        }));
    
        setGenreOptions(res);
      } catch (error) {
        console.error("Error fetching tracks:", error.message);
        throw error;
      }
    };
    fetchAllGenres();
  }, [])


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
        value={selectedGenre}
        onChange={handleGenreChange}
        options={genreOptions}
        placeholder="Select Genres"
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
        <p>Selected Genres:</p>
        {selectedGenre.length > 0 ? (
          selectedGenre.map((option) => <div key={option.value}>{option.label}</div>)
        ) : (
          <p>No Genres selected.</p>
        )}
        <p>Limit: {limit}</p>
      </div>
    </div>

  );
}

export default ArtistTab;