import React, { useEffect, useState } from 'react';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import request from '../../api/request';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import MarkdownIt from 'markdown-it';

function News() {
  const navigate = useNavigate();
  const mdParser = new MarkdownIt();
  const [newsList, setNewsList] = useState([]);
  const [currentNews, setCurrentNews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getNews = async () => {
    const result = await request.getNews();
    setNewsList(result.data);
    setCurrentNews(result.data[0]);
  };

  const handleDelete = async () => {
    await request.deleteNews(currentNews._id);
    toast.success('Success', { autoClose: 2000 });
    getNews();
  };

  useEffect(() => {
    getNews();
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsList.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                  <li className="breadcrumb-item"><a href="/admin">Home</a></li>
                  <li className="breadcrumb-item active">Blogs List</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <div className="list-group news-list">
                  {currentItems.map((news) => (
                    <Link
                      to="#"
                      key={news._id}
                      onClick={() => setCurrentNews(news)}
                      className="list-group-item"
                    >
                      {news?.title} / {news?.author}
                    </Link>
                  ))}
                </div>
                {/* Pagination Controls */}
                <nav>
                  <ul className="pagination">
                    {Array.from({ length: Math.ceil(newsList.length / itemsPerPage) }, (_, i) => (
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
                {currentNews && (
                  <div className="info-news">
                    <div style={{ marginLeft: '150px' }}>
                      <h5>{currentNews.title}</h5>
                      {currentNews.content && (
                        <div
                          dangerouslySetInnerHTML={{ __html: mdParser.render(currentNews.content) }}
                          className="markdown-content"
                        ></div>
                      )}
                      <Link to={`/admin/blogs/${currentNews._id}`}>
                        <button type="button" className="btn btn-primary">
                          Update
                        </button>
                      </Link>
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        className="btn btn-danger"
                      >
                        Delete Blog
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default News;
