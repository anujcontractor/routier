import React, { useState, useContext, useEffect } from 'react'
import { baseUrl } from "../../shared.js";
import search from "../Assets/main/search_main.svg";
import styles from "./Main.module.css";
import PlaceContext from '../../Context/PlaceContext';
import { Link } from 'react-router-dom';
import './SearchComponent.css'

const SearchComponent = (props) => {

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

  const handleSubmit = () => {
    props.setProgress(30);
    props.setProgress(100);

  }

  useEffect(() => {
    const handleDocumentClick = () => {
      setSearchResults([]);
    };

    // Attach click event listener to the document
    document.addEventListener('click', handleDocumentClick);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className='searchCont' >
      <form className={styles.searchBar} onSubmit={handleSubmit} id="searchForm">
        <img src={search} className={styles.searchIcon} alt="search-icon" />
        <label htmlFor="text" className="form-label"></label>
        <input
          type="text"
          placeholder="Search Places to go..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Link to={`/place/${searchResults[0]?._id}`}>
          <button type="submit">Search</button>
        </Link>
      </form>


      {searchResults.length > 0 ? (
        <ul className="search-results">
          {searchResults.map((result) => (
            <li key={result._id} className="search-result-item">
              <Link to={`/place/${result._id}`} className="search-result-link">
                {result.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        null
      )}
    </div>
  );
};

export default SearchComponent;
