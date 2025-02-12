import React, { useEffect, useState } from 'react';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import request from '../../api/request';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';

function Movie() {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({
    id: null,
  });
  console.log('🚀 ~ Movie ~ currentMovie:', currentMovie);
  const [currentCategories, setCurrentCategories] = useState([]);

  const handleDelete = async () => {
    const result = await request.deleteMovie(currentMovie.id);
    const response = result.data;
    // if (response.success) {
    toast.success('Success', {
      autoClose: 2000,
    });
    getMovies();
    // }
  };

  const getMovies = async () => {
    const result = await request.getMovies();
    setMovieList(result.data);
    setCurrentMovie({ ...result.data[0], id: result.data[0]._id });
  };

  // const getCategories = async (movieId) => {
  //   const result = await request.getCategoriesByMovieId(movieId);
  //   setCurrentCategories(result.data);
  // };

  useEffect(() => {
    getMovies();
  }, []);

  // useEffect(() => {
  //   if (currentMovie?.id) {
  //     getCategories(currentMovie?.id);
  //   }
  // }, [currentMovie?.id]);

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
                  <li className="breadcrumb-item active">Service List</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className="content">
          <div className="container">
            {/* Content */}
            {movieList?.length ? (
              <div className="row">
                <div className="col-sm-3">
                  <div className="list-group movie-list">
                    {movieList.map((movie) => {
                      return (
                        <Link
                          to="#"
                          key={movie.id}
                          onClick={() =>
                            setCurrentMovie({ ...movie, id: movie._id })
                          }
                          className="list-group-item"
                        >
                          {movie.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="col-sm-9">
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
                          Do you want to end this service?
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                            onClick={handleDelete}
                          >
                            End Service
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {currentMovie && (
                    <div
                      className="info-movie"
                      id={`info-movie-${currentMovie.id}`}
                    >
                      <div
                        id={`detail-movie-${currentMovie.id}`}
                        style={{ marginLeft: '150px' }}
                      >
                        <h2>{currentMovie.name}</h2>
                        <br />
                        {/* <img
                        width={120}
                        height={160}
                        src={currentMovie.image}
                        alt="movie"
                      />
                      <br /> */}
                        <br />
                        <label>Expert:</label>{' '}
                        {currentMovie?.expertId?.fullName}
                        <br />
                        <br />
                        <label>Description:</label> {currentMovie.description}
                        <br />
                        {/* <br /> */}
                        {/* <label>Categories:</label>{' '}
                      {currentCategories.map((c) => c.name).join(', ')}
                      <br />
                      <br />
                      <label>Release Date:</label>{' '}
                      {moment(currentMovie.timeRelease).format('DD-MM-YYYY')}
                      <br /> */}
                        <br />
                        <label>Duration:</label> {currentMovie.duration}
                        <br />
                        <br />
                        <label>Price:</label> {currentMovie.price}
                        <br />
                        <br />
                        {/* <label>Format:</label> {currentMovie.format}
                      <br />
                      <br />
                      <label>Age Limit:</label>{' '}
                      {currentMovie.ageLimit === 0 ? 13 : currentMovie.ageLimit}
                      <br />
                      <br /> */}
                        {/* <Link to={`/admin/movies/${currentMovie.id}`}>
                        <button
                          type="button"
                          className="btn btn-primary btn-update-movie"
                        >
                          Update
                        </button>
                      </Link> */}
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
            {/* End Content */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Movie;
