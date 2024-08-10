import { PropsWithChildren } from 'react';
import { useLocation, Link } from 'react-router-dom';

export const Header = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-gradient h-[91px] flex w-full flex-shrink font-grotesk pl-6 pr-[30px] items-center justify-between">
      <div className="flex gap-3">
        <div className="md:flex hidden"></div>
        <div className="flex gap-[17px] items-center sm:flex hidden">
          <Link
            to="/reports"
            className={`text-white border-b-4 font-grotesk text-2xl ${!isActive('/reports') && 'opacity-65'}`}
          >
            Reports
          </Link>
          <Link
            to="/admin"
            className={`text-white border-b-4 test-grotesk text-2xl ${!isActive('/admin') && 'opacity-65'}`}
          >
            Admin
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};
