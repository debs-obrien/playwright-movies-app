
import clsx from 'clsx';

const PageWrapper = ({
  className,
  children,
  ...rest
}) => (
  <>
    <main
      id='main-content'
      tabIndex={-1}
      className={clsx('page-wrapper', className)}
      {...rest}>
      {children}
    </main>
    <style jsx>{`
      .page-wrapper {
        width: 100%;
      }
    `}</style>
  </>
);

export default PageWrapper;
