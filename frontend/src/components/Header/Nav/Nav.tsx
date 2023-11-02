import { CustomNavLink, ICustomNavLinkProps } from '../CustomNavLink';
import * as S from './styles';

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
    name: 'Курсы',
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
    <S.Container>
      <S.NavBar>
        {Object.values(navLinks).map((navLink, index) => (
          <CustomNavLink
            {...navLink}
            key={index}
          />
        ))}
      </S.NavBar>
    </S.Container>
  );
}
