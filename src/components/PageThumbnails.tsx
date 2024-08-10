import classNames from 'classnames';
import { ReactNode, useLayoutEffect, useRef } from 'react';
import ThumbnailTitle from './ThumbnailTitle';

export type Thumbnail = {
  id: string;
  page: ReactNode;
  title?: string;
};

export type PageThumbnailProps = {
  layout?: 'column' | 'row';
  className?: string;
  maxScale?: number;
  thumbnails: Thumbnail[];
  activeIdx?: number;
  bg?: 'none' | 'filled';
  onClick?: (index: number) => void;
};

const PageThumbnails = ({
  layout = 'column',
  className,
  maxScale = 1,
  thumbnails,
  activeIdx,
  bg = 'filled',
  onClick,
}: PageThumbnailProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const maxPageSize = useRef(0);
  const pagePaddingX = useRef(0);
  const pagePaddingY = useRef(0);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!maxPageSize.current || !pagePaddingX.current || !pagePaddingY.current) {
      // get the outer dimensions of the full sized thumbail box (page thumbnail + title)
      maxPageSize.current = ([...ref.current.children] as HTMLElement[])
        .map((child) => (layout === 'column' ? child.offsetWidth : child.offsetHeight))
        .reduce((max, size) => Math.max(max, size), 0);

      // compute thickness of border + padding
      const middle = ref.current.firstElementChild?.firstElementChild as HTMLElement;
      const inner = middle.firstElementChild as HTMLElement;
      pagePaddingX.current = middle.offsetWidth - inner.clientWidth;
      pagePaddingY.current = middle.offsetHeight - inner.clientHeight;
    }

    const computed = getComputedStyle(ref.current);
    if (
      !computed.paddingLeft.endsWith('px') ||
      !computed.paddingRight.endsWith('px') ||
      !computed.paddingTop.endsWith('px') ||
      !computed.paddingBottom.endsWith('px')
    ) {
      throw new Error('Padding must be in pixels');
    }
    const horizontalPadding = parseFloat(computed.paddingLeft) + parseFloat(computed.paddingRight);
    const verticalPadding = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
    const paddingSize = layout === 'column' ? horizontalPadding : verticalPadding;

    const rescale = () => {
      if (!ref.current) {
        return;
      }

      const size = layout === 'column' ? ref.current.clientWidth : ref.current.clientHeight;
      const scale = Math.min(maxScale, (size - paddingSize - pagePaddingX.current) / maxPageSize.current);

      for (const parent of [...ref.current.children] as HTMLElement[]) {
        const child = parent.firstElementChild as HTMLElement;
        child.style.width = child.scrollWidth * scale + pagePaddingX.current + 'px';
        child.style.height = child.scrollHeight * scale + pagePaddingY.current + 'px';
        const inner = child.firstElementChild as HTMLElement;
        inner.style.scale = scale.toString();
        inner.style.transformOrigin = '0 0';
      }
    };

    rescale();
    window.addEventListener('resize', rescale);
    return () => window.removeEventListener('resize', rescale);
  }, [layout, thumbnails, maxScale]);

  const handleClick = (index: number) => {
    onClick?.(index);
  };

  return (
    <div
      ref={ref}
      className={classNames(
        'flex gap-[24px] p-4 items-center',
        layout === 'column' ? 'flex-col h-full' : 'flex-row w-full',
        className,
      )}
    >
      {thumbnails.map((entry, idx) => {
        return (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div
              className={classNames([
                'overflow-hidden border-4 p-2',
                activeIdx == idx ? 'border-[#46b5e5]' : 'border-transparent',
                onClick && 'cursor-pointer',
              ])}
              onClick={() => handleClick(idx)}
            >
              <div style={{ width: 'max-content', height: 'max-content' }}>{entry.page}</div>
            </div>
            {entry.title && (
              <div className={classNames([onClick && 'cursor-pointer'])} onClick={() => handleClick(idx)}>
                <ThumbnailTitle bg={activeIdx === idx ? 'accent' : bg}>{entry.title}</ThumbnailTitle>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PageThumbnails;
