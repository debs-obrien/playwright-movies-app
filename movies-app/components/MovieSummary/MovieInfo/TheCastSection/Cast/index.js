import { useCallback, useEffect, useRef, useState } from 'react';

import ChevronLeftIcon from 'public/assets/svgs/icons/chevron-left.svg';
import ChevronRightIcon from 'public/assets/svgs/icons/chevron-right.svg';

import PersonLink from './PersonLink';

const ITEM_WIDTH = 70;

const Cast = ({
  cast,
  baseUrl
}) => {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }

    const { scrollLeft, clientWidth, scrollWidth } = track;
    setCanScrollPrev(scrollLeft > 0);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  const updateSlidesToShow = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const rawSlides = Math.round(viewport.offsetWidth / ITEM_WIDTH);
    const boundedSlides = Math.max(1, Math.min(cast.length, rawSlides || 1));
    setSlidesToShow(boundedSlides);
    // update scroll buttons whenever layout changes
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(updateScrollState);
    } else {
      updateScrollState();
    }
  }, [cast.length, updateScrollState]);

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, [updateSlidesToShow]);

  useEffect(() => {
    updateScrollState();
  }, [cast.length, updateScrollState]);

  const scrollBySlides = useCallback((direction) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const scrollAmount = (slidesToShow || 1) * ITEM_WIDTH * direction;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, [slidesToShow]);

  return (
    <>
      <div className='cast'>
        <div className='viewport' ref={viewportRef}>
          <button
            type='button'
            className='arrow arrow-left'
            onClick={() => scrollBySlides(-1)}
            disabled={!canScrollPrev}
            aria-label='Scroll cast list left'>
            <ChevronLeftIcon width='1em' height='1em' />
          </button>
          <div
            className='track'
            ref={trackRef}
            onScroll={updateScrollState}>
            {cast.map(person => (
              <div
                key={person.credit_id}
                className='slide'>
                <PersonLink
                  person={person}
                  baseUrl={baseUrl} />
              </div>
            ))}
          </div>
          <button
            type='button'
            className='arrow arrow-right'
            onClick={() => scrollBySlides(1)}
            disabled={!canScrollNext}
            aria-label='Scroll cast list right'>
            <ChevronRightIcon width='1em' height='1em' />
          </button>
        </div>
      </div>
      <style jsx>{`
        .cast {
          margin: 0 12px;
        }

        .viewport {
          position: relative;
          padding: 12px 0;
        }

        .track {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x proximity;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-x: contain;
          scrollbar-width: thin;
          padding: 4px 36px;
        }

        .track::-webkit-scrollbar {
          height: 6px;
        }

        .track::-webkit-scrollbar-thumb {
          background-color: rgba(153, 153, 153, 0.4);
          border-radius: 999px;
        }

        .slide {
          flex: 0 0 auto;
          width: ${ITEM_WIDTH}px;
          display: flex;
          justify-content: center;
          scroll-snap-align: start;
        }

        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          background: rgba(var(--palette-background-paper-rgb), 0.9);
          border: 1px solid var(--palette-divider);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          min-width: 40px;
          min-height: 40px;
          padding: 0;
          cursor: pointer;
          color: var(--palette-text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
        }

        .arrow:disabled {
          color: var(--palette-text-disabled);
          opacity: 0.4;
          cursor: default;
        }

        .arrow:not(:disabled):hover,
        .arrow:not(:disabled):focus-visible {
          color: var(--palette-text-primary);
        }

        .arrow:focus-visible {
          outline: 2px solid var(--palette-primary-main);
          outline-offset: 2px;
        }

        .arrow-left {
          left: 0;
        }

        .arrow-right {
          right: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .track {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </>
  );
};

export default Cast;
