import React from 'react';

const TVCard = ({ show, onAddToWatchlist, isInWatchlist, onShowDetail }) => {
  const { show: tvShow } = show;

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html || '';
    return tmp.textContent || tmp.innerText || '';
  };

  const summary = stripHtml(tvShow.summary);
  const shortSummary =
    summary.length > 150 ? summary.substring(0, 150) + '...' : summary;

  return (
    <div className="tv-card">
      <div className="tv-card-image">
        {tvShow.image ? (
          <img src={tvShow.image.medium} alt={tvShow.name} />
        ) : (
          <div className="no-image">Resim Yok</div>
        )}
      </div>

      <div className="tv-card-content">
        <h3>{tvShow.name}</h3>

        <div className="tv-card-info">
          <span className="genre">
            {tvShow.genres && tvShow.genres.length > 0
              ? tvShow.genres.join(', ')
              : 'Tür belirtilmemiş'}
          </span>
          <span className="language">{tvShow.language || 'N/A'}</span>
          <span className="rating">
            ⭐ {tvShow.rating.average || 'N/A'}
          </span>
        </div>

        <p className="summary">{shortSummary}</p>

        <div className="tv-card-actions">
          <button
            onClick={() => onShowDetail(tvShow.id)}
            className="detail-btn"
          >
            Detay
          </button>

          <button
            onClick={() => onAddToWatchlist(show)}
            disabled={isInWatchlist} 
            className="watchlist-btn"
          >
            {isInWatchlist ? '✓ Listede' : '+ Listeye Ekle'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TVCard;