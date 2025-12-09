import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Kiểm tra xem token có trong localStorage không
  const token = localStorage.getItem('authToken');

  // Nếu có token, cho phép vào
  if (token) {
    return <Outlet />;
  }
  // Nếu không có token, đẩy người dùng về trang /login
  return <Navigate to="/login" />;
};

export default ProtectedRoute;