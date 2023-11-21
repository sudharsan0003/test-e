import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { app, provider } from '../firebase.config';
import { RotatingLines } from 'react-loader-spinner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/amazonSlice';
import { ToastContainer, toast } from 'react-toastify';

const Signin = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [userEmailErr, setUserEmailErr] = useState('');
  const [userPassErr, setUserPassErr] = useState('');
  const [loading, setLoading] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);

  //email
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail('');
  };
  //password
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword('');
  };
  //email validation
  function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const handleSignInWithPopup = (e) => {
    e.preventDefault();
    signInWithPopup(
      auth,
      provider.setCustomParameters({ prompt: 'select_account' })
    ).then((result) => {
      const user = result.user;
      dispatch(
        setUserInfo({
          _id: user.uid,
          userName: user.displayName,
          email: user.email,
          image: user.photoURL,
        })
      );
      setTimeout(() => {
        console.log('hello');
        navigate('/home');
      }, 1000);
    });
  };

  //submit function
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrEmail('Email is mandatory');
    } else {
      if (!validateEmail(email)) {
        setErrEmail('Enter a Valid Email');
      }
    }
    if (!password) {
      setErrPassword('Password is mandatory');
    } else {
      if (password.length < 8) {
        setErrPassword('Password must be at least 8 characters');
      }
    }
    if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(
            setUserInfo({
              _id: user.uid,
              userName: user.displayName,
              email: user.email,
              image: user.photoURL,
            })
          );
          // ...
          setLoading(true);
          setSuccessMsg('Successfully Logged in! Welcome you back!');
          setTimeout(() => {
            // console.log('world');
            // navigate('/home');
            window.location.href = '/home';
          }, 1000);
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode.includes('auth/wrong-password')) {
            setUserEmailErr('Invalid Email');
          }
          if (errorCode.includes('auth/wrong-password')) {
            setUserPassErr('Wrong Password ! try again');
          }
          console.log('...');
        });
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className='w-full'>
      <div className='w-full bg-white pb-10 '>
        {successMsg ? (
          <div className='w-full flex justify-center items-center py-32'>
            <p className='border-[1px] border-green-600 text-green-500 font-titleFont text-lg font-semibold px-6 py-2'>
              {successMsg}
            </p>
          </div>
        ) : (
          <form className='w-[350px] mx-auto flex flex-col items-center '>
            <div className='w-full border bg-gray-300 border-zinc-200 p-6 mt-5'>
              <h2 className='font-titleFont text-3xl font-medium mb-4 '>
                Sign in
              </h2>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium '>Enter your Email</p>
                  <input
                    type='email'
                    value={email}
                    onChange={handleEmail}
                    className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput '
                  />
                  {errEmail && (
                    <p className='text-red-500 italic text-[10px] font-semibold items-center gap-2 px-1 -mt-1'>
                      {errEmail}
                    </p>
                  )}
                  {userEmailErr && (
                    <p className='text-red-500 italic text-[10px] font-semibold items-center gap-2 px-1 -mt-1'>
                      {userEmailErr}
                    </p>
                  )}
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium '>Password</p>
                  <input
                    type='password'
                    value={password}
                    onChange={handlePassword}
                    className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput '
                  />
                  {errPassword && (
                    <p className='text-red-500 italic text-[10px] font-semibold items-center gap-2 px-1 -mt-1'>
                      {errPassword}
                    </p>
                  )}
                  {userPassErr && (
                    <p className='text-red-500 italic text-[10px] font-semibold items-center gap-2 px-1 -mt-1'>
                      {userPassErr}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleLogin}
                  className='w-full  py-1.5 text-sm font-normal rounded-sm bg-[#f0c14b]  active:border-yellow-800 active:shadow-amazonInput'
                >
                  Continue
                </button>
                <p className='w-full text-xs text-gray-600 mt-1 flex items-center '>
                  <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
                  <span className='w-1/3 text-center'>New User</span>
                  <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
                </p>
                <Link to='/registration'>
                  <button className='w-full p-3 -mt-2 text-sm font-normal rounded-sm bg-[#f0c14b]   active:border-yellow-800 active:shadow-amazonInput'>
                    Create Your Account
                  </button>
                </Link>
                <p className='w-full text-xs text-gray-600 -mt-2 flex items-center '>
                  <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
                  <span className='w-1/3 text-center'>Or</span>
                  <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
                </p>
                <div className=' flex justify-center items-center rounded'>
                  <button
                    onClick={handleSignInWithPopup}
                    className='w-full -mt-3 py-1.5 text-sm font-normal rounded-sm bg-[#f0c14b]  active:border-yellow-800 active:shadow-amazonInput'
                  >
                    Sign-in with Google
                  </button>
                </div>
                {loading && (
                  <div className='flex justify-center'>
                    <RotatingLines
                      strokeColor='green'
                      strokeWidth='5'
                      animationDuration='0.75'
                      width='50'
                      visible={true}
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        )}
        <div className='flex   justify-center items-center mt-2 '>
          <button
            className='px-2  py-1.5  text-sm font-normal rounded-sm bg-[#f0c14b]  active:border-yellow-800 active:shadow-amazonInput  mb-1'
            onClick={() => setShow(!show)}
          >
            View Test Credential
          </button>
          {show ? (
            <div className=' flex flex-col  border-1 px-3 bg-blue-100 ml-3  border-blue-400 rounded mb-3'>
              <p>
                <span className='font-semibold '>Email :</span> test1@gmail.com
              </p>
              <p className='-mt-1'>
                <span className='font-semibold  '>Password :</span> 121212
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Signin;

{
  /* <div className=' flex justify-center items-center rounded'>
  <button
    onClick={handleSignInWIthPopup}
    className='border-1 border-white p-2 rounded mb-3 text-base'
  >
    Sign-in with Google
  </button>
</div>; 
  const handleSignInWIthPopup = (user) => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem('email', data.user.email);
      setTimeout(() => {
        navigate('/home');
      }, 1500);
      toast.success('Login Successfully');
    });
  };
  useEffect(() => {
    setValue(localStorage.getItem('email'));
  });*/
}
