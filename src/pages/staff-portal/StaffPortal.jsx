import StaffSidebar from '../../components/StaffSidebar';
import '../../assets/styles/StaffDashboard.css';

function StaffPortal() {
  return (
    <div className="staff-dashboard-wrapper">
      <StaffSidebar />
      <main className="staff-dashboard">
        <div className="staff-dashboard-container" />
      </main>
    </div>
  );
}

export default StaffPortal;
