//React
import React from 'react';
import { SearchPropType } from '../utils/propTypes'
//Components

const Search = ({ searchString, searchRows, clearSearch, searchIcon = "search", clearIcon = "&#9587;" }) => {
    const buttonContent = searchString.length ? clearIcon : searchIcon;

    return (
        <div className="react-collapsible-search">
            <input onChange={ searchRows } value={ searchString } placeholder="search"/>
            <button className="react-collapsible-clear" onClick={ clearSearch }>{buttonContent}</button>
        </div>
    );
};

Search.propTypes = SearchPropType;

export default Search
