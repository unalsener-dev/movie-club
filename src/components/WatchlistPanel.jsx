import React from 'react';

const WatchlistPanel = ({ watchlist, onRemove, onClear }) => {
  return (
    <div className="watchlist-panel">
      <div className="watchlist-header">
        <h2>Gösterime Girecekler ({watchlist.length})</h2>
      </div>

      {watchlist.length === 0 ? (
        <p className="empty-watchlist">Henüz listeye film eklenmedi 🎞️</p>
      ) : (
        <>
          <ul className="watchlist-items">
            {watchlist.map((item) => {
              const show = item.show;
              const image =
                show.image?.medium ||
                'https://via.placeholder.com/60x90?text=No+Image';
              const rating = show.rating?.average || '—';

              return (
                <li key={show.id} className="watchlist-item">
                  <img
                    src={image}
                    alt={show.name}
                    className="watchlist-thumb"
                  />
                  <div className="watchlist-info">
                    <h4 className="show-name">{show.name}</h4>
                    <div className="show-rating">
                      ⭐ <span>{rating}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(show.id)}
                    className="remove-btn"
                  >
                    Kaldır
                  </button>
                </li>
              );
            })}
          </ul>

          <button onClick={onClear} className="clear-btn">
            Listeyi Temizle
          </button>
        </>
      )}
    </div>
  );
};

export default WatchlistPanel;
