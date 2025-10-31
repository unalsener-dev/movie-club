import React from 'react';
import axios from 'axios';

// Bu bileşen kendi state'ini yönetmek için useState kullanıyor 
const ShowDetail = ({ showId, onBack }) => {
  const [detail, setDetail] = React.useState(null);
  const [episodes, setEpisodes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  // Bileşen yüklendiğinde ve showId değiştiğinde veri çek 
  React.useEffect(() => {
    // Ayrı API çağrıları için async fonksiyon
    const fetchDetails = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        // İki API isteğini aynı anda yap 
        const detailUrl = `https://api.tvmaze.com/shows/${showId}`;
        const episodesUrl = `https://api.tvmaze.com/shows/${showId}/episodes`;

        // Promise.all ile iki isteği paralel olarak bekle 
        const [detailResponse, episodesResponse] = await Promise.all([
          axios.get(detailUrl), // 
          axios.get(episodesUrl),
        ]);

        setDetail(detailResponse.data);
        setEpisodes(episodesResponse.data);
      } catch (error) {
        setIsError(true); // Hata state'ini ayarla
      } finally {
        setIsLoading(false); // Yüklemeyi bitir
      }
    };

    fetchDetails();
  }, [showId]); 
  // Koşullu render
  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Detaylar Yükleniyor...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error">
        <p>❌ Detaylar çekilirken hata oluştu.</p>
        <button onClick={onBack} className="back-btn">
          Geri Dön
        </button>
      </div>
    );
  }

  if (!detail) return null; 

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html || '';
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="show-detail">
      <button onClick={onBack} className="back-btn">
        ← Geri Dön
      </button>

      <div className="detail-header">
        {detail.image && <img src={detail.image.original} alt={detail.name} />}
        <div className="detail-info">
          <h1>{detail.name}</h1>
          <p>
            <strong>Tür:</strong> {detail.genres.join(', ')}
          </p>
          <p>
            <strong>Dil:</strong> {detail.language}
          </p>
          <p>
            <strong>Puan:</strong> {detail.rating.average || 'N/A'}
          </p>
          <div
            className="detail-summary"
            dangerouslySetInnerHTML={{
              __html: detail.summary || 'Özet yok.',
            }}
          />

        </div>
      </div>

      <div className="episodes-section">
        <h2>Bölümler ({episodes.length})</h2>
        <ul className="episodes-list">
          {episodes.map((ep) => (
            <li key={ep.id} className="episode-item">
              <strong>
                S{String(ep.season).padStart(2, '0')}E
                {String(ep.number).padStart(2, '0')}:
              </strong>
              <span> {ep.name}</span>
              <span className="episode-date">({ep.airdate})</span>
              <p>{stripHtml(ep.summary)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowDetail;