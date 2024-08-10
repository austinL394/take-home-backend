import classNames from 'classnames';
import { PropsWithChildren } from 'react';

const classes = {
  none: 'bg-transparent text-neutral-200',
  filled: 'bg-neutral-200 text-neutral-800',
  accent: 'bg-[#46b5e5] text-white',
} as const;

export type ThumbnailTitleProps = {
  bg: 'none' | 'filled' | 'accent';
};

const ThumbnailTitle = ({ children, bg }: PropsWithChildren<ThumbnailTitleProps>) => {
  return (
    <div className="flex items-center justify-between">
      <div className={classNames('text-xs rounded px-2 py-1', classes[bg])}>{children}</div>
    </div>
  );
};

export default ThumbnailTitle;
