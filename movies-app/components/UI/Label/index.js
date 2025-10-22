

import clsx from 'clsx';

const CLASS_NAME = 'label';

const Label = ({
  className,
  ...rest
}) => (
  <>
    <label
      className={clsx(CLASS_NAME, className)}
      {...rest} />
    <style jsx>{`
      .${CLASS_NAME} {
        font-size: 1.5rem;
        font-weight: 500;
        color: var(--palette-text-primary);
        margin-bottom: 8px;
      }
    `}</style>
  </>
);

export default Label;
