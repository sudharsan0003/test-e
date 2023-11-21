import React, { useEffect, useState } from 'react';
import Banner from '../Components/Home/Banner';
import Product from '../Components/Home/Product';

const Home = () => {
  // const [reload, setReload] = useState(false);

  // useEffect(() => {
  //   if (!reload) {
  //     setReload(true);
  //   } else {
  //     window.location.reload();
  //   }
  // }, [reload]);
  return (
    <div>
      <Banner />
      <div className='w-full -mt-32  py-10'>
        <Product />
      </div>
    </div>
  );
};

export default Home;
