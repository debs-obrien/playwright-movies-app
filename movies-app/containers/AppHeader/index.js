
import { useState, useCallback } from 'react';

import BurgerHeader from './BurgerHeader';
import BurgerMenu from './BurgerMenu';

const AppHeader = ({ className }) => {
  const [opened, setOpened] = useState(false);

  const toggleMenuHandler = useCallback(() => {
    setOpened(current => !current);
  }, []);

  const closeMenuHandler = useCallback(() => {
    setOpened(false);
  }, []);

  return (
    <div className={className}>
      <BurgerHeader
        opened={opened}
        openMenu={toggleMenuHandler} />
      <BurgerMenu
        opened={opened}
        closeMenu={closeMenuHandler} />
    </div>
  );
};

export default AppHeader;
