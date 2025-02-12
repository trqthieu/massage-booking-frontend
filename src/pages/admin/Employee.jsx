import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../api/request';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';

function Employee() {
  const [empList, setEmpList] = useState([]);
  const [currentEmp, setCurrentEmp] = useState({
    id: null,
  });
  console.log('empList', empList);

  const getEmpList = async () => {
    const result = await request.getEmpList();
    console.log('🚀 ~ getEmpList ~ result:', result);
    setEmpList(result.data);
  };

  const handleDelete = async (empId) => {
    const result = await request.deleteEmp(empId);
    const response = result.data;
    // if (response.success) {
    toast.success('Success', {
      autoClose: 2000,
    });
    getEmpList();
    // }
  };

  useEffect(() => {
    getEmpList();
  }, []);

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
                  <li className="breadcrumb-item active">User List</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className="content">
          <div className="container">
            {/* Content */}
            {/* Modal */}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Confirmation
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    Do you want to delete this employee?
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <Link
                      id="employee-delete-confirm"
                      role="button"
                      className="btn btn-danger text-white"
                      to="#"
                      data-dismiss="modal"
                      onClick={() => handleDelete(currentEmp._id)}
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <p>Employee List:</p>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {empList.map((emp) => {
                  return (
                    <tr key={emp.id}>
                      <td>{emp.fullName}</td>
                      <td>
                        <span className="badge badge-primary">
                          {emp.role === 'expert'
                            ? 'Expert'
                            : emp.role === 'user'
                            ? 'User'
                            : 'Admin'}
                        </span>
                      </td>
                      <td>{emp.email}</td>
                      <td>
                        <Link
                          role="button"
                          className="btn-primary btn mr-2"
                          to={`/admin/users/${emp._id}`}
                        >
                          Edit
                        </Link>
                        <button
                          data-toggle="modal"
                          data-target="#exampleModal"
                          className="btn btn-danger delete-employee-action"
                          onClick={() => setCurrentEmp(emp)}
                        >
                          Delete
                        </button>
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

export default Employee;
