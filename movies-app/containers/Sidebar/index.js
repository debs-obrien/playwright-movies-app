
import SidebarInnerWrapper from './SidebarInnerWrapper';
import LazyMenu from 'parts/LazyMenu';
import StickyBox from 'utils/hocs/StickyBox';

const Sidebar = ({ className }) => (
  <div className="sidebar-container">
    <StickyBox className={className}>
      <SidebarInnerWrapper>
        <div className="menu-container">
          <LazyMenu />
        </div>
      </SidebarInnerWrapper>
    </StickyBox>
    <style jsx>{`
      .sidebar-container {
        position: relative;
        z-index: 0;
      }
      .menu-container {
        padding-top: 2rem;
      }
    `}</style>
  </div>
);

export default Sidebar;
