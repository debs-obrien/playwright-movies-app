import { useEffect, useMemo, useRef, useState } from 'react';

const getRootMargin = offset => {
  if (typeof offset === 'number') {
    return `${offset}px 0px ${offset}px 0px`;
  }

  if (offset && typeof offset === 'object') {
    const vertical = offset.vertical ?? 0;
    const horizontal = offset.horizontal ?? 0;
    const top = offset.top ?? vertical;
    const bottom = offset.bottom ?? vertical;
    const left = offset.left ?? horizontal;
    const right = offset.right ?? horizontal;

    return `${top}px ${right}px ${bottom}px ${left}px`;
  }

  return '0px';
};

const LazyLoad = ({
  children,
  className,
  height,
  offset = 0,
  style
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() => typeof window === 'undefined');
  const rootMargin = useMemo(() => getRootMargin(offset), [offset]);

  useEffect(() => {
    if (isVisible) {
      return undefined;
    }

    const node = containerRef.current;
    if (!node) {
      return undefined;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    }, {
      rootMargin
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, rootMargin]);

  const wrapperStyle = {
    minHeight: typeof height === 'number' ? `${height}px` : height,
    ...style
  };

  const combinedClassName = ['lazy-load-image-background', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      className={combinedClassName}
      style={wrapperStyle}>
      {isVisible ? children : null}
    </div>
  );
};

export default LazyLoad;
