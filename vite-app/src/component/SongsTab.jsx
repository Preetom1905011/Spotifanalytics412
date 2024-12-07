import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

function SongsTab({ selectedArtists, handleArtistChange, order, setOrder, limit, setLimit }) {
  
  const [artistOptions, setArtistOptions] = useState([]);
  // axios request here
  useEffect(() => {
    const fetchAllArtists = async () => {
      try {
        // Make the Axios GET request
        const response = await axios.get("http://localhost:5000/api/artists");

        // Handle response
        const res = response.data.flat().map(artist => ({
          value: artist.p_name, // Assuming each artist object has a 'name' property
          label: artist.p_name, // Use the same property for the label
        }));
    
        setArtistOptions(res);
      } catch (error) {
        console.error("Error fetching tracks:", error.message);
        throw error;
      }
    };
    fetchAllArtists();
  }, [])

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

    </div>

  );
}

export default SongsTab;