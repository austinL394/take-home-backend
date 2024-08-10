import classNames from 'classnames';
import { PropsWithChildren, useCallback, useEffect } from 'react';

export interface DropdownAction {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (...args: any[]) => void;
}

interface DropdownProps {
  openMenu: boolean;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  actions: DropdownAction[];
  onCloseMenu: () => void;
}

const Dropdown = ({
  openMenu,
  actions,
  direction = 'left',
  onCloseMenu,
  children,
}: PropsWithChildren<DropdownProps>) => {
  const toggleDropdown = () => {};

  const handleCloseMenu = useCallback(
    (e: MouseEvent) => {
      if (
        typeof (e?.target as Element)?.className?.includes === 'function' &&
        !(e.target as Element).className.includes('drop-down-menu-item')
      ) {
        onCloseMenu();
      }
    },
    [onCloseMenu],
  );

  useEffect(() => {
    // Add click event listener
    document.addEventListener('mousedown', handleCloseMenu);
    return () => {
      // Remove event listener on cleanup
      document.removeEventListener('mousedown', handleCloseMenu);
    };
  }, [handleCloseMenu]);

  const handleMenuClickEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleMenuClickEvent}>
      <div className="relative">
        <div
          className="px-1 py-2 text-white font-medium rounded-lg text-sm inline-flex items-center cursor-pointer"
          onClick={toggleDropdown}
        >
          {children}
        </div>

        {openMenu && (
          <div
            className={classNames(
              'absolute  w-[134px] text-xs rounded-[5px] shadow-lg bg-white ring-1 ring-black ring-opacity-5',
              {
                'right-[0px] top-[100%]': direction === 'bottom',
                'left-[-134px] top-0': direction === 'left',
              },
            )}
          >
            <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {actions.map(({ title, action }, index) => {
                return (
                  <li key={title}>
                    <a
                      href="#"
                      className={classNames(
                        'drop-down-menu-item font-medium block rounded-[5px] px-3 py-[5px] text-grotek text-neutral-10 text-xs hover:bg-gray-100',
                        {
                          'border-b': index < actions.length - 1,
                        },
                      )}
                      onClick={() => {
                        action();
                        onCloseMenu();
                      }}
                    >
                      {title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
