

import LazyLoad from 'react-lazyload';

import Scenery from 'components/Scenery';
import PosterTitle from 'components/PosterTitle';
import {
  W355_AND_H200_BESTV2,
  // W710_AND_H400_BESTV2
} from 'config/image-sizes';

/**
 * TODO:
 * Should use srcset approach to serve responsive images. Re: https://web.dev/serve-responsive-images/
 */

const SCENERY_CONTAINER_CLASS_NAME = 'scenery-container';
const GRAY_FILTERED_CLASS_NAME = 'gray-filtered';

const ChooseImageItem = ({
  theme,
  movie,
  baseUrl,
  text,
  textAlwaysVisible,
  ...rest
}) => (
  <li aria-label="movie">
    <LazyLoad
      height={200}
      offset={200}>
      <button
        className={SCENERY_CONTAINER_CLASS_NAME}
        {...rest}>
        <Scenery
          overlayClass={GRAY_FILTERED_CLASS_NAME}
          width={W355_AND_H200_BESTV2.WIDTH}
          height={W355_AND_H200_BESTV2.HEIGHT}
          // TODO: placeholder is broken with it
          // srcSet={`${baseUrl}/${W355_AND_H200_BESTV2.FULL}${movie.backdrop_path} 1x, ${baseUrl}/${W710_AND_H400_BESTV2.FULL}${movie.backdrop_path} 2x`} 
          src={`${baseUrl}${W355_AND_H200_BESTV2.FULL}${movie.backdrop_path}`} />
        <h2>{text}</h2>
      </button>
      <PosterTitle
        // TODO: hack for UI adjusting
        style={{
          marginTop: '1.5rem'
        }}
        theme={theme}>
        {movie.title}
      </PosterTitle>
    </LazyLoad>
    <style jsx>{`
      .${SCENERY_CONTAINER_CLASS_NAME} {
        position: relative;
        width: 100%;
        border: none;
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .${SCENERY_CONTAINER_CLASS_NAME}:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
      }

      .${SCENERY_CONTAINER_CLASS_NAME} > h2 {
        opacity: ${textAlwaysVisible ? '1' : '0'};
        visibility: ${textAlwaysVisible ? 'visible' : 'hidden'};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 12px 24px;
        min-height: 44px;
        color: var(--palette-primary-contrast-text);
        font-size: 1.4rem;
        font-weight: ${theme.typography.fontWeightBold};
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, var(--palette-primary-main), var(--palette-secondary-main));
        border-radius: 24px;
        box-shadow: 0 4px 20px rgba(var(--palette-primary-main-rgb), 0.4);
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.2);
      }

      .${SCENERY_CONTAINER_CLASS_NAME}:hover > h2 {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, -50%) scale(1.05);
        box-shadow: 0 6px 28px rgba(var(--palette-primary-main-rgb), 0.6);
      }

      .${SCENERY_CONTAINER_CLASS_NAME}:disabled, .${SCENERY_CONTAINER_CLASS_NAME} {
        color: inherit;
        background-color: inherit;
      }

      :global(.${GRAY_FILTERED_CLASS_NAME}:hover) {
        filter: grayscale(100%);
        transition: filter ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut};
      }
    `}</style>
  </li>
);

export default ChooseImageItem;
