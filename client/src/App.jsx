import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import Layout from './components/layout';
import RegisterPage from './pages/register/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import Dashboard from './pages/dashboard/dashboard';
import FormCreateAccommodations from './components/form/FormCreateAccommodations';
import FormEditAccommodations from './components/form/FormEditAccommodations';
import RecommendedPage from './pages/recommended/RecommendedPage';
import DetailPage from './pages/detail/DetailPage';
import BookingsPage from './pages/bookings/BookingsPage';
import LoginPage from './pages/login/LoginPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/places" element={<Dashboard />} />
          <Route path="/dashboard/places/new" element={<FormCreateAccommodations />} />
          <Route path="/dashboard/places/:id" element={<FormEditAccommodations />} />
          <Route path="/dashboard/recommended" element={<RecommendedPage />} />
          <Route path="/place/:id" element={<DetailPage />} />
          <Route path="/dashboard/bookings" element={<Dashboard />} />
          <Route path="/dashboard/bookings/:id" element={<BookingsPage />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
