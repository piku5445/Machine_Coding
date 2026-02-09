import React from 'react';
import './Card.css';

function Card({ doctor }) {
  return (
    <div className="doctor-card">
      <div className="card-top">
        <div className="doctor-icon">🏥</div>

        <div className="doctor-info">
          <h3 className="doctor-name">{doctor.name}</h3>
          <p className="doctor-address">📍 {doctor.vicinity}</p>

          {doctor.rating && (
            <div className="rating">
              ⭐ {doctor.rating}
            </div>
          )}
        </div>
      </div>

      <div className="card-actions">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="map-btn"
        >
          View on Maps
        </a>
      </div>
    </div>
  );
}

export default Card;
