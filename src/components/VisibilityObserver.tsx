import { PropsWithChildren, createContext, useContext, useLayoutEffect, useRef, useState } from 'react';

export type ScrollController = {
  scrollTo: (tag: string) => void;
  elems: Map<string, HTMLElement>;
};

export const createScrollController = (): ScrollController => {
  const elems = new Map<string, HTMLElement>();

  return {
    scrollTo: (tag) => {
      const elem = elems.get(tag);
      if (elem) {
        elem.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    },
    elems,
  };
};

type Context = {
  observe: (elem: HTMLElement, tag: string) => void;
  unobserve: (elem: HTMLElement) => void;
};
const ObserverContext = createContext<Context | undefined>(undefined);

type State = {
  tag: string;
  elem: HTMLElement;
  top: number;
  ratio: number;
};

export type VisibilityObserverProps = {
  visibleTag?: string;
  onEnteredView: (tag: string) => void;
  scrollController?: ScrollController;
};

export const VisibilityObserver = ({
  visibleTag,
  onEnteredView,
  scrollController,
  children,
}: PropsWithChildren<VisibilityObserverProps>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [context, setContext] = useState<Context | undefined>(undefined);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const elems = new Map<HTMLElement, string>();
    const tags = new Map<string, HTMLElement>();
    const states = new Map<HTMLElement, State>();
    let active: string | undefined;

    const handleEvent = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const elem = entry.target as HTMLElement;
        const tag = elems.get(elem);
        if (!tag) {
          return;
        }

        states.set(elem, { tag, elem, top: entry.boundingClientRect.top, ratio: entry.intersectionRatio });
      });

      // find the state with the highest ratio
      let best: State | undefined;
      for (const state of states.values()) {
        if (!best || state.ratio > best.ratio) {
          best = state;
        } else if (state.ratio === best.ratio && state.top < best.top) {
          best = state;
        }
      }

      if (!best && active) {
        onEnteredView('');
        active = undefined;
      } else if (best && best.tag !== active) {
        onEnteredView(best.tag);
        active = best.tag;
      }
    };

    const observer = new IntersectionObserver(handleEvent, {
      threshold: Array.from({ length: 100 }, (_, i) => i / 100),
    });

    setContext({
      observe: (elem, tag) => {
        tags.set(tag, elem);
        elems.set(elem, tag);
        observer.observe(elem);
        if (scrollController) {
          scrollController.elems.set(tag, elem);
        }

        if (tag === visibleTag) {
          elem.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      },
      unobserve: (elem) => {
        const tag = elems.get(elem);
        if (tag) {
          observer.unobserve(elem);
          tags.delete(tag);
          elems.delete(elem);
          if (scrollController) {
            scrollController.elems.delete(tag);
          }
        }
      },
    });

    return () => {
      observer.disconnect();
      setContext(undefined);
    };
  }, [visibleTag, scrollController, onEnteredView]);

  return (
    <ObserverContext.Provider value={context}>
      <div ref={ref}>{children}</div>
    </ObserverContext.Provider>
  );
};

export type VisibilityObservableProps = {
  tag: string;
};

export const VisibilityObservable = ({ tag, children }: PropsWithChildren<VisibilityObservableProps>) => {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(ObserverContext);

  useLayoutEffect(() => {
    if (!ref.current || !context) {
      return;
    }

    const elem = ref.current;
    context.observe(elem, tag);

    return () => context.unobserve(elem);
  }, [tag, context]);

  return <div ref={ref}>{children}</div>;
};
