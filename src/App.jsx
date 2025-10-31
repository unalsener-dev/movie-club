import React from 'react';
import axios from 'axios';
import './App.css';
import SearchBox from './components/SearchBox';
import Filters from './components/Filters';
import Footer from './components/Footer';
import ShowDetail from './components/ShowDetail';
import Home from './components/Home';

const showsReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    case 'SET_QUERY':
      return { ...state, query: action.payload, currentPage: 1 };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload, currentPage: 1 };
    case 'ADD_WATCHLIST':
      const exists = state.watchlist.some(
        (item) => item.show.id === action.payload.show.id
      );
      if (!exists) {
        return { ...state, watchlist: [...state.watchlist, action.payload] };
      }
      return state;
    case 'REMOVE_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (item) => item.show.id !== action.payload
        ),
      };
    case 'CLEAR_WATCHLIST':
      return { ...state, watchlist: [] };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_PAGE_SIZE':
      return { ...state, pageSize: action.payload, currentPage: 1 };
    case 'SET_SELECTED_SHOW':
      return { ...state, selectedShowId: action.payload };
    case 'CLEAR_SELECTED_SHOW':
      return { ...state, selectedShowId: null };
    default:
      throw new Error(`Bilinmeyen action: ${action.type}`);
  }
};

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  query: localStorage.getItem('searchQuery') || 'friends',
  filters: {
    genre: '',
    language: '',
    minRating: 0,
  },
  watchlist: JSON.parse(localStorage.getItem('watchlist')) || [],
  currentPage: 1,
  pageSize: 6, 
  selectedShowId: null,
};

function App() {
  const [state, dispatch] = React.useReducer(showsReducer, initialState);

  const fetchShows = React.useCallback(async () => {
    if (!state.query.trim()) return;
    dispatch({ type: 'FETCH_INIT' });
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(
          state.query
        )}`
      );
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    } catch (error) {
      console.error('API hatası:', error);
      dispatch({ type: 'FETCH_FAILURE' });
    }
  }, [state.query]);

  React.useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  React.useEffect(() => {
    localStorage.setItem('searchQuery', state.query);
  }, [state.query]);

  React.useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
  }, [state.watchlist]);

  const handleSearchChange = (query) => {
    dispatch({ type: 'SET_QUERY', payload: query });
  };
  const handleFilterChange = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };
  const handleAddToWatchlist = (show) => {
    dispatch({ type: 'ADD_WATCHLIST', payload: show });
  };
  const handleRemoveFromWatchlist = (showId) => {
    dispatch({ type: 'REMOVE_WATCHLIST', payload: showId });
  };
  const handleClearWatchlist = () => {
    dispatch({ type: 'CLEAR_WATCHLIST' });
  };
  const handlePageChange = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };
  const handlePageSizeChange = (size) => {
    dispatch({ type: 'SET_PAGE_SIZE', payload: size });
  };
  const handleShowDetail = (showId) => {
    dispatch({ type: 'SET_SELECTED_SHOW', payload: showId });
  };
  const handleBackToList = () => {
    dispatch({ type: 'CLEAR_SELECTED_SHOW' });
  };

  const filteredShows = state.data.filter((item) => {
    const show = item.show;
    const { genre, language, minRating } = state.filters;
    const genreMatch = !genre || (show.genres && show.genres.includes(genre));
    const languageMatch = !language || show.language === language;
    const ratingMatch =
      !minRating || (show.rating.average && show.rating.average >= minRating);
    return genreMatch && languageMatch && ratingMatch;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredShows.length / state.pageSize)
  );

  React.useEffect(() => {
    if (state.currentPage > totalPages) {
      dispatch({ type: 'SET_PAGE', payload: 1 });
    }
  }, [totalPages]);

  const startIndex = (state.currentPage - 1) * state.pageSize;
  const paginatedShows = filteredShows.slice(
    startIndex,
    startIndex + state.pageSize
  );

  const isInWatchlist = (showId) => {
    return state.watchlist.some((item) => item.show.id === showId);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>🎬 Kampüs Film Kulübü</h1>
          <p>Süleyman Demirel Üniversitesi - Film Keşif Platformu</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="search-filter-section">
            <SearchBox
              searchQuery={state.query}
              onSearchChange={handleSearchChange}
            />
            <Filters
              filters={state.filters}
              onFilterChange={handleFilterChange}
              shows={state.data}
            />
          </div>

          {state.selectedShowId ? (
            <ShowDetail
              showId={state.selectedShowId}
              onBack={handleBackToList}
            />
          ) : (
            <Home
              isLoading={state.isLoading}
              isError={state.isError}
              filteredShows={filteredShows}
              currentShows={paginatedShows}
              currentPage={state.currentPage}
              totalPages={totalPages}
              pageSize={state.pageSize}
              watchlist={state.watchlist}
              onAddToWatchlist={handleAddToWatchlist}
              isInWatchlist={isInWatchlist}
              onShowDetail={handleShowDetail}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
              onClearWatchlist={handleClearWatchlist}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              handleFetchShows={fetchShows}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
