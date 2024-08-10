import { PropsWithChildren, useLayoutEffect, useRef } from 'react';

export type ScaledPageProps = {
  zoom: number;
};

const ScaledPage = ({ zoom, children }: PropsWithChildren<ScaledPageProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const parent = ref.current.parentElement;
    const computed = parent && getComputedStyle(parent);
    if (computed && (!computed.paddingLeft.endsWith('px') || !computed.paddingRight.endsWith('px'))) {
      throw new Error('Padding must be in pixels');
    }
    const contentWidth = (ref.current.firstElementChild?.firstElementChild as HTMLElement).scrollWidth;
    const contentHeight = (ref.current.firstElementChild?.firstElementChild as HTMLElement).scrollHeight;

    const rescale = () => {
      if (!ref.current) {
        return;
      }

      const elem = ref.current;
      const child = elem.firstElementChild as HTMLElement;
      child.style.width = contentWidth * zoom + 'px';
      child.style.height = contentHeight * zoom + 'px';
      const inner = child.firstElementChild as HTMLElement;
      inner.style.scale = zoom.toString();
      inner.style.transformOrigin = '0 0';
    };

    rescale();

    const container = ref.current.parentElement as HTMLElement;
    if (container) {
      const observer = new ResizeObserver(() => rescale());
      observer.observe(container);

      return () => observer.disconnect();
    }
  }, [children, zoom]);

  return (
    <div ref={ref}>
      <div className="mx-auto overflow-hidden mx-auto">
        <div className="w-[max-content] h-[max-content]">{children}</div>
      </div>
    </div>
  );
};

export default ScaledPage;
