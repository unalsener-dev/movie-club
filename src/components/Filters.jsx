import React from 'react';

const Filters = ({ filters, onFilterChange, shows }) => {
  // Veriden dinamik olarak türleri ve dilleri çek
  const genres = [...new Set(shows.flatMap((item) => item.show.genres || []))];
  const languages = [
    ...new Set(shows.map((item) => item.show.language).filter(Boolean)),
  ];

  const handleGenreChange = (event) => {
    onFilterChange({
      ...filters,
      genre: event.target.value,
    });
  };

  const handleLanguageChange = (event) => {
    onFilterChange({
      ...filters,
      language: event.target.value,
    });
  };

  const handleRatingChange = (event) => {
    onFilterChange({
      ...filters,
      minRating: Number(event.target.value),
    });
  };

  const handleReset = () => {
    onFilterChange({
      genre: '',
      language: '',
      minRating: 0,
    });
  };

  return (
    <div className="filters">
      <div className="filter-item">
        <label htmlFor="genre">Tür:</label>
        <select id="genre" value={filters.genre} onChange={handleGenreChange}>
          <option value="">Tümü</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="language">Dil:</label>
        <select
          id="language"
          value={filters.language}
          onChange={handleLanguageChange}
        >
          <option value="">Tümü</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="rating">IMDb:</label>
        <input
          id="rating"
          type="number"
          min="0"
          max="10"
          step="0.5"
          value={filters.minRating}
          onChange={handleRatingChange}
        />
      </div>

      <button onClick={handleReset} className="reset-btn">
        Filtreleri Sıfırla
      </button>
    </div>
  );
};

export default Filters;