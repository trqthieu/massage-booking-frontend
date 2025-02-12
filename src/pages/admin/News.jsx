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
  const [currentNews, setCurrentNews] = useState({
    _id: null,
    movie_id: null,
  });
  console.log('currentNews', currentNews);

  const handleDelete = async () => {
    const result = await request.deleteNews(currentNews._id);
    const response = result.data;
    // if (response.success) {
    toast.success('Success', {
      autoClose: 2000,
    });
    getNews();
    // }
  };

  const getNews = async () => {
    const result = await request.getNews();
    setNewsList(result.data);
    setCurrentNews(result.data[0]);
  };

  useEffect(() => {
    getNews();
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
                  <li className="breadcrumb-item active">Blogs List</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className="content">
          <div className="container">
            {/* Content */}
            <div className="row">
              <div className="col-sm-3">
                <div className="list-group news-list">
                  {newsList.map((news) => (
                    <Link
                      to="#"
                      key={news._id}
                      onClick={() => setCurrentNews(news)}
                      className="list-group-item"
                      style={{ maxLines: 2 }}
                    >
                      {news?.title} / {news?.author}
                    </Link>
                  ))}
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
                        Do you want to delete this news?
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
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {currentNews && (
                  <div
                    className="info-news"
                    id={`info-news-${currentNews._id}`}
                  >
                    <div
                      id={`detail-news-${currentNews._id}`}
                      style={{ marginLeft: '150px' }}
                    >
                      <h5>{currentNews.title}</h5>
                      <br />
                      <br />
                      {/* If there's a video or additional media, add it here */}
                      {currentNews.content && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: mdParser.render(currentNews.content),
                          }}
                          style={{
                            maxWidth: '100%', // Set a maximum width for the container
                            overflowX: 'auto', // Add horizontal scrolling if necessary
                          }}
                          className="markdown-content"
                        ></div>
                      )}
                      <br />
                      <br />
                      <Link to={`/admin/blogs/${currentNews._id}`}>
                        <button
                          type="button"
                          className="btn btn-primary btn-update-news"
                        >
                          Update
                        </button>
                      </Link>
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        className="btn btn-danger news-delete-action"
                      >
                        Delete Blog
                      </button>
                    </div>
                  </div>
                )}
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
