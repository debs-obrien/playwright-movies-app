
import { Element } from 'react-scroll';

import Header from 'parts/Header';
import NotFound from 'parts/NotFound';
import PaddingWrapper from 'parts/PaddingWrapper';
import MovieList from 'components/MovieList';
import Loader from 'components/UI/Loader';
import { SCROLL_TO_ELEMENT } from 'utils/constants';

const RecommendedMovieList = ({
  recommendedMovies,
  baseUrl
}) => (
  <section data-testId="recommended-movies">
    <PaddingWrapper>
      <Element name={SCROLL_TO_ELEMENT}>
        <Header
          subtitle='Recommended Movies'
          size='large'
        />
      </Element>
      {recommendedMovies.loading ? (
        <Loader centerRow />
      ) : (
        recommendedMovies.total_results === 0 ? (
          <NotFound
            title='Sorry!'
            subtitle='There are no recommended movies...' />
        ) : (
          <MovieList
            movies={recommendedMovies}
            baseUrl={baseUrl} />
        )
      )}
        
      </PaddingWrapper>
    </section>
);

export default RecommendedMovieList;
