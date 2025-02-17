import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../api/request';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import { validateEmail, validatePassword } from '../../utils/regex';
import FileBase64 from 'react-file-base64';

function CreateEmployee() {
  const navigate = useNavigate();
  const params = useParams();
  const { empId } = params;
  const [empData, setEmpData] = useState({
    fullName: '',
    avatar: '',
    role: 'user',
    email: '',
    password: '',
    address: '',
  });
  console.log('empData', empData);

  const handleChange = (name, value) => {
    const newEmpData = { ...empData };
    newEmpData[name] = value;
    setEmpData(newEmpData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('empData', empData);
    if (empData.fullName.length === 0) {
      toast.error('Full Name cannot be empty', {
        autoClose: 2000,
      });
      return;
    }
    if (!validateEmail(empData.email)) {
      toast.error('Invalid Email', {
        autoClose: 2000,
      });
      return;
    }
    if (empData.password && !validatePassword(empData.password)) {
      toast.error('Password must be at least 6 characters', {
        autoClose: 2000,
      });
      return;
    }
    // if (empData.address.length === 0) {
    //   toast.error('Address cannot be empty', {
    //     autoClose: 2000,
    //   });
    //   return;
    // }
    if (empId) {
      const newEmpData = { id: empId, ...empData };
      const result = await request.updateEmp(newEmpData);
      const response = result.data;
      // if (response.success) {
      toast.success('Success', {
        autoClose: 2000,
      });
      navigate('/admin/users');
      // }
      console.log('update', result);
    } else {
      const result = await request.createEmp(empData);
      const response = result.data;
      // if (response.success) {
      toast.success('Success', {
        autoClose: 2000,
      });
      navigate('/admin/users');
      // } else {
      //   toast.error('Error', {
      //     autoClose: 2000,
      //   });
      // }
      console.log('create', result);
    }
  };

  const getEmpInfo = async (empId) => {
    const resultEmp = await request.getEmpById(empId);
    const { fullName, avatar, role, email, password, address } = resultEmp.data;
    setEmpData({
      fullName,
      avatar,
      role,
      email,
      password,
      address
      
    });
  };

  useEffect(() => {
    if (empId) {
      getEmpInfo(empId);
    }
  }, [empId]);

  return (
    <div className="wrapper">
      <Nav />
      <Menu />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6"></div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/admin">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Create New User</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className="content">
          <div className="container">
            <div
              id="user-alert"
              className="alert alert-warning alert-dismissible hidden"
            >
              <a
                href="#"
                className="close"
                data-dismiss="alert"
                aria-label="close"
              >
                ×
              </a>
              <strong>Failure!</strong> Username or email is already in use.
            </div>
            <form
              id="form"
              action="/admin/employees/create"
              method="post"
              modelattribute="user"
              onSubmit={handleSubmit}
            >
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}>
                  <label>Full Name</label>
                </div>
                <div className="col-sm-4">
                  <input
                    id="fullName"
                    type="text"
                    className="form-control"
                    path="fullName"
                    value={empData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}>
                  <label>Email</label>
                </div>
                <div className="col-sm-4">
                  <input
                    disabled={empId ? true : false}
                    id="email"
                    type="text"
                    className="form-control"
                    path="email"
                    value={empData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}>
                  <label>Password</label>
                </div>
                <div className="col-sm-4">
                  <input
                    id="password"
                    type="text"
                    className="form-control"
                    path="password"
                    value={empData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}>
                  <label>Address</label>
                </div>
                <div className="col-sm-4">
                  <input
                    id="address"
                    type="text"
                    className="form-control"
                    path="address"
                    value={empData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}>
                  <labe>Avatar</labe>
                </div>
                <div className="col-sm-4">
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => {
                      setEmpData({ ...empData, avatar: base64 });
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
              </div>
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}>
                  <labe>Role</labe>
                </div>
                <div className="col-sm-4">
                  <select
                    name="categoryId"
                    className="form-control"
                    value={empData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                  >
                    <option value={'user'}>User</option>
                    <option value={'expert'}>Expert</option>
                  </select>
                </div>
              </div>
              {/* <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}>
                  <label>Email</label>
                </div>
                <div className="col-sm-4">
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    path="email"
                    disabled={empId ? true : false}
                    value={empData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}>
                  <label>Password</label>
                </div>
                <div className="col-sm-4">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    path="password"
                    value={empData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}>
                  <label>Address</label>
                </div>
                <div className="col-sm-4">
                  <input
                    id="address"
                    type="text"
                    className="form-control"
                    path="address"
                    value={empData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />
                </div>
              </div> */}
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}></div>
                <div className="col-sm-4">
                  <button
                    id="btn-submit"
                    type="submit"
                    className="btn btn-primary"
                  >
                    {empId ? 'Update' : 'Add'}
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* End Content */}
        </section>
      </div>
    </div>
  );
}

export default CreateEmployee;
