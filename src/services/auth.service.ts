import apiClient from './api'; 
/* Interface cho dữ liệu mà API /login trả về khi đăng nhập thành công.*/
interface LoginResponse {
  message: string;
  token: string;
}

/* Gọi API: POST /api/auth/login
  Trả về {Promise<LoginResponse>} Một Promise chứa (message, token) nếu thành công*/
export const login = async (ten_dang_nhap: string, mat_khau: string) => {
  try {
    // Gửi yêu cầu 
    const response = await apiClient.post<LoginResponse>(
      '/auth/login', 
      {
        ten_dang_nhap,
        mat_khau
      }
    );
    return response.data;
  } catch (error: any) {
    // Lỗi do server trả về 
    if (error.response) {
      throw new Error(error.response.data.error || 'Đã có lỗi xảy ra');
    } 
    // Lỗi không kết nối được server 
    else {
      console.error('Lỗi Axios (Auth Service):', error.message);
      throw new Error('Không thể kết nối đến máy chủ.');
    }
  }
};