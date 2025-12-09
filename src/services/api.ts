import axios from 'axios';

// Tạo axios instance
const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: API_URL ? `${API_URL}/api` : 'http://localhost:8000/api'
});

// Thiết lập request interceptor (gửi đi) 
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thiết lập response interceptor (nhận về) 
apiClient.interceptors.response.use(
  // Nếu thành công
  (response) => {
    return response;
  },
  // Nếu thất bại
  (error) => {
    // Lấy thông tin về request gốc để biết lỗi này đến từ đâu
    const originalRequest = error.config;

    // Xem có phải lỗi 401 không
    if (error.response && error.response.status === 401) {
      // Nếu lỗi 401 đến từ API "/auth/login" thì là nhập sai Tk/Mk.
      // Trả lỗi về để hiển thị cảnh báo 
      if (originalRequest && originalRequest.url.includes('/auth/login')) {
        return Promise.reject(error);
      }
      // Nếu lỗi 401 đến từ các trang khác thì đẩy người dùng ra /login
      console.error('Lỗi 401: Token không hợp lệ hoặc đã hết hạn.');
      
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('username');
      
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;