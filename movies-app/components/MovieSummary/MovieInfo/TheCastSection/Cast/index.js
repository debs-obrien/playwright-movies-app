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
          margin: 0 20px;
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
          scrollbar-width: thin;
          padding: 4px 0;
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
        }

        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          padding: 0.25rem;
          cursor: pointer;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease-in-out;
        }

        .arrow:disabled {
          color: #999;
          opacity: 0.4;
          cursor: default;
        }

        .arrow:not(:disabled):hover,
        .arrow:not(:disabled):focus {
          color: #ccc;
        }

        .arrow-left {
          left: -20px;
        }

        .arrow-right {
          right: -20px;
        }

        @media (max-width: 36em) {
          .arrow {
            display: none;
          }

          .track {
            scrollbar-width: auto;
          }

          .track::-webkit-scrollbar {
            height: 3px;
          }
        }
      `}</style>
    </>
  );
};

export default Cast;
