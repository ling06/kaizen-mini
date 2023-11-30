import { IAphorism, INavLinks } from '@/types';

export const ADMIN_BTN_TYPES = {
  edit: 'edit',
  add: 'add',
};

export const DEFAULT_WIDTH = '1267px';

export const MODAL_TYPES = {
  createCourse: 'createCourse',
  createCompetition: 'createCompetition',
  createChapter: 'createChapter',
  createTheme: 'createTheme',
  editCourse: 'editCourse',
  editChapter: 'editChapter',
  editTheme: 'editTheme',
  newsCategory: 'newsCategory', 
  selectCourse: 'selectCourse',
};

export const IS_MOBILE: boolean = window.matchMedia('(max-width: 768px)').matches;

export const CREATE_LESSON_TYPES = {
  create: 'create',
  edit: 'edit',
};

export const USER_ROLES = {
  admin: 'admin',
  user: 'user',
};

export const NAV_LINKS: INavLinks = {
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

export const APHORISMS: Array<IAphorism> = [
  {
    text: 'Нет большей жизни, чем бороться за свои мечты.',
    author: 'Хаяо Миядзаки',
  },
  {
    text: 'Если вы ничего не делаете, ничего не происходит.',
    author: 'Икути Кэйта',
  },
  {
    text: 'Самурай должен быть вежливым, даже когда смерть близка.',
    author: 'Ямамото Цунэтомо',
  },
  {
    text: 'Если вы будете работать только над тем, что вам нравится, вы никогда не должны будете работать ни дня в своей жизни.',
    author: 'Идзамо Томио',
  },
  {
    text: 'Но, в конце концов — и я подчеркиваю это — как бы вы ни были хороши или удачливы и как бы вы ни были умны и ловки, ваше дело и его судьба находятся в руках тех людей, которых вы нанимаете.',
    author: 'Акио Морита',
  },
  {
    text: 'Всю свою жизнь при­леж­но учись. Каж­дый день ста­новись бо­лее ис­кусным, чем ты был за день до это­го, а на сле­ду­ющий день — бо­лее ис­кусным, чем се­год­ня. Со­вер­шенс­тво­вание не име­ет кон­ца.',
    author: 'Яма­мото Цу­нэто­мо',
  },
  {
    text: 'Нет ничего более постыдного для человека, чем выходить из себя.',
    author: 'Сиба Есимаса',
  },
  {
    text: 'Искреннее сердце — это драгоценность, которую никогда никуда не спрячешь.',
    author: 'Ходзе Сигэтоки',
  },
  {
    text: 'Учение для человека — все равно что ветви и листья для дерева. Без него он просто не сможет жить.',
    author: 'Такэда Сингэн',
  },
  {
    text: 'Даже если у человека нет особых талантов, но он упорно овладевает знанием, он не опозорится перед другими.',
    author: 'Сиба Есимаса',
  },
  {
    text: 'Во всем надлежит действовать терпеливо.',
    author: 'Набэсима Наосигэ',
  },
  {
    text: 'Там, где льются изящные стихи, не остается места суесловию',
    author: 'Мурасаки Сикибу',
  },
];

export enum MediaQueries {
  mobile = '(max-width: 768px)',
  desktop = '(min-width: 768px)',
}

export enum Steps {
  chapter = 'chapter',
  theme = 'theme',
}
