import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SongsTab from "./SongsTab";
import ArtistTab from "./ArtistTab";
import AlbumTab from "./AlbumTab";
import axios from "axios";

const mainOptions = [
  { value: "songs", label: "Songs" },
  { value: "artists", label: "Artists" },
  { value: "albums", label: "Albums" },
];

function SelectTab({result, setResult, setPlotVar}) {
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [order, setOrder] = useState("most"); // Default to "Most Popular"
  const [limit, setLimit] = useState(10); // Default limit to 10

  const handleMainChange = (selectedOption) => {
    setSelectedMain(selectedOption);
    setSelectedArtists([]);
    setSelectedGenre([]);
    setStartDate(null);
    setEndDate(null);
    setPlotVar(selectedOption);
  };

  const handleArtistChange = (selectedOptions) => {
    setSelectedArtists(selectedOptions);
  };

  const handleGenreChange = (selected) => {
    setSelectedGenre(selected);
  };
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handlePlotClick = () => {
    if (selectedMain?.value === "songs") {
      const fetchTracks = async (artistList, limit, order) => {
        try {
          // Construct the query parameters dynamically
          const params = new URLSearchParams();

          // Add each artist name to the query
          artistList.forEach((artist) =>
            params.append("artistNames[]", artist.value)
          );

          // Add limit and order to the query
          params.append("limit", limit);
          params.append("order", order);

          // Make the Axios GET request
          const response = await axios.get("http://localhost:5000/api/tracks", {
            params: params, // Pass query parameters
          });

          // Handle response
          console.log(response.data);
          setResult(response.data);
        } catch (error) {
          console.error("Error fetching tracks:", error.message);
          throw error;
        }
      };
      const sort = order === "most" ? "desc" : "asc";
      fetchTracks(selectedArtists, limit, sort);
    } else if (selectedMain?.value === "artists") {
      // Helper to build query strings
      const fetchArtists = async (genres, limit, order) => {
        try {
          // Construct the query parameters dynamically
          const params = new URLSearchParams();
          console.log(selectedArtists);

          // Add each artist name to the query
          genres.forEach((genre) => params.append("genres[]", genre.value));

          // Add limit and order to the query
          params.append("limit", limit);
          params.append("order", order);

          // Make the Axios GET request
          const response = await axios.get(
            "http://localhost:5000/api/artists",
            {
              params: params, // Pass query parameters
            }
          );
          console.log(response.data);
          setResult(response.data);
        } catch (err) {
          console.error("Fetch error:", err);
          setError(err.message);
        }
      };
      const sort = order === "most" ? "desc" : "asc";
      fetchArtists(selectedGenre, limit, sort);
    } else if (selectedMain?.value === "albums") {
      const fetchAlbums = async (artistList, startDate, endDate, order) => {
        try {
          // Construct the query parameters dynamically
          const params = new URLSearchParams();

          // Add each artist name to the query
          artistList.forEach((artist) =>
            params.append("artistNames[]", artist.value)
          );

          params.append("start", startDate);
          params.append("end", endDate);
          params.append("order", order);

          // Make the Axios GET request
          const response = await axios.get("http://localhost:5000/api/albums", {
            params: params, // Pass query parameters
          });

          // Handle response
          console.log(response.data);
          setResult(response.data);
        } catch (error) {
          console.error("Error fetching tracks:", error.message);
          throw error;
        }
      };
    //   const sort = order === "most" ? "desc" : "asc";
      fetchAlbums(selectedArtists, formatDate(startDate), formatDate(endDate), "asc");
    }
  };

  return (
    <div className="selectTab">
      <div style={{ margin: "20px" }}>
        <h3>Select Category</h3>
        <Select
          value={selectedMain}
          onChange={handleMainChange}
          options={mainOptions}
          placeholder="Select a category"
        />
      </div>

      {selectedMain?.value === "songs" && (
        <SongsTab
          selectedArtists={selectedArtists}
          handleArtistChange={handleArtistChange}
          order={order}
          setOrder={setOrder}
          limit={limit}
          setLimit={setLimit}
        />
      )}

      {selectedMain?.value === "albums" && (
        <div>
          <AlbumTab
            selectedArtists={selectedArtists}
            handleArtistChange={handleArtistChange}
            order={order}
            setOrder={setOrder}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </div>
      )}
      {selectedMain?.value === "artists" && (
        <ArtistTab
          selectedGenre={selectedGenre}
          handleGenreChange={handleGenreChange}
          order={order}
          setOrder={setOrder}
          limit={limit}
          setLimit={setLimit}
        />
      )}

      {selectedMain &&
        ((selectedMain.value === "artists" && selectedGenre.length > 0) ||
          (selectedMain.value === "albums" &&
            selectedArtists.length > 0 &&
            startDate &&
            endDate) ||
          (selectedMain.value === "songs" && selectedArtists.length > 0)) && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={handlePlotClick}
              style={{
                margin: "1rem",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Plot
            </button>
          </div>
        )}
    </div>
  );
}

export default SelectTab;
