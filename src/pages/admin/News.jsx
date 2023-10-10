import React, { useEffect, useState } from 'react';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import request from '../../api/request';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import MarkdownIt from 'markdown-it';
import YouTube from 'react-youtube';

function News() {
  const navigate = useNavigate();
  const mdParser = new MarkdownIt();
  const [newsList, setNewsList] = useState([]);
  const [movieData, setMovieData] = useState();
  const [currentNews, setCurrentNews] = useState({
    id: null,
    movie_id: null,
  });
  console.log('currentNews', currentNews);
  console.log('movieData', movieData);
  const handleDelete = async () => {
    const result = await request.deleteNews(currentNews.id);
    const response = result.data;
    if (response.success) {
      toast.success(response.data.message, {
        autoClose: 2000,
      });
      getNews();
    }
  };

  const getNews = async () => {
    const result = await request.getNews();
    setNewsList(result.data);
    setCurrentNews(result.data[0]);
  };

  const getMovieData = async movieId => {
    const result = await request.getMovieById(movieId);
    setMovieData(result.data[0]);
  };

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    getMovieData(currentNews.movie_id);
  }, [currentNews.id, currentNews.movie_id]);

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
                  <li className='breadcrumb-item active'>Danh sách tin tức</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='container'>
            {/* Content */}
            <div className='row'>
              <div className='col-sm-3'>
                <div className='list-group movie-list'>
                  {newsList.map(news => {
                    return (
                      <Link
                        to='#'
                        key={news.id}
                        onClick={() => setCurrentNews(news)}
                        className='list-group-item'
                        style={{
                          maxLines: 2,
                        }}
                      >
                        {news?.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className='col-sm-9'>
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
                          Xác nhận
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
                        Bạn muốn xóa tin tức này?
                      </div>
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-secondary'
                          data-dismiss='modal'
                        >
                          Đóng
                        </button>
                        <button
                          type='button'
                          className='btn btn-danger'
                          data-dismiss='modal'
                          onClick={handleDelete}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <c:foreach var='movie' items='${movies}'> */}
                {currentNews && (
                  <div className='info-movie' id='info-movie-${movie.id}'>
                    <div
                      id='detail-movie-${movie.id}'
                      style={{ marginLeft: '150px' }}
                    >
                      <h5>{currentNews.title}</h5>
                      <br />
                      <br />
                      {movieData?.primaryThumbnail &&
                        currentNews?.type === 'VIDEO' && (
                          <div>
                            <YouTube
                              videoId={movieData?.primaryThumbnail}
                              opts={{
                                height: '390',
                                width: '100%',
                                playerVars: {
                                  autoplay: 1, // Auto-play the video
                                },
                              }}
                            />
                          </div>
                        )}
                      {currentNews.content && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: mdParser.render(currentNews.content),
                          }}
                          style={{
                            maxWidth: '100%', // Set a maximum width for the container
                            overflowX: 'auto', // Add horizontal scrolling if necessary
                          }}
                          className='markdown-content'
                        ></div>
                      )}
                      <br />
                      <br />
                      <Link to={`/admin/news/${currentNews.id}`}>
                        <button
                          type='button'
                          className='btn btn-primary btn-update-movie'
                        >
                          Cập nhật
                        </button>
                      </Link>
                      <button
                        type='button'
                        data-toggle='modal'
                        data-target='#exampleModal'
                        data-movie-id='${movie.id}'
                        className='btn btn-danger movie-delete-action'
                      >
                        Xóa tin tức
                      </button>
                    </div>
                  </div>
                )}
                {/* </c:foreach> */}
              </div>
            </div>
            {/* End Content */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default News;
