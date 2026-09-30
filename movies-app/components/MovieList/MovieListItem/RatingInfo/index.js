

import clsx from 'clsx';

import Rating from 'components/Rating';
import Tooltip from 'components/UI/Tooltip';

const RatingInfo = ({
  className,
  voteAverage,
  voteCount,
  tooltip,
  withValue
}) => {
  if (!voteCount) {
    return null;
  }

  return (
    <>
      <div className={clsx('rating-info', className)}>
        <Rating withValue={withValue} voteAverage={voteAverage} />
        <Tooltip className='tooltip-position tooltip-show'>{tooltip}</Tooltip>
      </div>
      <style jsx>{`
        .rating-info {
          display: flex;
          position: relative;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        :global(.tooltip-position) {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translate(-50%, 0);
        }

        .rating-info:hover :global(.tooltip-show) {
          visibility: visible;
        }
      `}</style>
    </>
  );
};

export default RatingInfo;
