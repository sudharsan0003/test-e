import React, { useState, useEffect } from 'react';
import { storage, db, auth } from '../firebase.config';
import { useParams, useNavigate, Navigate, json } from 'react-router-dom';
import {
  CollectionReference,
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/amazonSlice';

const initialState = {
  name: '',
  mail: '',
  city: '',
  contact: '',
  password: '',
};

const Registration = () => {
  const [data, setData] = useState(initialState);
  const { name, mail, city, contact, password } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.amazon.userInfo);

  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const docRef = doc(db, 'users', id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('upload is pause ');
              break;
            case 'running':
              console.log('upload is running ');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let error = {};
    if (!name) {
      error.name = 'kjh';
    }
    if (!mail) {
      error.mail = '***khb';
    }
    if (!city) {
      error.city = '********';
    }
    if (!contact) {
      error.contact = '********';
    }

    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        mail,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      dispatch(
        setUserInfo({
          _id: user.uid,
          userName: user.displayName,
          email: user.email,
          image: user.photoURL,
        })
      );
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home');
    } catch (error) {
      console.log(error);
    }

    let error = validate();
    if (Object.keys(error).length) return setError(error);
    setIsSubmit(true);
    if (!id) {
      try {
        await addDoc(collection(db, 'users'), {
          ...data,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, 'users', id), {
          ...data,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    }
    navigate('/home');
  };

  return (
    <div style={{ backgroundColor: 'beige' }}>
      <div className='form flex justify-center items-center'>
        <form className='form flex flex-col justify-center items-center w-[25%] gap-3 mt-10 mb-10  '>
          <input
            type='text'
            placeholder='Name'
            name='name'
            error={error.name ? { content: error.name } : null}
            value={name}
            onChange={handleChange}
            className='w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput '
          />
          <input
            type='email'
            placeholder='Email'
            name='mail'
            error={error.mail ? { content: error.mail } : null}
            value={mail}
            onChange={handleChange}
            className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput '
          />
          <input
            type='text'
            placeholder='City'
            error={error.city ? { content: error.city } : null}
            value={city}
            name='city'
            onChange={handleChange}
            className='w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput '
          />
          <input
            type='number'
            name='contact'
            placeholder='Contact No'
            error={error.contact ? { content: error.contact } : null}
            value={contact}
            onChange={handleChange}
            className='w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput '
          />
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={handleChange}
            className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput '
          />

          <input type='file' onChange={(e) => setFile(e.target.files[0])} />

          {/* <button
            type='submit'
            onClick={handleSubmit}
            className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput bg-orange-400'
          >
            Submit
          </button> */}
          <button
            type='submit'
            onClick={handleSubmit}
            className='w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput bg-orange-400'
          >
            {id ? 'update User' : 'Add User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;

// import React from 'react';
// import { useState } from 'react';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import { Link, useNavigate } from 'react-router-dom';
// import { RotatingLines } from 'react-loader-spinner';

// const Registration = () => {
//   const navigate = useNavigate();
//   const auth = getAuth();

//   // function
//   const [clientName, setClientName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   //  error
//   const [errClientName, setErrClientName] = useState('');
//   const [errEmail, setErrEmail] = useState('');
//   const [errPassword, setErrPassword] = useState('');
//   const [errConfirmPassword, setErrConfirmPassword] = useState('');
//   const [firebaseErr, setFirebaseErr] = useState('');
//   const [loading, setLoading] = useState('');
//   const [successMsg, setSuccessMsg] = useState('');
//   // name function
//   const handleName = (e) => {
//     setClientName(e.target.value);
//     setErrClientName('');
//   };
//   // email function
//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//     setErrEmail('');
//   };
//   // password function
//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//     setErrPassword('');
//   };
//   // cnfrmpassword function
//   const handleConfirmPassword = (e) => {
//     setConfirmPassword(e.target.value);
//     setErrConfirmPassword('');
//   };
//   //email validation
//   function validateEmail(email) {
//     let re = /\S+@\S+\.\S+/;
//     return re.test(email);
//   }

//   // submit function
//   const clickHandlerRegistration = (e) => {
//     e.preventDefault();
//     if (!clientName) {
//       setErrClientName('Name is mandatory');
//     }
//     if (!email) {
//       setErrEmail('Email is mandatory');
//       setFirebaseErr('');
//     } else {
//       if (!validateEmail(email)) {
//         setErrEmail('Enter a Valid Email');
//       }
//     }
//     if (!password) {
//       setErrPassword('Password is mandatory');
//     } else {
//       if (password.length < 8) {
//         setErrPassword('Password must be at least 8 characters');
//       }
//     }
//     if (!confirmPassword) {
//       setErrConfirmPassword('Confirm Password is mandatory');
//     } else {
//       if (confirmPassword !== password) {
//         setErrConfirmPassword("Password doesn't match");
//       }
//     }
//     if (
//       clientName &&
//       email &&
//       validateEmail(email) &&
//       password &&
//       password.length >= 8 &&
//       confirmPassword &&
//       confirmPassword === password
//     ) {
//       setLoading(true);
//       createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           // Signed up
//           const user = userCredential.user;

//           setLoading(false);
//           setSuccessMsg('Account Created Successfully');
//           setTimeout(() => {
//             navigate('/signin');
//           }, 2000);
//           // ...
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           if (errorCode.includes('auth/email-already-in-use')) {
//             setFirebaseErr('Email Already in use, Try another one');
//           }
//           // ..
//         });
//     }
//   };

//   return (
//     <div className='w-full'>
//       <div className='w-full bg-white pb-10 '>
//         <form className='w-[350px] mx-auto flex flex-col items-center '>
//           <div className='w-full border bg-gray-300 border-zinc-200 p-6 mt-5'>
//             <h2 className='font-titleFont text-3xl font-medium mb-4 '>
//               Create Account
//             </h2>
//             <div className='flex flex-col gap-3'>
//               <div className='flex flex-col gap-2'>
//                 <p className='text-sm font-medium '>Your Name</p>
//                 <input
//                   onChange={handleName}
//                   type='text'
//                   value={clientName}
//                   className='w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput '
//                 />
//                 {errClientName && (
//                   <p className='text-red-500 italic text-[10px] font-semibold items-center gap-2 px-1 -mt-1'>
//                     {errClientName}
//                   </p>
//                 )}
//               </div>
//               <div className='flex flex-col gap-2'>
//                 <p className='text-sm font-medium '>Enter your Email</p>
//                 <input
//                   onChange={handleEmail}
//                   type='email'
//                   value={email}
//                   className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput '
//                 />
//                 {firebaseErr && (
//                   <p className='text-red-500 italic text-[10px] font-semibold items-center gap-2 px-1 -mt-1'>
//                     {firebaseErr}
//                   </p>
//                 )}
//               </div>
//               <div className='flex flex-col gap-2'>
//                 <p className='text-sm font-medium '>Password</p>
//                 <input
//                   onChange={handlePassword}
//                   type='password'
//                   value={password}
//                   className='w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput '
//                 />
//                 {errPassword && (
//                   <p className='text-red-500 italic text-[10px] font-semibold items-center gap-2 px-1 -mt-1'>
//                     {errPassword}
//                   </p>
//                 )}
//               </div>
//               <div className='flex flex-col gap-2'>
//                 <p className='text-sm font-medium '>Confirm-Password</p>
//                 <input
//                   onChange={handleConfirmPassword}
//                   type='password'
//                   value={confirmPassword}
//                   className='w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput '
//                 />
//                 {errConfirmPassword && (
//                   <p className='text-red-500 italic text-[10px] font-semibold items-center gap-2 px-1 -mt-1'>
//                     {errConfirmPassword}
//                   </p>
//                 )}
//               </div>
//               <p className='text-xs text-gray-500 -mt-2'>
//                 Password must be atleast 8 character
//               </p>
//               <button
//                 onClick={clickHandlerRegistration}
//                 className='w-full  py-1.5 text-sm font-normal rounded-sm bg-[#f0c14b]  active:border-yellow-800 active:shadow-amazonInput mt-2'
//               >
//                 Continue
//               </button>
//               {loading && (
//                 <div className='flex justify-center'>
//                   <RotatingLines
//                     strokeColor='green'
//                     strokeWidth='5'
//                     animationDuration='0.75'
//                     width='50'
//                     visible={true}
//                   />
//                 </div>
//               )}
//               {successMsg && (
//                 <div>
//                   <p>{successMsg}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Registration;

{
  /* <input
  onChange={handleEmail}
  type='email'
  value={email}
  className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput '
/>; */
}
