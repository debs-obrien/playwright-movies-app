

const MoviesGridContainer = ({
  theme,
  children
}) => (
  <>
    <ul className='grid-container' aria-label="movies">{children}</ul>
    <style jsx>{`
      .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(10rem, 25rem));
        grid-gap: 4rem 2rem;
        justify-content: space-evenly;
        align-content: start;
        align-items: stretch;
        margin: 4rem 0;
      }
    
      @media ${theme.mediaQueries.small} {
        .grid-container {
          grid-template-columns: repeat(auto-fit, minmax(10rem, 23rem));
          justify-content: space-around;
          grid-gap: 4rem 1.5rem;
        }
      }

      @media ${theme.mediaQueries.smaller} {
        .grid-container {
          grid-template-columns: repeat(auto-fit, minmax(10rem, 18rem));
          grid-gap: 4rem 1rem;
        }
      }
    `}</style>
  </>
);

export default MoviesGridContainer;
