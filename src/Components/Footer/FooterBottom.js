import React from 'react';
import FooterData from './FooterData';

const FooterBottom = () => {
  return (
    <div className='w-full bg-e_light text-whiteText '>
      <div className='w-full border-b-[1px] border-gray-500 p-10'>
        <div className='max-w-5xl mx-auto text-gray-300 '>
          <div>
            <FooterData />
          </div>
        </div>
      </div>
      <div className='font-bodyFont text-white text-xs text-center flex flex-col justify-center mt-5 p-3'>
        <p>Condition of use Privacy Notice</p>
        <p>© 1982-2023, Amazon.com,Inc.or.its affiliates</p>
      </div>
    </div>
  );
};

export default FooterBottom;
