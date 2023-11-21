import React from 'react';
import { useState } from 'react';
import Slider from 'react-slick';
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  bannerImgFour,
  bannerImgFive,
  bannerImgSix,
} from '../../Assets';

const Banner = () => {
  const [dotActive, setdotActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setdotActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: 'absolute',
          top: '70%',
          left: '0',
          right: '0',
          margin: '0 auto',
          transform: 'translate(-50% -50%)',
          width: '210px',
        }}
      >
        <ul
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {' '}
          {dots}{' '}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#131921',
                color: 'white',
                padding: '8px 0',
                cursor: 'pointer',
                border: '2px solid #fff',
              }
            : {
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#232F3E',
                color: 'white',
                padding: '8px 0',
                cursor: 'pointer',
                border: '2px solid #fff',
              }
        }
      >
        {i + 1}
      </div>
    ),
  };

  return (
    <div className='w-full'>
      <div className='w-full h-full relative'>
        <Slider {...settings}>
          <div>
            <img src={bannerImgOne} alt='bannerImages' />
          </div>
          <div>
            <img src={bannerImgTwo} alt='bannerImages' />
          </div>
          <div>
            <img src={bannerImgThree} alt='bannerImages' />
          </div>
          <div>
            <img src={bannerImgFour} alt='bannerImages' />
          </div>
          <div>
            <img src={bannerImgFive} alt='bannerImages' />
          </div>
          <div>
            <img src={bannerImgThree} alt='bannerImages' />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
