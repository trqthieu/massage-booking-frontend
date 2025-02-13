import React, { useEffect, useState } from 'react';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import request from '../../api/request';
import moment from 'moment';
import FileBase64 from 'react-file-base64';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ExpertMenu from '../../components/expert/ExpertMenu';

function ExpertCreateService() {
  const params = useParams();
  const navigate = useNavigate();
  const { movieId } = params;

  const [movieData, setMovieData] = useState({
    name: '',
    description: '',
    price: 0,
    duration: 0,
  });
  console.log('movieData', movieData);

  const getMovieInfo = async (movieId) => {
    const resultMovie = await request.expertDetMovieById(movieId);
    const {
      name,
      description,
      price,
      duration
    } = resultMovie.data;
    setMovieData({
      name,
      description,
     duration,
     price
    });
  };

  const handleChange = (name, value) => {
    const newMovieData = { ...movieData };
    newMovieData[name] = value;
    setMovieData(newMovieData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (movieId) {
      const newMovieData = { id: movieId, ...movieData };
      const result = await request.expertUpdateService(newMovieData);
      const response = result.data;
        toast.success('Success', {
          autoClose: 2000,
        });
        navigate('/expert/services');
     
    } else {
      const result = await request.expertCreateMovie(movieData);
      const response = result.data;
      console.log("🚀 ~ handleSubmit ~ response:", response)
      toast.success('Success', {
        autoClose: 2000,
      });
      navigate('/expert/services');
    }
  };

  useEffect(() => {
    
    if (movieId) {
      getMovieInfo(movieId);
    } else {
      setMovieData({
        name: '',
        description: '',
        duration: 0,
        price: 0,
      });
    }
  }, [movieId]);
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
                  <li className="breadcrumb-item active">Add service</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className="content">
          <div className="container">
            <form
              action="/movies"
              method="post"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}>
                  <labe>Service name</labe>
                </div>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    required
                    value={movieData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}>
                  <labe>Service description</labe>
                </div>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control"
                    name="director"
                    required
                    value={movieData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}>
                  <labe>Service duration</labe>
                </div>
                <div className="col-sm-4">
                  <input
                    type="number"
                    className="form-control"
                    name="time"
                    required
                    value={movieData.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}>
                  <labe>Service price</labe>
                </div>
                <div className="col-sm-4">
                  <input
                    type="number"
                    className="form-control"
                    name="ageLimit"
                    required
                    value={movieData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-sm-2" style={{ marginLeft: '150px' }}>
                  <labe />
                </div>
                <div className="col-sm-4">
                  <button type="submit" className="btn btn-primary">
                    {movieId ? 'Update' : 'Add'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ExpertCreateService;
