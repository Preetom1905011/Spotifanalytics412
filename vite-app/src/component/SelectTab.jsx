import React, { useState } from 'react';
import Select from 'react-select';
import ArtistTab from './ArtistTab'; // Correct import

export default function MultiSelectWithRadioAndLimit() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const options = [
    { value: 'artist', label: 'Artist' },
    { value: 'song', label: 'Song' },
    { value: 'album', label: 'Album' },
  ];

  const handleChange = (selected) => {
    setSelectedOption(selected);
    setShowPopup(true); // Show popup when an option is selected
  };

  const closePopup = () => {
    setShowPopup(false); // Hide popup when closed
  };

  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Choose an option"
        isClearable
      />

      {/* Popup Block */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button onClick={closePopup} className="close-button">
              Close
            </button>
            {/* Render ArtistTab and pass the selected option as a prop */}
            <ArtistTab selectedOption={selectedOption} />
          </div>
        </div>
      )}
    </div>
  );
}
