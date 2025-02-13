import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cinema from './pages/admin/Cinema';
import CreateCinema from './pages/admin/CreateCinema';
import CreateEmployee from './pages/admin/CreateEmployee';
import CreateMovie from './pages/admin/CreateMovie';
import CreateNews from './pages/admin/CreateNews';
import CreateProduct from './pages/admin/CreateProduct';
import CreateSchedule from './pages/admin/CreateSchedule';
import Employee from './pages/admin/Employee';
import Movie from './pages/admin/Movie';
import News from './pages/admin/News';
import Product from './pages/admin/Product';
import Report from './pages/admin/Report';
import Schedule from './pages/admin/Schedule';
import Amount from './pages/Amount';
import TicketList from './pages/employee/TicketList';
import Error from './pages/Error';
import Information from './pages/Information';
import Login from './pages/Login';
import MovieDetail from './pages/MovieDetail';
import MovieList from './pages/MovieList';
import Register from './pages/Register';
import Booking from './pages/user/Booking';
import BookingChair from './pages/user/BookingChair';
import History from './pages/user/History';
import ForgotPassword from './pages/ForgotPassword';
import ExpertService from './pages/employee/ExpertService';
import ExpertCreateService from './pages/employee/ExpertCreateService';
import ExpertBooking from './pages/employee/ExpertBooking';

function App() {
  const { currentUser } = useSelector((state) => state.auth);
  console.log('currentUserApp', currentUser);
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path='/register' element={<Register />} /> */}
          {/* <Route path='/amount' element={<Amount />} /> */}
          <Route path="/information" element={<Information />} />
          <Route path="/error" element={<Error />} />
          {/* <Route path='/movies' element={<MovieList />} />
          <Route path='/movies/:movieId' element={<MovieDetail />} /> */}
          <Route path="/admin/services" element={<Movie />} />
          <Route path="/admin/services/create" element={<CreateMovie />} />
          <Route path="/admin/services/:movieId" element={<CreateMovie />} />
          <Route path="/admin/cinemas" element={<Cinema />} />
          {/* <Route path='/admin/cinemas/create' element={<CreateCinema />} />
          <Route path='/admin/cinemas/:cinemaId' element={<CreateCinema />} /> */}
          <Route path="/admin/users" element={<Employee />} />
          <Route path="/admin/users/create" element={<CreateEmployee />} />
          <Route path="/admin/users/:empId" element={<CreateEmployee />} />
          {/* <Route path='/admin/products' element={<Product />} />
          <Route path='/admin/products/create' element={<CreateProduct />} />
          <Route
            path='/admin/products/:productId'
            element={<CreateProduct />}
          /> */}
          <Route path="/admin/bookings" element={<Schedule />} />
          {/* <Route path='/admin/schedules/create' element={<CreateSchedule />} />
          <Route
            path='/admin/schedules/:scheduleId'
            element={<CreateSchedule />}
          /> */}
          <Route path="/admin/blogs" element={<News />} />
          <Route path="/admin/blogs/create" element={<CreateNews />} />
          <Route path="/admin/blogs/:newsId" element={<CreateNews />} />
          <Route path="/admin/reports" element={<Report />} />

          <Route path="/expert/services" element={<ExpertService />} />
          <Route
            path="/expert/services/create"
            element={<ExpertCreateService />}
          />
          <Route
            path="/expert/services/:movieId"
            element={<ExpertCreateService />}
          />
          <Route path="/expert/bookings" element={<ExpertBooking />} />

          <Route path="/booking/:movieId" element={<Booking />} />
          <Route path="/booking-chair/:scheduleId" element={<BookingChair />} />
          <Route path="/history" element={<History />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path='*' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
