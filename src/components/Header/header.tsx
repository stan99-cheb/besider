import { memo, useCallback, useMemo, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import * as icon from '../Icons';
import List from '../List/list';
import menuData from '../../data/menu-data.json';
import PathConstants from '../../routes/path-constants';
import styles from './header.module.css';
import useClickOutside from '../../hooks/use-click-outside';
import useSwitcher from '../../hooks/use-switcher';

const Header = () => {
  const ref = useRef<HTMLElement>(null);
  const [menu, toggleMenu] = useSwitcher();

  const Icon = useMemo(
    () => menu ? icon.CloseIcon : icon.BurgerIcon,
    [menu]
  );

  useClickOutside(ref, () => {
    if (menu) toggleMenu();
  });

  const renderMenuItem = useCallback(
    (item: MenuItem) => (
      <li
        key={item.id}
      >
        <NavLink
          to={PathConstants[item.name as keyof typeof PathConstants]}
          className={({ isActive }) =>
            [styles.link, isActive ? styles.active : ''].filter(Boolean).join(' ')
          }
          onClick={toggleMenu}
        >
          {item.name}
        </NavLink>
      </li>
    ), [toggleMenu]
  );

  return (
    <header
      className={styles.header}
      ref={ref}
    >
      <button
        className={`${styles.button} ${styles.buttonMenu}`}
        type='button'
        onClick={toggleMenu}
        title='Открыть меню'
        aria-expanded={menu}
        aria-controls="main-navigation"
      >
        <Icon />
      </button>
      <h1
        className={styles.title}
      >
        BESIDER
      </h1>
      <nav
        id="main-navigation"
        className={menu ? `${styles.nav} ${styles.navActive}` : styles.nav}
        aria-label="Основное меню"
      >
        <List
          list={menuData}
          callback={renderMenuItem}
          extraStyle={`${styles.list} ${styles[`list-portrait`]}`}
        />
      </nav>
    </header>
  );
}

export default memo(Header);