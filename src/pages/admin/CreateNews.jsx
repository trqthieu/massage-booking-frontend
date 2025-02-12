import React, { useEffect, useState } from 'react';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import request from '../../api/request';
import moment from 'moment';
import FileBase64 from 'react-file-base64';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import MarkdownIt from 'markdown-it';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

function CreateNews() {
  const params = useParams();
  const navigate = useNavigate();
  const { newsId } = params;
  const [movieList, setMovieList] = useState([]);
  const typeList = [
    {
      id: 'NEWS',
      name: 'News',
    },
    {
      id: 'DISCOUNT',
      name: 'Discount',
    },
    {
      id: 'VIDEO',
      name: 'Video',
    },
  ];

  const [newsData, setNewsData] = useState({
    title: '',
    published: true,
    author: '',
    content: '',
  });
  console.log('newsData', newsData);

  const mdParser = new MarkdownIt();

  function handleEditorChange({ text }) {
    setNewsData({
      ...newsData,
      content: text,
    });
  }

  // const getMovieList = async () => {
  //   const responseMovie = await request.getMovies();
  //   console.log('responseMovie.data[0].id', responseMovie.data[0].id);
  //   setMovieList(responseMovie.data);
  //   if (!newsId) {
  //     setNewsData({
  //       ...newsData,
  //       movieId: responseMovie.data[0].id,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   getMovieList();
  // }, []);

  const handleChange = (name, value) => {
    const newNewsData = { ...newsData };
    newNewsData[name] = value;
    setNewsData(newNewsData);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (newsId) {
      const updateNewsData = { id: newsId, ...newsData };
      const result = await request.updateNews(updateNewsData);
      const response = result.data;
      // if (response.success) {
        toast.success('Success', {
          autoClose: 2000,
        });
        navigate('/admin/blogs');
      // }
    } else {
      const result = await request.createNews(newsData);
      const response = result.data;
      // if (response.success) {
        toast.success('Success', {
          autoClose: 2000,
        });
        navigate('/admin/blogs');
      // }
    }
  };

  const getNewsInfo = async newsId => {
    const resultNews = await request.getNewsById(newsId);
    const {
      title,
      author,
      content,
    } = resultNews.data;
    setNewsData({
      title,
      author,
      content,
    });
  };

  useEffect(() => {
    if (newsId) {
      getNewsInfo(newsId);
    }
  }, [newsId]);

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
                  <li className='breadcrumb-item active'>Add New Blogs</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='container'>
            <form
              action='/movies'
              method='post'
              encType='multipart/form-data'
              onSubmit={handleSubmit}
            >
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <label>Title</label>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='text'
                    className='form-control'
                    name='title'
                    required
                    value={newsData.title}
                    onChange={e => handleChange('title', e.target.value)}
                  />
                </div>
              </div>
              {/* <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <label>Image</label>
                </div>
                <div className='col-sm-4'>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => {
                      setNewsData({ ...newsData, image: base64 });
                    }}
                  />
                </div>
              </div> */}
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <label>Author</label>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='text'
                    className='form-control'
                    name='author'
                    value={newsData.author}
                    onChange={e => handleChange('author', e.target.value)}
                  />
                </div>
              </div>
              {/* <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <label>Movie</label>
                </div>
                <div className='col-sm-4'>
                  <select
                    name='movieId'
                    className='form-control'
                    value={newsData.movieId}
                    onChange={e => handleChange('movieId', e.target.value)}
                  >
                    {movieList.map(movie => {
                      return (
                        <option key={movie.id} value={movie.id}>
                          {movie.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div> */}
              {/* <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <label>News Type</label>
                </div>
                <div className='col-sm-4'>
                  <select
                    name='type'
                    className='form-control'
                    value={newsData.type}
                    onChange={e => handleChange('type', e.target.value)}
                  >
                    {typeList.map(type => {
                      return (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div> */}
              <div className='' style={{ marginBottom: '15px' }}>
                <div>
                  <h6>Content</h6>
                  <MarkdownEditor
                    value={newsData.content}
                    style={{ height: '500px' }}
                    onChange={handleEditorChange}
                    renderHTML={text => mdParser.render(text)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}></div>
                <div className='col-sm-4'>
                  <button type='submit' className='btn btn-primary'>
                    {newsId ? 'Update' : 'Add'}
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

export default CreateNews;
