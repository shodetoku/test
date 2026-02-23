import { Outlet } from 'react-router-dom';
import StaffSidebar from '../components/StaffSidebar';

function StaffLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 lg:flex">
      <StaffSidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default StaffLayout;
