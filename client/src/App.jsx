import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './components/MainPage/MainPage';
import Nav from './components/Nav/Nav';
import StarterPage from './components/StarterPage/StarterPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import NotFound from './components/404/Page404';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);

  useEffect(() => {
    const response = fetch('http://localhost:3001/', {
      credentials: 'include',
    });
    response
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'USER', payload: data?.user });
        dispatch({ type: 'SPECS', payload: data?.specs });
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  return (
    <>
      <Nav />
      <Routes>
        { user
          ? (
            <>
              <Route index element={<MainPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </>
          )
          : <Route index element={<StarterPage />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
