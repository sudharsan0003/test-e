import React from 'react';
import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { LuLogOut } from 'react-icons/lu';
import { CiLocationOn } from 'react-icons/ci';
import { FaSearch } from 'react-icons/fa';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import Data from '../../Data/Data';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userSignOut } from '../../redux/amazonSlice';

const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const products = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  console.log(userInfo);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userSignOut());
      })
      .catch((error) => {});
    navigate('/');
  };
  return (
    <div className='w-full bg-e_blue text-whiteText px-4 py-3 flex justify-around items-center gap-5 sticky top-0 z-50'>
      <Link to='/home'>
        <div className='headerHover flex flex-col'>
          <SiHomeassistantcommunitystore className='w-24 mt-2' />
          <span className='text-md font-semibold'>E - Mart</span>
        </div>
      </Link>

      <Link to='/'>
        <div className='flex flex-col items-start justify-center headerHover'>
          {userInfo ? (
            <p className='text-sm text-gray-100 font-medium'>
              {userInfo.email}
            </p>
          ) : (
            <p className='text-xs text-lightText font-light'>Hello,Sign in</p>
          )}
          <p className='text-sm text-center font-semibold -mt-1 hidden mdl:inline-flex'>
            Accounts
          </p>
        </div>
      </Link>
      <Link to='/cart'>
        <div className='flex items-center justify-center headerHover relative  p-2'>
          <HiOutlineShoppingCart />
          <p className='text-xs font-semibold  text-whiteText px-3'>
            Cart
            <span className='absolute text-xs -top-0.5 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-e_blue rounded-full flex justify-center items-center'>
              {products.length > 0 ? products.length : 0}
            </span>
          </p>
        </div>
      </Link>
      <Link to={`/profile`}>
        {userInfo && (
          <div>
            <img
              className='w-8 h-8 rounded-full '
              src={
                userInfo
                  ? userInfo.image
                  : 'https://e7.pngegg.com/pngimages/343/677/png-clipart-computer-icons-user-profile-login-my-account-icon-heroes-black-thumbnail.png'
              }
              alt='logo'
            />
          </div>
        )}
      </Link>
      {userInfo && (
        <div onClick={handleLogout} className='headerHover '>
          <LuLogOut className='w-6 h-6' />
        </div>
      )}
    </div>
  );
};

export default Header;

{
  /* <div className='headerHover hidden mdl:inline-flex'>
        <CiLocationOn className='w-8 h-8' />
        <p className='text-sm pl-2 text-lightText font-light flex flex-col'>
          Deliver to
          <span className='text-sm font-semibold text-center -mt-1 text-whiteText'>
            Coimbatore
          </span>
        </p>
      </div> */
}
{
  /* <div className='h-10 rounded-md hidden md:flex flex-grow relative'>
        <input
          type='text'
          placeholder='Search Products'
          className='h-full text-base text-e_blue flex-grow outline-none border-none px-2 rounded-tl-md rounded-bl-md'
        />
        <span className='w-12 h-full flex items-center justify-center bg-e_yellow hover:bg-#f3a847 duration-300 text-e_blue cursor-pointer rounded-tr-md rounded-br-md'>
          <FaSearch />
        </span>
      </div> */
}
