import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const VideoModal = ({
  onClose,
  open,
  videoId
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const escapeHandler = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', escapeHandler);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', escapeHandler);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, open]);

  if (!mounted || !open || !videoId) {
    return null;
  }

  return createPortal(
    <div className='modal-video' role='dialog' aria-modal='true' onClick={onClose}>
      <div className='modal-video-body' onClick={event => event.stopPropagation()}>
        <div className='modal-video-inner'>
          <button
            type='button'
            className='modal-video-close-btn'
            aria-label='Close video'
            onClick={onClose} />
          <div className='modal-video-movie-wrap'>
            <iframe
              title='Trailer'
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VideoModal;
