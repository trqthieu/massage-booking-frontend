import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import Nav from '../../components/admin/Nav';
import Menu from '../../components/admin/Menu';
import request from '../../api/request';
import ExpertMenu from '../../components/expert/ExpertMenu';
import { useSelector } from 'react-redux';

function ExpertService() {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({ id: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleRegisterService = async () => {
    const result = await request.expertRegisterService(currentMovie.id);
    const response = result.data;
    toast.success('Success', { autoClose: 2000 });
    getMovies();
  };

  const getMovies = async () => {
    const result = await request.expertGetMovies();
    setMovieList(result.data);
    if (result.data.length > 0) {
      setCurrentMovie({ ...result.data[0], id: result.data[0]._id });
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = movieList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="wrapper">
      <Nav />
      <ExpertMenu />
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
                  <li className="breadcrumb-item active">Service List</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container">
            {currentItems.length ? (
              <div className="row">
                <div className="col-sm-3">
                  <div className="list-group movie-list">
                    {currentItems.map((movie) => (
                      <Link
                        to="#"
                        key={movie._id}
                        onClick={() => setCurrentMovie({ ...movie, id: movie._id })}
                        className="list-group-item"
                      >
                        {movie.name}
                      </Link>
                    ))}
                  </div>
                  {/* Pagination Controls */}
                  <nav>
                    <ul className="pagination">
                      {Array.from({ length: Math.ceil(movieList.length / itemsPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                          <button onClick={() => paginate(i + 1)} className="page-link">
                            {i + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                <div className="col-sm-9">
                  <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Confirmation</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div className="modal-body">Do you want to register this service?</div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleRegisterService}>Register service</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {currentMovie && (
                    <div className="info-movie" id={`info-movie-${currentMovie.id}`}>
                      <div id={`detail-movie-${currentMovie.id}`} style={{ marginLeft: '150px' }}>
                        <h2>{currentMovie.name}</h2>
                        <br />
                        <label>Expert:</label>
                        {currentMovie?.expertId?.length ? (
                          <>
                            <br />
                            {currentMovie?.expertId?.map((item) => (
                              <>{item?.fullName}<br /></>
                            ))}
                          </>
                        ) : (
                          'No expert available'
                        )}
                        <br />
                        <br />
                        <label>Description:</label> {currentMovie.description}
                        <br />
                        <br />
                        <label>Image:</label>
                        <br />
                        {currentMovie.imageUrl ? (
                          <img className="col-md-10" src={currentMovie.imageUrl} alt="" />
                        ) : (
                          'No image available'
                        )}
                        <br />
                        <label>Duration:</label> {currentMovie.duration}
                        <br />
                        <br />
                        <label>Price:</label> {currentMovie.price}
                        <br />
                        <br />
                        {currentMovie?.expertId?.find((item) => item._id === currentUser._id) ? null : (
                          <button type="button" data-toggle="modal" data-target="#exampleModal" className="btn btn-primary btn-update-movie">
                            Register service
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              'No service available'
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ExpertService;