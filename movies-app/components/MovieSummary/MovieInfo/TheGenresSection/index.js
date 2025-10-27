
import SummarySectionHeading from 'parts/SummarySectionHeading';
import GenreLink from './GenreLink';

const TheGenresSection = ({
  className,
  genres
}) => (
  <>
    <div className={className} >
      <SummarySectionHeading id="genres">The Genres</SummarySectionHeading>
      <ul className='the-genres' aria-label="genres">
        {genres.map(genre => (
            <GenreLink
              key={genre.id}
              genre={genre}
            />
        ))}
      </ul>
    </div>
    <style jsx>{`
      .the-genres {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1.2rem;
        margin-top: 1rem;
      }
    `}</style>
  </>
);

export default TheGenresSection;
