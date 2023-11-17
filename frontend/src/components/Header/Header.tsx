import * as S from './styles';
import { MainLogo } from './MainLogo';
import { Nav } from './Nav';
import { ProfileBlock } from './ProfileBlock';
import { BurgerBtn } from './BurgerBtn';
import { useEffect, useState } from 'react';
import { BurgerMenu } from './BurgerMenu';
import { useMediaQuery } from '@mui/material';
import { MediaQueries } from '@/constants';
import { Link } from 'react-router-dom';

export function Header() {
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery(MediaQueries.mobile);

  useEffect(() => {
    if (isBurgerMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isBurgerMenuOpen, isMobile]);

  const handleToggleBurgerMenu = () => {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <S.Header>
      {isMobile && (
        <BurgerBtn
          isOpen={false}
          onClick={handleToggleBurgerMenu}
        />
      )}
      {!isMobile && (
        <>
          <Link to="/news">
            <MainLogo />
          </Link>
          <Nav />
        </>
      )}
      <ProfileBlock />
      {isBurgerMenuOpen && <BurgerMenu onClose={handleToggleBurgerMenu} />}
    </S.Header>
  );
}
