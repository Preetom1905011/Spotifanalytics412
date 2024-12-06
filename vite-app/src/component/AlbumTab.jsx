import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

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


  // axios request here
  const artistOptions = [
    { value: 'Post Malone', label: 'Post Malone' },
    { value: 'Talyor Swift', label: 'Talyor Swift' },
    { value: 'Lauv', label: 'Lauv' },
  ];

  
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
      <div style={{paddingTop: '1rem', paddingBottom: '1rem'}}>
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
