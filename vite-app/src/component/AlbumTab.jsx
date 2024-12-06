import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import axios from 'axios';

export default function AlbumTab({
  selectedArtists,
  handleArtistChange,
  order,
  setOrder,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {

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

  
  const handleRadioChange = (event) => {
    setOrder(event.target.value);
  };


  return (
    <div style={{ margin: "20px" }}>
        
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
      {/* <div style={{paddingTop: '1rem', paddingBottom: '1rem'}}>
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
      </div> */}

      <h3>Select Date Range</h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <label>Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            // startDate={startDate}
            maxDate={endDate}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Start Date"
          />
        </div>
        <div>
          <label>End Date: </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            // startDate={startDate}
            // endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select End Date"
          />
        </div>
      </div>
    </div>
  );
}
