import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import request from '../api/request';
import jwtDecode from 'jwt-decode';
import { clearError, loginAsync } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../utils/regex';
function ForgotPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();

    if (
      !validatePassword(userData.newPassword) ||
      !validatePassword(userData.confirmNewPassword)
    ) {
      toast.error('Mật khẩu gồm ít nhất 6 ký tự', {
        autoClose: 2000,
      });
      return;
    }

    if (userData.newPassword !== userData.confirmNewPassword) {
      toast.error('Mật khẩu không trùng khớp', {
        autoClose: 2000,
      });
      return;
    }

    const results = await request.confirmPassword({
      token,
      newPassword: userData.newPassword,
      confirmNewPassword: userData.confirmNewPassword,
    });
    const response = results.data;
    if (response.success) {
      toast.success(response.data.message, {
        autoClose: 2000,
      });
      navigate('/');
    } else {
      toast.error(response.data.message, {
        autoClose: 2000,
      });
    }
  };

  const handleChange = (name, value) => {
    const newUserData = { ...userData };
    newUserData[name] = value;
    setUserData(newUserData);
  };

  return (
    <div>
      <Navbar />
      <form
        id='login-form'
        className='login'
        method='post'
        action='/login'
        onSubmit={handleSubmit}
      >
        <p className='login__title'>
          ĐẶT LẠI MẬT KHẨU
          <br />
          <span className='login-edition'>Chào mừng bạn đến CGV Cinema</span>
        </p>

        <div className='social social--colored'>
          <p className='social__variant fa fa-facebook'></p>
          <p className='social__variant fa fa-twitter'></p>
          <p className='social__variant fa fa-tumblr'></p>
        </div>

        {/* <p className='login__tracker'>or</p> */}

        <div className='field-wrap'>
          <input
            type='password'
            placeholder='Mật khẩu mới'
            name='password'
            className='login__input'
            value={userData.newPassword}
            onChange={e => handleChange('newPassword', e.target.value)}
          />
          <input
            type='password'
            placeholder='Xác nhận mật khẩu mới'
            name='password'
            className='login__input'
            value={userData.confirmNewPassword}
            onChange={e => handleChange('confirmNewPassword', e.target.value)}
          />
          {/* <!-- <p className="mycolor">${message}</p> --> */}
        </div>

        <div className='login__control'>
          <button type='submit' className='btn btn-md btn--warning btn--wider'>
            Xác nhận
          </button>
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default ForgotPassword;
