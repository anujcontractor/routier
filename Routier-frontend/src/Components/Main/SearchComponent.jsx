import React, { useState, useContext, useEffect } from 'react'
import { baseUrl } from "../../shared.js";
import search from "../Assets/main/search_main.svg";
import styles from "./Main.module.css";
import PlaceContext from '../../Context/PlaceContext';
import { Link } from 'react-router-dom';

const SearchComponent = () => {

  const context = useContext(PlaceContext);
  const { fetchData, setSearchTerm, setSearchResults, allData, searchTerm, searchResults } = context;

  useEffect(() => {
    // Fetch all data when the component mounts
    fetchData();
  }, []);

  useEffect(() => {

    // console.log(allData);


  }, [allData]);



  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Perform search in the fetched data
    const results = allData.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(results);
    console.log(searchResults)
  };

  const handleSubmit = ()=>{
      
      
  }

  return (
    <div>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <img src={search} className={styles.searchIcon} alt="search-icon" />
        <label htmlFor="text" className="form-label"></label>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Link to='/place'>
        <button type="submit">Search</button>
        </Link>
      </form>


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
