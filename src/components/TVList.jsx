import React from 'react';
import TVCard from './TVCard';

const TVList = ({ shows, onAddToWatchlist, isInWatchlist, onShowDetail }) => {
  if (!shows || shows.length === 0) {
    return null; 
  }

  return (
    <div className="tv-list">
      {shows.map((item) => (
        <TVCard
          key={item.show.id} 
          show={item}
          onAddToWatchlist={onAddToWatchlist}
          isInWatchlist={isInWatchlist(item.show.id)}
          onShowDetail={onShowDetail}
        />
      ))}
    </div>
  );
};

export default TVList;