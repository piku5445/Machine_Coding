import React from 'react';
import Card from './Card';
import './List.css';

function List({ doctors }) {
  if (!doctors || doctors.length === 0) {
    return null;
  }

  return (
    <div className="doctors-grid">
      {doctors.map((doctor, index) => (
        <Card key={index} doctor={doctor} />
      ))}
    </div>
  );
}

export default List;
