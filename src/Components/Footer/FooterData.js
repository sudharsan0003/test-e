import React from 'react';

const FooterData = () => {
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-6 md:place-items-center md:items-start '>
      <div>
        <h3 className='font-titleFont text-white text-base font-semibold mb-3'>
          Get To Know Us
        </h3>
        <ul className='flex flex-col gap-2 font-bodyFont'>
          <li className='footerLink'>Careers</li>
          <li className='footerLink'> Blog</li>
          <li className='footerLink'>About</li>
          <li className='footerLink'>Investor</li>
          <li className='footerLink'>Devices</li>
        </ul>
      </div>
      <div>
        <h3 className='font-titleFont text-white text-base font-semibold mb-3'>
          Work With Us
        </h3>
        <ul className='flex flex-col gap-2 font-bodyFont'>
          <li className='footerLink'>Sell Products</li>
          <li className='footerLink'>Bussiness</li>
          <li className='footerLink'>Become an Affiliate</li>
          <li className='footerLink'>Advertise</li>
          <li className='footerLink'>Hub</li>

          <li className='footerLink'>Sell Apps</li>
        </ul>
      </div>
      <div>
        <h3 className='font-titleFont text-white text-base font-semibold mb-3'>
          Payment Products
        </h3>
        <ul className='flex flex-col gap-2 font-bodyFont'>
          <li className='footerLink'>Bussiness Card</li>
          <li className='footerLink'>Reward Point</li>
          <li className='footerLink'>Reload Points</li>
          <li className='footerLink'>Currencies</li>
        </ul>
      </div>
      <div>
        <h3 className='font-titleFont text-white text-base font-semibold mb-3'>
          Let us Help
        </h3>
        <ul className='flex flex-col gap-2 font-bodyFont'>
          <li className='footerLink'>Your Account</li>
          <li className='footerLink'>Your Order</li>
          <li className='footerLink'>Returns</li>
          <li className='footerLink'>Replacement</li>
          <li className='footerLink'>FAQ &Help</li>
        </ul>
      </div>
    </div>
  );
};

export default FooterData;
