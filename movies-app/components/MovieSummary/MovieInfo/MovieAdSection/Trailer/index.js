
import { useState } from 'react';

import VideoModal from 'components/UI/VideoModal';

import Button from 'components/UI/Button';
import PlayIcon from 'public/assets/svgs/icons/play.svg';

const Trailer = ({ videos }) => {
  const [modalVideoOpened, setModalVideoOpened] = useState(false);

  const openModalVideoHandler = () => {
    setModalVideoOpened(true);
  };

  const closeModalVideoHandler = () => {
    setModalVideoOpened(false);
  };

  if (videos.length === 0) {
    return null;
  }

  const { key: videoId } = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube') || {};

  if (!videoId) {
    return null;
  }

  return (
    <>
      <Button
        endIcon={
          <PlayIcon
            fill='currentColor'
            width='0.875em' />
        }
        title='Trailer'
        onClick={openModalVideoHandler} />
      <VideoModal
        open={modalVideoOpened}
        videoId={videoId}
        onClose={closeModalVideoHandler} />
      <style jsx>{`
        @keyframes :global(modal-video-fade-in) {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(8px);
          }
        }
        
        @keyframes :global(modal-video-inner) {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        :global(.modal-video) {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          z-index: 1000000;
          cursor: pointer;
          opacity: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: modal-video-fade-in 0.3s ease-out;
          transition: opacity 0.3s ease-out, backdrop-filter 0.3s ease-out;
        }
        
        :global(.modal-video-effect-exit) {
          opacity: 0;
          backdrop-filter: blur(0px);
        }
        
        :global(.modal-video-effect-exit .modal-video-movie-wrap) {
          transform: translateY(30px) scale(0.95);
          opacity: 0;
        }
        
        :global(.modal-video-body) {
          max-width: 800px;
          width: 90%;
          height: auto;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        :global(.modal-video-inner) {
          position: relative;
          width: 100%;
          height: auto;
          background: #000;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), 
                      0 0 0 1px rgba(255, 255, 255, 0.05);
        }
        
        :global(.modal-video-movie-wrap) {
          width: 100%;
          height: 0;
          position: relative;
          padding-bottom: 56.25%;
          background-color: #000;
          border-radius: 10px;
          overflow: hidden;
          animation: modal-video-inner 0.4s ease-out;
          transform: translateY(0) scale(1);
          transition: transform 0.3s ease-out;
        }
        
        :global(.modal-video-movie-wrap iframe) {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        :global(.modal-video-close-btn) {
          position: absolute;
          z-index: 100;
          top: 8px;
          right: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: none;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(4px);
        }
        
        :global(.modal-video-close-btn:before) {
          transform: translate(-50%, -50%) rotate(45deg);
        }
        
        :global(.modal-video-close-btn:after) {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
        
        :global(.modal-video-close-btn:hover) {
          background: rgba(255, 255, 255, 0.9);
        }
        
        :global(.modal-video-close-btn:hover:after,
        .modal-video-close-btn:hover:before) {
          background: #000;
        }
        
        :global(.modal-video-close-btn:after,.modal-video-close-btn:before) {
          content: "";
          position: absolute;
          height: 2px;
          width: 16px;
          top: 50%;
          left: 50%;
          background: #fff;
          border-radius: 1px;
          transform-origin: center;
        }
      `}</style>
    </>
  );
};

export default Trailer;
