import React from 'react';
import Link from 'next/link';

import withTheme from 'utils/hocs/withTheme';

const PosterLink = React.forwardRef(({
  theme,
  href,
  as,
  children,
  ...rest
}, ref) => (
  <>
    <Link
      legacyBehavior
      passHref
      as={as}
      href={href}>
      <a
        ref={ref}
        {...rest}>
        {children}
      </a>
    </Link>
    <style jsx>{`
      a {
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: ${theme.shape.borderRadiusLarge}px;
        overflow: hidden;
        box-shadow: ${theme.shadows[2]};
        transition: all ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeOut};
        background-color: var(--palette-background-paper);
      }

      a:hover {
        transform: translateY(-8px);
        box-shadow: ${theme.shadows[6]};
      }

      a::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
        opacity: 0;
        transition: opacity ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeOut};
        z-index: 1;
        pointer-events: none;
      }

      a:hover::before {
        opacity: 1;
      }
    `}</style>
  </>
));

export default withTheme(PosterLink);
