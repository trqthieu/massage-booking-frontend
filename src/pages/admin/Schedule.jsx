import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../api/request';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';

function Schedule() {
  const [scheduleList, setScheduleList] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState({ id: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getScheduleList = async () => {
    const resultSchedule = await request.getSchedules();
    setScheduleList(resultSchedule.data);
  };

  const handleDelete = async () => {
    const result = await request.deleteSchedule(currentSchedule._id);
    const response = result.data;
    if (response.success) {
      toast.success(response.data.message, { autoClose: 2000 });
      getScheduleList();
    }
  };

  useEffect(() => {
    getScheduleList();
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = scheduleList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='wrapper'>
      <Nav />
      <Menu />
      <div className='content-wrapper'>
        <div className='content-header'>
          <div className='container-fluid'>
            <div className='row mb-2'>
              <div className='col-sm-6'></div>
              <div className='col-sm-6'>
                <ol className='breadcrumb float-sm-right'>
                  <li className='breadcrumb-item'><a href='/admin'>Home</a></li>
                  <li className='breadcrumb-item active'>Schedule List</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <section className='content'>
          <div className='container-fluid'>
            <p>Schedule list of the entire system</p>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Expert Name</th>
                  <th>Service Name</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Booking Time</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((schedule) => (
                  <tr key={schedule._id}>
                    <td>{schedule?.userId?.fullName}</td>
                    <td>{schedule?.expertId?.fullName}</td>
                    <td>{schedule?.serviceId?.name}</td>
                    <td>{schedule.status}</td>
                    <td>{moment(schedule.createdAt).format('HH:mm DD-MM-YYYY')}</td>
                    <td>{moment(schedule.appointmentTime).format('HH:mm DD-MM-YYYY')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <nav>
              <ul className='pagination'>
                {Array.from({ length: Math.ceil(scheduleList.length / itemsPerPage) }, (_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button onClick={() => paginate(i + 1)} className='page-link'>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Schedule;
