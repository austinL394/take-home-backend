import { PropsWithChildren } from 'react';
import './PrintablePage.css';
import classNames from 'classnames';

export type PageSize = 'letter' | 'a4';
export type PageOrientation = 'portrait' | 'landscape';

export type PrintablePageProps = {
  size: PageSize;
  orientation: PageOrientation;
  className?: string;
};

const PrintablePage = ({ size, orientation, className, children }: PropsWithChildren<PrintablePageProps>) => {
  return <div className={classNames([`${size}-${orientation} bg-white`, className])}>{children}</div>;
};

export default PrintablePage;
