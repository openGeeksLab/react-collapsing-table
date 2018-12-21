//React
import React from 'react';
import { SearchPropType } from '../utils/propTypes';
//Components

const Search = ({
  searchString,
  searchRows,
  clearSearch,
  searchIcon = 'search',
  clearIcon = '&#9587;',
  showPageSizes = true,
  onPageSizeChange = () => {}
}) => {
  const buttonContent = searchString.length ? clearIcon : searchIcon;

  return (
    <div className="react-collapsible-search">
      {showPageSizes && (
        <select onChange={onPageSizeChange}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="">All</option>
        </select>
      )}
      <input onChange={searchRows} value={searchString} placeholder="search" />
      <button className="react-collapsible-clear" onClick={clearSearch}>
        {buttonContent}
      </button>
    </div>
  );
};

Search.propTypes = SearchPropType;

export default Search;
