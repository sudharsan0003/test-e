import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Link,
  Route,
  Routes,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import { productData } from './Api/Api';
import Signin from './Pages/Signin';
import Cart from './Pages/Cart';
import Registration from './Pages/Registration';
import Profile from './Pages/Profile';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase.config';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};
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
/>;

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Layout />}>
          <Route
            path='/cart'
            element={user && user.uid ? <Cart /> : <Navigate to='/' />}
          ></Route>
          <Route
            path='/home'
            element={user && user.uid ? <Home /> : <Navigate to='/' />}
            loader={productData}
          ></Route>
          <Route path='/' element={<Signin />}></Route>
          <Route path='/registration' element={<Registration />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/registration/:id' element={<Registration />} />
        </Route>
      </Route>
    )
  );
  return (
    <div className='font-bodyFont bg-gray-100'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
