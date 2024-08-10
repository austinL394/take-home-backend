import * as React from 'react';
import { Header } from '../Header';
import TopBarActions from './TopBarActions';

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header>
        <TopBarActions />
      </Header>
      {/* Tool Bar */}
      <div className="w-full h-full">{children}</div>
      {/* Main Body */}
    </>
  );
};
