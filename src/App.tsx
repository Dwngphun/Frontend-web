import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Các component bố cục
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/layout/ProtectedRoute'; // Kiểm tra đăng nhập
import AdminLayout from './components/layout/AdminLayout'; // Bố cục Sidebar với Header
// Các page
import DashboardPage from './pages/DashboardPage';
import HocVienPage from './pages/HocVienPage';
import HocVienDetailPage from './pages/HocVienDetailPage';
import KhoaHocPage from './pages/KhoaHocPage';
import KhoaHocDetailPage from './pages/KhoaHocDetailPage';
import DangKyPage from './pages/DangKyPage';
import CapNhatKetQuaPage from './pages/CapNhatKetQuaPage';
import QuanLyTaiKhoanPage from './pages/QuanLyTaiKhoanPage';
import ThongKeQueQuanPage from './pages/ThongKeQueQuanPage';
import ThongKeThuongTruPage from './pages/ThongKeThuongTruPage';
import ThongKeKhoaHocPage from './pages/ThongKeKhoaHocPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang công khai - login*/}
        <Route path="/login" element={<LoginPage />} />

        {/* ProtectedRoute - phải đăng nhập rồi mới vào được */}
        <Route element={<ProtectedRoute />}>
          
          {/* Route bên trong <AdminLayout> chung bố cục (Sidebar, Header, Nút Đăng xuất)
           * Component trang con sẽ được render vào <Outlet /> của AdminLayout.*/}
          <Route path="/admin" element={<AdminLayout />}>
            
            {/* Các Trang Con (Admin Pages)*/}
            
            {/* Trang Tổng quan */}
            <Route path="dashboard" element={<DashboardPage />} />
            
            {/* Học Viên */}
            <Route path="hocvien" element={<HocVienPage />} />
            <Route path="hocvien/:ma_hv" element={<HocVienDetailPage />} />
            
            {/* Khóa Học */}
            <Route path="khoahoc" element={<KhoaHocPage />} />
            <Route path="khoahoc/:ma_kh" element={<KhoaHocDetailPage />} />
            
            {/* Đăng ký, cập nhật */}
            <Route path="dangky" element={<DangKyPage />} />
            <Route path="ketqua" element={<CapNhatKetQuaPage />} />
            
            {/* Báo Cáo & Quản Trị */}
            <Route path="thongke/que-quan" element={<ThongKeQueQuanPage />} />
            <Route path="thongke/thuong-tru" element={<ThongKeThuongTruPage />} />
            <Route path="thongke/khoa-hoc" element={<ThongKeKhoaHocPage />} />

            <Route path="taikhoan" element={<QuanLyTaiKhoanPage />} />

            {/* Nếu chỉ có /admin, tự động chuyển đến dashboard*/}
            <Route index element={<Navigate to="dashboard" />} />
          </Route>
        </Route>

        {/* Nếu / thì chuyển đến /login*/}
        <Route path="/" element={<Navigate to="/login" />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;