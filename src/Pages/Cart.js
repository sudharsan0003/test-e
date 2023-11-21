import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { TiTickOutline } from 'react-icons/ti';
import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {
  deleteItem,
  resetCart,
  increment,
  decrement,
} from '../redux/amazonSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.amazon.products);
  const [totalPrice, setTotalPrice] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const notify = () => {
    setSuccessMsg('Your Order has been Placed');
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  useEffect(() => {
    let Total = 0;
    products.map((item) => {
      Total += item.price * item.quantity;
      return setTotalPrice(Total.toFixed(2));
    });
  }, [products]);
  return (
    <div className='w-full bg-gray-300 p-4'>
      {products.length > 0 ? (
        <div className='container mx-auto h-auto grid grid-cols-5 gap-8'>
          <div className='w-full h-full bg-white px-4 col-span-4'>
            <div className='font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400 py-3'>
              <h2 className='text-3xl font-medium'>Here our Cart</h2>
              <h4 className='text-xl font-normal'>Total</h4>
            </div>
            <div>
              {products.map((item) => (
                <div
                  key={item.id}
                  className='w-full border-b-[1px] border-b-gray-500 p-4 flex items-center gap-6'
                >
                  <div className='w-1/5'>
                    <img
                      className='w-full h-40 object-contain'
                      src={item.image}
                    />
                  </div>
                  <div className='w-3/5'>
                    <h2 className='font-semibold text-md'>{item.title}</h2>
                    <p className='pr-10 text-sm'>
                      {item.description.substring(0, 80)}...
                    </p>
                    <p className='text-base mt-2'>
                      Unit Price <span>${item.price}</span>
                    </p>
                    <div className='bg-[#F0F2F2] flex justify-center items-center gap-1 w-32 py-1 text-center drop-shadow-1g rounded-md '>
                      <p>Qty</p>
                      <p
                        onClick={() => dispatch(decrement(item.id))}
                        className='cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300'
                      >
                        -
                      </p>
                      <p>{item.quantity}</p>
                      <p
                        onClick={() => dispatch(increment(item.id))}
                        className='cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300'
                      >
                        +
                      </p>
                      <div
                        onClick={() => dispatch(deleteItem(item.id))}
                        className='bg-red-500 px-2 py-1 mb-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300 cursor-pointer'
                      >
                        <AiOutlineDelete />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='text-lg font-titleFont font-semibold'>
                      <p>$ {item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <button
                onClick={() => dispatch(resetCart())}
                className='bg-red-500 px-2 py-1 mb-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300 cursor-pointer'
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className='w-full h-44 bg-white col-span-1 flex flex-col justify-center items-center p-4'>
            <div>
              <p className='flex gap-2 items-start text-sm'>
                <span>
                  <TiTickOutline className='bg-green-300 rounded-full w-6 h-6' />
                </span>
                Your order ready to Shipping , Click here to go...
              </p>
            </div>
            <div>
              <p className='font-semibold  px-10 py-1 flex items-center justify-between mt-16'>
                Total:
                <span className='text-sm font-bold mt-1 pl-1'>
                  ${totalPrice}
                </span>
              </p>
            </div>
            <div>
              <button
                class='w-full font-titleFont font-medium p-4 text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-2'
                onClick={notify}
              >
                Proceed to Buy
              </button>
              <div className='w-full flex justify-center items-center py-32 -mt-10'>
                <p className='border-[1px] border-green-600 text-green-500 font-titleFont text-lg font-semibold -mt-28 px-6 py-2'>
                  {successMsg}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='gap-2 py-10 flex justify-center'>
          <div className='w-3/5 bg-white flex flex-col items-center rounded-md shadow-lg'>
            <h1 className='font-titleFont text-xl font-bold mt-4'>
              Your Cart is Empty Now
            </h1>
            <p className='text-sm text-center mt-4'>
              Enjoy upto 50 % saving on All Products{' '}
            </p>
            <Link to='/'>
              <button className='mt-6 mb-5 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont font-semibold text-lg'>
                Continue To Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
      <div>
        <ToastContainer
          position='top-left'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          Draggable
          pauseOnHovertheme='dark'
        />
      </div>
    </div>
  );
};

export default Cart;
