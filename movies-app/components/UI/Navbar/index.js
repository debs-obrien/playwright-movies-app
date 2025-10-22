

import clsx from 'clsx';

import withTheme from 'utils/hocs/withTheme';

const SELECTED_CLASS_NAME = 'selected';
const DISABLED_CLASS_NAME = 'disabled';
const INVISIBLE_CLASS_NAME = 'invisible';

const NavbarItem = withTheme(({
  theme,
  className,
  disabled,
  selected,
  invisible,
  ...rest
}) => (
  <>
    <li
      className={
        clsx(
          {[SELECTED_CLASS_NAME]: selected},
          {[DISABLED_CLASS_NAME]: disabled},
          {[INVISIBLE_CLASS_NAME]: invisible},
          className
        )
      }
      {...rest} />
    <style jsx>{`
      li {
        flex: 1;
        color: var(--palette-text-secondary);
        display: grid;
        place-items: center;
        position: relative;
      }

      li > :global(a) {
        font-size: 1.4rem;
        font-weight: 500;
        color: var(--palette-text-secondary);
        padding: 12px 16px;
        text-align: center;
        text-decoration: none;
        border-radius: 6px;
        transition: all 0.2s ease-in-out;
        position: relative;
        width: 100%;
        display: block;
      }

      li > :global(a):hover {
        color: var(--palette-text-primary);
        background-color: var(--palette-action-hover);
        transform: translateY(-1px);
      }

      li:first-child.${SELECTED_CLASS_NAME} :global(a) {
        color: var(--palette-primary-contrast-text);
        background: linear-gradient(135deg, var(--palette-primary-main), var(--palette-secondary-main));
        box-shadow: 0 2px 8px rgba(var(--palette-primary-main-rgb), 0.3);
        border-radius: 6px 6px 6px 6px;
      }

      li:last-child.${SELECTED_CLASS_NAME} :global(a) {
        color: var(--palette-primary-contrast-text);
        background: linear-gradient(135deg, var(--palette-primary-main), var(--palette-secondary-main));
        box-shadow: 0 2px 8px rgba(var(--palette-primary-main-rgb), 0.3);
        border-radius: 6px 6px 6px 6px;
      }

      li.${SELECTED_CLASS_NAME} :global(a) {
        color: var(--palette-primary-contrast-text);
        background: linear-gradient(135deg, var(--palette-primary-main), var(--palette-secondary-main));
        box-shadow: 0 2px 8px rgba(var(--palette-primary-main-rgb), 0.3);
      }

      li.${SELECTED_CLASS_NAME} :global(a):hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(var(--palette-primary-main-rgb), 0.4);
      }

      li.${DISABLED_CLASS_NAME} :global(a) {
        color: var(--palette-text-disabled);
        pointer-events: none;
        opacity: 0.6;
      }

      li.${INVISIBLE_CLASS_NAME} {
        display: none;
      }
    `}</style>
  </>
));

const Navbar = ({
  theme,
  ...rest
}) => (
  <nav aria-labelledby="list-options">
    <ul {...rest} />
    <style jsx>{`
      ul {
        list-style-type: none;
        margin: 24px 0;
        padding: 8px;
        display: flex;
        min-height: 56px;
        justify-content: center;
        overflow: hidden;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--palette-background-paper) 0%, var(--palette-background-elevated) 100%);
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        border: none;
        transition: all var(--duration) var(--timing);
      }

      ul:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
        transform: translateY(-1px);
      }

      @media ${theme.mediaQueries.small} {
        ul {
          flex-direction: column;
          min-height: auto;
        }
      }
    `}</style>
  </nav>
);

export {
  NavbarItem
};

export default withTheme(Navbar);
