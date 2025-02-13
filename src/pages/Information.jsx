import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import '../static/css/information.css';
import request from '../api/request';
import moment from 'moment';
import FileBase64 from 'react-file-base64';
import { toast } from 'react-toastify';
function Information() {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState();
  console.log('🚀 ~ Information ~ myInfo:', myInfo);
  const [isUpdate, setIsUpdate] = useState(false);
  const getMyInformation = async () => {
    const result = await request.getMyInfo();
    console.log('🚀 ~ getMyInformation ~ result:', result);
    setMyInfo(result.data);
  };

  const handleChange = (name, value) => {
    const newData = { ...myInfo };
    newData[name] = value;
    setMyInfo(newData);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await request.updateMyInfo(myInfo);
    const response = result.data;
    console.log('🚀 ~ handleUpdate ~ response:', response);
    // if (response.success) {
    toast.success('Success', {
      autoClose: 2000,
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
    // }
  };
  useEffect(() => {
    getMyInformation();
  }, []);

  return (
    <div>
      <Navbar />
      {myInfo && (
        <div className="container">
          <div id="alert" className="alert alert-warning hidden">
            <strong>Warning!</strong> Không thể cập nhật thông tin cá nhân.
          </div>
          {/* <h3>Ảnh đại diện</h3>
          <div className="avatar-container">
            <div>
              <img
                src={myInfo.avatar || '/static/images/avatar.png'}
                alt="Avatar"
                className="avatar"
              />
            </div>
          </div> */}
          <div className={`details-container ${isUpdate ? 'hidden' : ''}`}>
            <h3>Profile</h3>
            <div className="row">
              <div className="col-sm-3">
                <ul>
                  <li>
                    <b>Full name:</b>
                  </li>
                  <li>
                    <b>Email:</b>
                  </li>
                  <li>
                    <b>Avatar:</b>
                  </li>
                  {/* <li>
                    <b>Giới tính</b>
                  </li> */}
                  {/* <li>
                    <b>Địa chỉ:</b>
                  </li> */}
                </ul>
              </div>
              <div className="col-sm-5">
                <ul>
                  <li>{myInfo.fullName}</li>
                  <li>{myInfo.email}</li>
                  <img src={myInfo.avatar} alt="" />
                  {/* <li>
                    {myInfo.dateOfBirth
                      ? moment(myInfo.dateOfBirth).format('DD-MM-YYYY')
                      : 'Chưa có'}
                  </li> */}
                  {/* <li>{myInfo.gender === 1 ? 'Nam' : 'Nữ'}</li> */}
                  {/* <li>{myInfo.phone}</li>
                  <li>{myInfo.address}</li> */}
                </ul>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              id="edit-information"
              onClick={() => setIsUpdate(true)}
            >
              Update profile
            </button>
          </div>
          <div className={`update-information ${!isUpdate ? 'hidden' : ''}`}>
            <h3>Update information</h3>
            <form method="post" action="/information" onSubmit={handleUpdate}>
              <div className="row">
                <div className="col-sm-3">
                  <ul>
                    <li>
                      <label>Full Name:</label>
                    </li>
                    <li>
                      <label>Avatar</label>
                    </li>
                    {/* <li>
                      <label>Email:</label>
                    </li> */}
                    {/* <li>
                      <label>Ngày sinh:</label>
                    </li>
                    <li>
                      <label>Địa chỉ</label>
                    </li> */}
                    {/* <li>
                      <label>Ảnh đại diện</label>
                    </li> */}
                  </ul>
                </div>
                <div className="col-sm-4">
                  <ul>
                    <li>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={myInfo.fullName}
                        onChange={(e) =>
                          handleChange('fullName', e.target.value)
                        }
                      />
                    </li>
                    <div className="col-sm-4">
                      <FileBase64
                        multiple={false}
                        onDone={({ base64 }) => {
                          setMyInfo({ ...myInfo, avatar: base64 });
                        }}
                      />
                      {/* <input
                    type='file'
                    className='form-control-file'
                    name='image'
                    // value={movieData.image}
                    onChange={e => handleChange('image', e.target.files[0])}
                  /> */}
                    </div>
                    {/* <li>
                      <input
                        type="text"
                        value={myInfo.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        name="username"
                        readOnly
                      />
                    </li> */}
                    {/* <li>
                      <input
                        type='date'
                        value={moment(myInfo.dateOfBirth).format('YYYY-MM-DD')}
                        onChange={(e)=>handleChange('dateOfBirth',e.target.value)}
                        name='dateOfBirth'
                        required
                      />
                    </li>
                    <li>
                      <input
                        type='text'
                        value={myInfo.address}
                        onChange={(e)=>handleChange('address',e.target.value)}
                        name='cinemaLove'
                        required
                      />
                    </li>
                    <li>
                    <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => {
                      setMyInfo({ ...myInfo, avatar: base64 });
                    }}
                  />
                    </li> */}
                  </ul>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                id="update-information"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Information;
