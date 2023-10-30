import { CustomNavLink, ICustomNavLinkProps } from '../CustomNavLink';
import * as S from './styles';
import * as C from '@styles/components';

interface INavLinks {
  [key: string]: ICustomNavLinkProps;
}

const navLinks: INavLinks = {
  news: {
    url: '/news',
    name: 'Новости',
    icon: {
      withIcon: false,
      iconUrl: '',
    },
  },
  education: {
    url: '/courses',
    name: 'Учёба',
    icon: {
      withIcon: false,
      iconUrl: '',
    },
  },
  // tasks: {
  //   url: '/tasks',
  //   name: 'Задачи',
  //   icon: {
  //     withIcon: false,
  //     iconUrl: '',
  //   },
  // },
};

export function Nav() {
  return (
    <C.DefaultContainer>
      <S.NavBar>
        {Object.values(navLinks).map((navLink, index) => (
          <CustomNavLink
            {...navLink}
            key={index}
          />
        ))}
      </S.NavBar>
    </C.DefaultContainer>
  );
}
