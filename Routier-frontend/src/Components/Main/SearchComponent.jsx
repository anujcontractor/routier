import React, { useState, useEffect } from "react";
import { baseUrl } from "../../shared.js";

const SearchComponent = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch all data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Replace the following line with your actual data fetching logic
      const baseurl = baseUrl;
      const url = baseurl + "/api/placeinfo";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      
      setAllData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // console.log(data);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Perform search in the fetched data
    const results = allData.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <div>
      <h2>Place Search</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result._id}>{result.name}</li>
          ))}
        </ul>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
};

export default SearchComponent;
