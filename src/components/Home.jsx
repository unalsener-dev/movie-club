import React from 'react';
import TVList from './TVList';
import WatchlistPanel from './WatchlistPanel';
import Pagination from './Pagination';

const Home = ({
  isLoading,
  isError,
  filteredShows,
  currentShows,
  currentPage,
  totalPages,
  pageSize,
  watchlist,
  onAddToWatchlist,
  isInWatchlist,
  onShowDetail,
  onRemoveFromWatchlist,
  onClearWatchlist,
  onPageChange,
  onPageSizeChange,
  handleFetchShows,
}) => {
  return (
    <div className="content-wrapper">
      <div className="main-content">
        
        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Diziler yükleniyor...</p>
          </div>
        )}

        {isError && (
          <div className="error">
            <p>❌ Diziler yüklenirken hata oluştu</p>
            <button onClick={handleFetchShows} className="retry-btn">
              Tekrar Dene
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="results-info">
              <h3>📺 Diziler</h3>
              <p>
                {filteredShows.length} dizi bulundu • Sayfa {currentPage} /{' '}
                {totalPages}
              </p>
            </div>

            {filteredShows.length === 0 ? (
              <div className="empty-state">
                <p>😔 Arama kriterlerinize uygun dizi bulunamadı</p>
              </div>
            ) : (
              // Liste ve Sayfalama
              <>
                <TVList
                  shows={currentShows}
                  onAddToWatchlist={onAddToWatchlist}
                  isInWatchlist={isInWatchlist}
                  onShowDetail={onShowDetail}
                />
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  onPageChange={onPageChange}
                  onPageSizeChange={onPageSizeChange} 
                />
              </>
            )}
          </>
        )}
      </div>

      <WatchlistPanel
        watchlist={watchlist}
        onRemove={onRemoveFromWatchlist}
        onClear={onClearWatchlist}
      />
    </div>
  );
};

export default Home;