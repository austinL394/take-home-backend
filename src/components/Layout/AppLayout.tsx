import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="w-full min-h-[100vh] bg-black text-center font-grotesk">
      <Outlet />
    </div>
  );
};

export default AppLayout;
