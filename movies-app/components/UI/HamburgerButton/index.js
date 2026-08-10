
import withTheme from 'utils/hocs/withTheme';

const Bar = withTheme(({ theme }) => (
  <>
    <span className='bar' />
    <style jsx>{`
      .bar {
        width: 100%;
        height: 3px;
        margin: 2.5px 0;
        border-radius: ${theme.shape.borderRadius}px;
        background-color: var(--palette-secondary-main);
      }
    `}</style>
  </>
));

const HamburgerButton = ({
  opened = false,
  ...rest
}) => (
  <>
    <button
      type='button'
      className='hamburger-button'
      aria-label={opened ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={opened}
      aria-controls='mobile-navigation-drawer'
      {...rest}>
      <Bar />
      <Bar />
      <Bar />
    </button>
    <style jsx>{`
      .hamburger-button {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        min-width: 44px;
        min-height: 44px;
        padding: 10px;
        margin: 0;
        border: none;
        background: transparent;
        line-height: 1;
        cursor: pointer;
        border-radius: 8px;
        -webkit-tap-highlight-color: transparent;
      }

      .hamburger-button:focus {
        outline: none;
      }

      .hamburger-button:focus-visible {
        outline: 2px solid var(--palette-primary-main);
        outline-offset: 2px;
      }
    `}</style>
  </>
);

export default HamburgerButton;
