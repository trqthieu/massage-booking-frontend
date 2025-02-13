import axiosClient from '.';

const request = {
  getMovies() {
    return axiosClient.get('/admin/services');
  },

  expertGetMovies() {
    return axiosClient.get('/expert/services');
  },

  getCategoriesByMovieId(movieId) {
    return axiosClient.get(`/movies/${movieId}/categories`);
  },
  getCategories() {
    return axiosClient.get('/movies/categories');
  },
  getLanguages() {
    return axiosClient.get('/movies/languages');
  },
  getFormats() {
    return axiosClient.get('/movies/formats');
  },
  getCountries() {
    return axiosClient.get('/movies/countries');
  },
  createMovie(movie) {
    return axiosClient.post('/movies', movie);
  },
  expertCreateMovie(movie) {
    return axiosClient.post('expert/services', movie);
  },
  updateMovie(movie) {
    return axiosClient.put('/movies', movie);
  },
  expertUpdateService(movie) {
    return axiosClient.put(`/expert/services/${movie.id}`, movie);
  },
  deleteMovie(movieId) {
    return axiosClient.delete(`/admin/services/${movieId}`, {
      data: {
        id: movieId,
      },
    });
  },
  expertDeleteMovie(movieId) {
    return axiosClient.delete(`/expert/services/${movieId}`, {
      data: {
        id: movieId,
      },
    });
  },
  getMovieById(movieId) {
    return axiosClient.get(`/movies/${movieId}`);
  },
  expertDetMovieById(movieId) {
    return axiosClient.get(`expert/services/${movieId}`);
  },
  getCinemas() {
    return axiosClient.get(`/cinemas`);
  },
  getCinemaById(cinemaId) {
    return axiosClient.get(`/cinemas/${cinemaId}`);
  },
  getCinemaByCityId(cityId) {
    return axiosClient.get(`/cinemas/cinemaByCityId/${cityId}`);
  },
  getCities() {
    return axiosClient.get(`/cinemas/cities`);
  },
  createCinema(cinema) {
    return axiosClient.post('/cinemas', cinema);
  },
  updateCinema(cinema) {
    return axiosClient.put('/cinemas', cinema);
  },
  deleteCinema(cinemaId) {
    return axiosClient.delete('/cinemas', {
      data: {
        id: cinemaId,
      },
    });
  },
  getRoomsByCinemaId(cinemaId) {
    return axiosClient.get(`/cinemas/${cinemaId}/rooms`);
  },
  addRoom(roomName, cinemaId) {
    return axiosClient.post('/cinemas/rooms', {
      roomName,
      cinemaId,
    });
  },
  getCinemaByRoomId(roomId) {
    return axiosClient.get(`/cinemas/rooms/${roomId}`);
  },
  getEmpList() {
    return axiosClient.get('/admin/users');
  },
  createEmp(emp) {
    return axiosClient.post('/admin/users', emp);
  },
  getEmpById(empId) {
    return axiosClient.get(`/admin/users/${empId}`);
  },
  updateEmp(emp) {
    return axiosClient.put(`/admin/users/${emp.id}`, emp);
  },
  deleteEmp(empId) {
    return axiosClient.delete(`/admin/users/${empId}`, {
      data: {
        id: empId,
      },
    });
  },
  getSchedules() {
    return axiosClient.get('/admin/appointments');
  },
  expertGetSchedules() {
    return axiosClient.get('/expert/appointments');
  },
  getSchedulesByCinema(data) {
    return axiosClient.get('/schedules', {
      params: {
        cinemaId: data.cinemaId,
        day: data.day,
        movieId: data.movieId,
      },
    });
  },
  getScheduleById(scheduleId) {
    return axiosClient.get(`/schedules/${scheduleId}`);
  },
  createSchedule(schedule) {
    return axiosClient.post('/schedules', schedule);
  },
  updateSchedule(schedule) {
    return axiosClient.put('/schedules', schedule);
  },
  deleteSchedule(scheduleId) {
    return axiosClient.delete('/schedules', {
      data: {
        id: scheduleId,
      },
    });
  },
  expertAcceptAppointment(scheduleId) {
    return axiosClient.patch(`expert/appointments/${scheduleId}/accept`);
  },
  expertDenyAppointment(scheduleId) {
    return axiosClient.patch(`expert/appointments/${scheduleId}/decline`);
  },
  getChairsByScheduleId(scheduleId) {
    return axiosClient.get(`/schedules/chairsByScheduleId/${scheduleId}`);
  },
  getTimeTypeSchedule(scheduleId) {
    return axiosClient.get(`/schedules/timeTypeSchedule/${scheduleId}`);
  },
  getAllChairs() {
    return axiosClient.get(`/schedules/allChairs`);
  },
  bookingChairs(data) {
    return axiosClient.post(`/schedules/bookingChairs`, data);
  },
  getAmount({ date_type, time_type, format_id }) {
    return axiosClient.get(`/schedules/amount`, {
      params: { date_type, time_type, format_id },
    });
  },
  getReport(fromDate, toDate, movieId) {
    return axiosClient.get(`/admin/report`, {
      params: { fromDate, toDate, movieId },
    });
  },
  getTicketByCode(code) {
    return axiosClient.get(`/schedules/ticketByCode`, {
      params: { code },
    });
  },
  receiveTicket(code) {
    return axiosClient.post(`/schedules/receiveTicket`, {
      code,
    });
  },
  login(user) {
    return axiosClient.post('/auth/local/login', user);
  },

  register(user) {
    return axiosClient.post('/auth/register', user);
  },
  getMyInfo() {
    return axiosClient.get('/auth/profile');
  },
  confirmPassword(data) {
    return axiosClient.post('/auth/confirmPassword', data);
  },
  updateMyInfo(user) {
    return axiosClient.put('/auth/profile', user);
  },
  getMyTickets() {
    return axiosClient.get('/auth/myTickets');
  },
  getProducts() {
    return axiosClient.get('/products');
  },
  createProduct(product) {
    return axiosClient.post('/products', product);
  },
  getProductById(productId) {
    return axiosClient.get(`/products/${productId}`);
  },
  updateProduct(product) {
    return axiosClient.put('/products', product);
  },
  deleteProduct(productId) {
    return axiosClient.delete('/products', {
      data: {
        id: productId,
      },
    });
  },
  getNews() {
    return axiosClient.get('/blogs');
  },
  createNews(news) {
    return axiosClient.post('/blogs', news);
  },
  getNewsById(newsId) {
    return axiosClient.get(`/blogs/${newsId}`);
  },
  updateNews(news) {
    return axiosClient.put(`/blogs/${news.id}`, news);
  },
  deleteNews(newsId) {
    return axiosClient.delete(`/blogs/${newsId}`, {
      data: {
        id: newsId,
      },
    });
  },
};
export default request;
