import React from 'react';
import Sidebar from './LayoutConponents/SideBar';


interface AdminLayoutProps {
  children: React.ReactNode; // Để nhận các component con
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div style={layoutStyle}>
      <Sidebar />
      <div style={mainContentStyle}>
        {children} {/* Hiển thị các component con ở đây */}
      </div>
    </div>
  );
};

const layoutStyle: React.CSSProperties = {
  display: 'flex',
  height: '100vh',
};

const mainContentStyle: React.CSSProperties = {
  width: '75%', // Giữ nguyên chiều rộng cho phần chính
  padding: '20px',
  boxSizing: 'border-box',
};

export default AdminLayout;