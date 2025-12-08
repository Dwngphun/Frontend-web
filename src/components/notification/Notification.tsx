import React, { useEffect } from 'react';
import '../../styles/notification.css';
interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void; // Hàm callback để báo cho component cha là "Tôi đã đóng"
}
const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  // Tự động đóng sau 5 giây
  useEffect(() => {
    // Tạo một bộ đếm thời gian
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    //Hủy bộ đếm nếu component bị gỡ
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className={`notification notification-${type}`}>
      {message}
    </div>
  );
};
export default Notification;