
import SearchIcon from 'public/assets/svgs/icons/search.svg';

const MagnifierButton = ({
  opened,
  theme
}) => (
  <>
    <button
      type='submit'
      className='magnifier-button'
      aria-label='Search for a movie'
      tabIndex={opened ? 0 : -1}>
      <SearchIcon
        fill='currentColor'
        width='1.25em'
        height='1.25em' />
    </button>
    <style jsx>{`
      .magnifier-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2.4rem;
        min-height: 2.4rem;
        line-height: 0;
        pointer-events: ${opened ? 'auto' : 'none'};
        cursor: ${opened ? 'pointer' : 'default'};
        background-color: transparent;
        border: none;
        outline: none;
        color: var(--palette-secondary-contrast-text);
        font-size: 1.25rem;
        border-radius: 50%;
        padding: 0;
      }

      .magnifier-button:focus-visible {
        outline: 2px solid var(--palette-secondary-contrast-text);
        outline-offset: 2px;
      }

      @media ${theme.mediaQueries.large} {
        .magnifier-button {
          font-size: 1.25rem;
        }
      }
    `}</style>
  </>
);

export default MagnifierButton;
