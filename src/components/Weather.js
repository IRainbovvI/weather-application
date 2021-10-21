import React from 'react';
import '../index.css';

export const Weather = ({ data }) => {
  return (
    <section className='card'>
      <div className='card-content'>{data.name}</div>
    </section>
  );
};
