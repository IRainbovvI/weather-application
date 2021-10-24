import { DateTime } from 'luxon';
import React, { useRef, useEffect } from 'react';
import { ToolBar } from './ToolBar';

export const Weather = ({ data, fetch, fetchCity, error }) => {
  const now = DateTime.now();
  const card = useRef();

  useEffect(() => {
    let image = require(`../img/clear.jpg`);
    if (700 < data.weather[0].id && data.weather[0].id < 782) {
      image = require(`../img/mist.jpg`);
    } else {
      image = require(`../img/${data.weather[0].main.toLowerCase()}.jpg`);
    }
    card.current.style.backgroundImage = `url(${image.default})`;
    console.log(image);
  }, [data.weather]);

  return (
    <div className='container'>
      <section className='card' ref={card}>
        <div className='card-inner'>
          <div className='card-header'></div>
          <ToolBar fetch={fetch} fetchCity={fetchCity} />
          <div className='card-content'>
            {error ? (
              <p>Wrong city. Try again.</p>
            ) : (
              <div>
                <p className='name'>{data.name}</p>
                <div className='text'>
                  <table>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>
                          <span>{data.main.temp}&#8451;</span>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>{data.main.temp_min}&#8451;</td>
                        <td></td>
                        <td>{data.main.temp_max}&#8451;</td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: '1rem' }}>Min</td>
                        <td></td>
                        <td style={{ fontSize: '1rem' }}>Max</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td style={{ position: 'relative' }}>
                          {data.weather[0].main}
                          <img
                            style={{
                              position: 'absolute',
                              top: '-30%',
                              width: '30%'
                            }}
                            src={`${process.env.REACT_APP_ICON_URL}/${data.weather[0].icon}.png`}
                            alt=''
                          />
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Humidity: {data.main.humidity}%</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>{now.setLocale('en').toFormat('T')}</p>
                <p>{now.setLocale('en').toFormat('cccc')}</p>
                <p>{now.setLocale('en').toFormat('DDD')}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
