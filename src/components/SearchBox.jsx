import React from 'react';

const SearchBox = ({ searchQuery, onSearchChange }) => {
  const handleChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="search-box">
      <label htmlFor="search">
        <strong>Dizi Ara:</strong>
      </label>
      <input
        id="search"
        type="text"
        value={searchQuery} 
        onChange={handleChange}
        placeholder="Dizi adı yazın..."
      />
    </div>
  );
};

export default SearchBox;