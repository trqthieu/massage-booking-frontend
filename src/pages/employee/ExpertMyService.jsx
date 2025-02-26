import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Nav from '../../components/admin/Nav';
import request from '../../api/request';
import ExpertMenu from '../../components/expert/ExpertMenu';

function ExpertMyService() {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({ id: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleDelete = async () => {
    const result = await request.expertUnregisterService(currentMovie.id);
    const response = result.data;
    toast.success('Success', { autoClose: 2000 });
    getMovies();
  };

  const getMovies = async () => {
    const result = await request.expertGetMyMovies();
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
                        <div className="modal-body">Do you want to end this service?</div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={handleDelete}>End Service</button>
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
                        <button
                          type="button"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          className="btn btn-danger movie-delete-action"
                        >
                          End Service
                        </button>
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

export default ExpertMyService;