
import clsx from 'clsx';

import LanguagesRuntimeRelease from './LanguagesRuntimeRelease';
import RatingInfo from 'components/MovieList/MovieListItem/RatingInfo';

const BasicsSection = ({
  className,
  voteAverage,
  voteCount,
  spokenLanguages,
  runtime,
  releaseDate
}) => (
  <>
    <div className={clsx('basics-section', className)}>
      <RatingInfo
        voteAverage={voteAverage}
        voteCount={voteCount}
        withValue
        tooltip={`${voteAverage} average rating on ${voteCount} votes`}
      />
      <LanguagesRuntimeRelease
        spokenLanguages={spokenLanguages}
        runtime={runtime}
        releaseDate={releaseDate} />
    </div>
    <style jsx>{`
      .basics-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `}</style>
  </>
);

export default BasicsSection;
