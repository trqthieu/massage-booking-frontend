import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../api/request';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';

function Schedule() {
  const [scheduleList, setScheduleList] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState({
    id: null,
  });

  const getScheduleList = async () => {
    const resultSchedule = await request.getSchedules();
    console.log("🚀 ~ getScheduleList ~ resultSchedule:", resultSchedule);
    setScheduleList(resultSchedule.data);
    setCurrentSchedule(resultSchedule.data[0]._id);
  };

  const handleDelete = async () => {
    const result = await request.deleteSchedule(currentSchedule._id);
    const response = result.data;
    if (response.success) {
      toast.success(response.data.message, {
        autoClose: 2000,
      });
      getScheduleList();
    }
  };

  useEffect(() => {
    getScheduleList();
  }, []);

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
                  <li className='breadcrumb-item'>
                    <a href='/admin'>Home</a>
                  </li>
                  <li className='breadcrumb-item active'>
                    Schedule List
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='container-fluid'>
            {/* Content */}
            {/* Modal */}
            <div
              className='modal fade'
              id='exampleModal'
              tabIndex={-1}
              role='dialog'
              aria-labelledby='exampleModalLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='exampleModalLabel'>
                      Confirmation
                    </h5>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      aria-label='Close'
                    >
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    Do you want to delete this schedule?
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-dismiss='modal'
                    >
                      Close
                    </button>
                    <Link
                      id='schedule-delete-confirm'
                      role='button'
                      className='btn btn-danger text-white'
                      to='#'
                      onClick={handleDelete}
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {scheduleList.map((schedule) => {
                  return (
                    <tr key={schedule._id}>
                      <td>{schedule?.userId?.fullName}</td>
                      <td>{schedule?.expertId?.fullName}</td>
                      <td>{schedule?.serviceId?.name}</td>
                      <td>{schedule.status}</td>
                      <td>
                        {moment(schedule.createdAt).format('HH:mm DD-MM-YYYY')}
                      </td>
                      <td>
                        {moment(schedule.appointmentTime).format('HH:mm DD-MM-YYYY')}
                      </td>
                      <td>
                        {/* <Link
                          role='button'
                          to={`/admin/schedules/${schedule.id}`}
                          className='btn btn-primary mr-2'
                        >
                          Update
                        </Link> */}
                        {/* <button
                          type='button'
                          data-toggle='modal'
                          data-target='#exampleModal'
                          className='btn btn-danger room-movie-schedule-delete-action'
                          onClick={() => setCurrentSchedule(schedule)}
                        >
                          Delete
                        </button> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* End Content */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Schedule;
