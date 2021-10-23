import React, { useRef } from 'react';
import '../index.css';
import { AiFillHome } from 'react-icons/ai';
import { ImArrowRight } from 'react-icons/im';

export const ToolBar = ({ fetch, fetchCity }) => {
  const cityName = useRef();

  const toHome = () => {
    fetch();
    cityName.current.value = '';
  };

  const handler = () => {
    fetchCity(cityName.current.value);
    cityName.current.value = '';
  };

  return (
    <div className='toolbar-container'>
      <button onClick={toHome}>
        <AiFillHome />
      </button>

      <input type='text' ref={cityName} placeholder='City' />
      <button onClick={handler}>
        <ImArrowRight />
      </button>
    </div>
  );
};
