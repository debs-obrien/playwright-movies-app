import React from 'react';
import Link from 'next/link';

import withTheme from 'utils/hocs/withTheme';

const MenuItemLink = React.forwardRef(({
  theme,
  href,
  as,
  children,
  selected,
  ...rest
}, ref) => (
  <>
    <Link
      href={href}
      as={as}
      ref={ref}
      className={selected ? 'menu-item-selected' : ''}
      {...rest}>

      {children}

    </Link>
    <style jsx>{`
      a {
        outline: none;
        display: block;
        margin-bottom: 0.2rem;
        font-size: 1.25rem;
        font-weight: ${theme.typography.fontWeightBold};
        line-height: 1;
        color: ${selected ? 'var(--palette-text-primary)' : 'var(--palette-text-secondary)'};
        text-decoration: none;
        position: relative;
        overflow: hidden;
      }

      a:hover {
        color: var(--palette-text-primary);
        text-decoration: none;
      }

      a.menu-item-selected {
        background: linear-gradient(135deg,
          rgba(var(--palette-primary-main-rgb), 0.1) 0%,
          rgba(var(--palette-secondary-main-rgb), 0.1) 100%);
        border-radius: 0 24px 24px 0;
        position: relative;
      }

      a.menu-item-selected::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: linear-gradient(135deg, var(--palette-primary-main), var(--palette-secondary-main));
        border-radius: 0 4px 4px 0;
      }
    `}</style>
  </>
));

export default withTheme(MenuItemLink);
