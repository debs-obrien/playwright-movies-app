

import withTheme from 'utils/hocs/withTheme';
import ALIGNMENTS from 'utils/constants/alignments';

const DropdownMenuItem = props => (
  <li {...props} />
);

const DropdownMenu = ({
  align = ALIGNMENTS.LEFT,
  theme,
  DropElement,
  children
}) => (
  <>
    <div className='dropdown'>
      <DropElement />
      <ul className='dropdown-content'>
        {children}
      </ul>
    </div>
    {/* MEMO: removed border-radius for better and more consistent look and feel */}
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
        transition: all 0.2s ease-in-out;
      }
      
      ul.dropdown-content :global(li) {
        display: flex;
        align-items: center;
        padding: 12px 20px;
        margin: 4px 8px;
        color: var(--palette-text-secondary);
        font-size: 1.4rem;
        font-weight: 500;
        min-height: 40px;
        background-color: transparent;
        border-radius: 8px;
        transition: all 0.2s ease-in-out;
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
      
      ul.dropdown-content :global(li):hover {
        background-color: var(--palette-action-hover);
        color: var(--palette-text-primary);
        transform: translateX(4px);
      }

      ul.dropdown-content :global(li):active {
        transform: translateX(2px);
      }

      /* ul.dropdown-content :global(li):first-child {
        border-radius: ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0;
      }
      ul.dropdown-content :global(li):last-child {
        border-radius: 0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px;
      } */
      
      .dropdown:hover ul.dropdown-content {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
    `}</style>
  </>
);

export {
  DropdownMenuItem
};

export default withTheme(DropdownMenu);
