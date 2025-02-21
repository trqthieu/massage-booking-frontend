import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ExpertMenu() {
  const { currentUser } = useSelector((state) => state.auth);
  console.log('currentUser', currentUser);
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link to="#" className="brand-link">
        <img
          src="/static/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: '.8' }}
        />
        <span className="brand-text font-weight-light">Dashboard</span>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          {/* <div className="image">
            <img
              src={
                currentUser?.avatar
                  ? currentUser?.avatar
                  : '/static/images/avatar.png'
              }
              className="img-circle elevation-2"
              alt="User"
              style={{ opacity: '.8', width: '40px', height: '40px' }}
            />
          </div> */}
          <div className="info">
            <Link to="#" className="d-block">
              {currentUser?.fullName}
            </Link>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Movies Management */}
            <li className="nav-item has-treeview" id="menu-movie">
              <Link to="#" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Service Management
                  <i className="right fas fa-angle-left" />
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/expert/services" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Service List</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/expert/services/create' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>My Service</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* Cinema Management */}
            {/* <li className='nav-item has-treeview' id='menu-cinema'>
              <Link to='#' className='nav-link active'>
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>
                  Cinema Management
                  <i className='right fas fa-angle-left' />
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/expert/cinemas' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Cinema List</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/expert/cinemas/create' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Add New Cinema</p>
                  </Link>
                </li>
              </ul>
            </li> */}
            {/* Schedule Management */}
            <li className="nav-item has-treeview" id="menu-schedule">
              <Link to="#" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Booking Management
                  <i className="right fas fa-angle-left" />
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/expert/bookings" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Booking List</p>
                  </Link>
                </li>
                {/* <li className='nav-item'>
                  <Link to='/expert/schedules/create' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Add New Showtime</p>
                  </Link>
                </li> */}
              </ul>
            </li>
            {/* Detailed Reports */}
            {/* <li className="nav-item has-treeview" id="menu-report">
              <Link to="#" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Detailed Reports
                  <i className="right fas fa-angle-left" />
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/expert/reports" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Revenue Report</p>
                  </Link>
                </li>
              </ul>
            </li> */}
            {/* Employee Management */}
            {/* <li className="nav-item has-treeview" id="menu-employee">
              <Link to="#" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  User Management
                  <i className="right fas fa-angle-left" />
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/expert/users" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>User List</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/expert/users/create' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Add New User</p>
                  </Link>
                </li>
              </ul>
            </li> */}
            {/* News Management */}
            {/* <li className="nav-item has-treeview" id="menu-news">
              <Link to="#" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Blogs Management
                  <i className="right fas fa-angle-left" />
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/expert/blogs" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Blogs List</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/expert/blogs/create" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Add New Blogs</p>
                  </Link>
                </li>
              </ul>
            </li> */}
            {/* Product Management */}
            {/* <li className='nav-item has-treeview' id='menu-product'>
              <Link to='#' className='nav-link active'>
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>
                  Product Management
                  <i className='right fas fa-angle-left' />
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/expert/products' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Product List</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/expert/products/create' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Add New Product</p>
                  </Link>
                </li>
              </ul>
            </li> */}
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}

export default ExpertMenu;
