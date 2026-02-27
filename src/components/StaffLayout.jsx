import { Outlet } from 'react-router-dom';
import StaffSidebar from './StaffSidebar';
import '../assets/styles/StaffDashboard.css';

function StaffLayout() {
  return (
    <div className="staff-dashboard-wrapper">
      <StaffSidebar />
      <div className="staff-dashboard">
        <div className="staff-dashboard-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default StaffLayout;
