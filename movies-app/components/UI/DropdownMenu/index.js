
import { useState, useRef, useEffect, cloneElement } from 'react';
import clsx from 'clsx';

import withTheme from 'utils/hocs/withTheme';
import ALIGNMENTS from 'utils/constants/alignments';
import useClickAway from 'utils/hooks/useClickAway';

const DropdownMenuItem = props => (
  <li role='none' {...props} />
);

const DropdownMenu = ({
  align = ALIGNMENTS.LEFT,
  theme,
  DropElement,
  children
}) => {
  const [opened, setOpened] = useState(false);
  const dropdownRef = useRef(null);
  useClickAway(dropdownRef, () => {
    setOpened(false);
  });

  useEffect(() => {
    if (!opened) {
      return undefined;
    }

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        setOpened(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [opened]);

  const dropElement = DropElement();
  const trigger = cloneElement(dropElement, {
    'aria-haspopup': 'menu',
    'aria-expanded': opened,
    onClick: event => {
      dropElement.props.onClick?.(event);
      setOpened(current => !current);
    }
  });

  return (
    <>
      <div
        className={clsx('dropdown', { opened })}
        ref={dropdownRef}>
        {trigger}
        <ul
          className='dropdown-content'
          role='menu'
          hidden={!opened}
          onClick={() => setOpened(false)}>
          {children}
        </ul>
      </div>
      <style jsx>{`
        ul {
          list-style-type: none;
        }

        .dropdown {
          position: relative;
          display: inline-block;
        }

        ul.dropdown-content {
          visibility: hidden;
          position: absolute;
          right: ${align === ALIGNMENTS.RIGHT ? 0 : 'unset'};
          min-width: 180px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border: none;
          background: linear-gradient(135deg, var(--palette-background-paper) 0%, var(--palette-background-elevated) 100%);
          border-radius: 12px;
          z-index: ${theme.zIndex.modal};
          margin-top: 8px;
          padding: 8px 0;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out, visibility 0.2s ease-in-out;
        }

        .dropdown.opened ul.dropdown-content {
          visibility: visible;
          opacity: 1;
          transform: translateY(0);
        }

        ul.dropdown-content :global(li) {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          margin: 4px 8px;
          color: var(--palette-text-secondary);
          font-size: 1.4rem;
          font-weight: 500;
          min-height: 44px;
          background-color: transparent;
          border-radius: 8px;
          transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
          cursor: pointer;
        }

        ul.dropdown-content :global(li > *) {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: inherit;
          width: 100%;
          height: 100%;
        }

        ul.dropdown-content :global(li):hover,
        ul.dropdown-content :global(li):focus-within {
          background-color: var(--palette-action-hover);
          color: var(--palette-text-primary);
        }

        ul.dropdown-content :global(li a:focus-visible),
        ul.dropdown-content :global(li button:focus-visible) {
          outline: 2px solid var(--palette-primary-main);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          ul.dropdown-content {
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

export {
  DropdownMenuItem
};

export default withTheme(DropdownMenu);
