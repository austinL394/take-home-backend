import classNames from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';

interface Props {
  content: ReactNode | string;
  position?: 'top' | 'bottom';
  width?: number;
}

const Tooltip = ({ children, position = 'bottom', width, content }: PropsWithChildren<Props>) => {
  return (
    <div className="tt">
      {children}
      <span
        className={classNames('tt-text mt-2 bg-white text-black rounded-[5px] text-xs', {
          'tt-pos-bottom': position === 'bottom',
          'tt-pos-top': position === 'top',
        })}
        style={{
          minWidth: width,
        }}
      >
        {content}
      </span>
    </div>
  );
};

export default Tooltip;
