import * as S from './styles';
import { MainLogo } from './MainLogo';
import { Nav } from './Nav';
import { ProfileBlock } from './ProfileBlock';
import { BurgerBtn } from './BurgerBtn';
import { useState } from 'react';
import { BurgerMenu } from './BurgerMenu';

export function Header() {
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState<boolean>(false);

  const handleToggleBurgerMenu = () => {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  }

  return (
    <S.Header>
        <MainLogo />
        <BurgerBtn isOpen={false} onClick={handleToggleBurgerMenu}/>
        <Nav />
        <ProfileBlock />
        {isBurgerMenuOpen && (
          <BurgerMenu onClose={handleToggleBurgerMenu}/>
        )}
    </S.Header>
  );
}
