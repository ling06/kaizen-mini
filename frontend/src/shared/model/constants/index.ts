import { IAphorism, INavLinks } from '@/shared/model/types';

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

export interface IPermissions {
  [key: string]: string;
}

export const PERMISSIONS: IPermissions = {
  view: 'Видеть',
  view_course: 'Курсы',
  view_news: 'Новости',
  view_knowledge: 'База знаний',
  view_analytics: 'Аналитика',

  create: 'Создавать',
  create_course: 'Курсы',
  create_course_chapter: 'Главы',
  create_course_theme: 'Темы',
  create_course_lesson: 'Уроки',
  create_course_test: 'Тесты',
  create_news: 'Статьи',
  create_news_category: 'Категории',
  create_news_сompetition: 'Конкурсы',
  create_knowledge_article: 'Статьи',
  create_knowledge_theme: 'Темы',
  create_knowledge_chapter: 'Разделы',
  create_knowledge_line: 'Направления',

  sort: 'Перемещать',
  sort_news: 'Статьи',
  sort_news_category: 'Категории',
  sort_news_сompetition: 'Конкурсы',
  sort_course: 'Курсы',
  sort_course_chapter: 'Главы',
  sort_course_theme: 'Темы',
  sort_course_lesson: 'Уроки',
  sort_course_test: 'Тесты',
  sort_knowledge_article: 'Статьи',
  sort_knowledge_theme: 'Темы',
  sort_knowledge_chapter: 'Разделы',
  sort_knowledge_line: 'Направления',

  edit: 'Редактировать',
  edit_news: 'Статьи',
  edit_news_category: 'Категории',
  edit_news_сompetition: 'Конкурсы',
  edit_course: 'Курсы',
  edit_course_chapter: 'Главы',
  edit_course_theme: 'Темы',
  edit_course_lesson: 'Уроки',
  edit_course_test: 'Тесты',
  edit_knowledge_article: 'Статьи',
  edit_knowledge_theme: 'Темы',
  edit_knowledge_chapter: 'Разделы',
  edit_knowledge_line: 'Направления',

  soft_delete: 'Удалять',
  soft_delete_news: 'Статьи',
  soft_delete_news_category: 'Категории',
  soft_delete_news_сompetition: 'Конкурсы',
  soft_delete_course: 'Курсы',
  soft_delete_course_chapter: 'Главы',
  soft_delete_course_theme: 'Темы',
  soft_delete_course_lesson: 'Уроки',
  soft_delete_course_test: 'Тесты',
  soft_delete_knowledge_article: 'Статьи',
  soft_delete_knowledge_theme: 'Темы',
  soft_delete_knowledge_chapter: 'Разделы',
  soft_delete_knowledge_line: 'Направления',

  force_delete: 'Удалять совсем',
  force_delete_news: 'Статьи',
  force_delete_news_category: 'Категории',
  force_delete_news_сompetition: 'Конкурсы',
  force_delete_course: 'Курсы',
  force_delete_course_chapter: 'Главы',
  force_delete_course_theme: 'Темы',
  force_delete_course_lesson: 'Уроки',
  force_delete_course_test: 'Тесты',
  force_delete_knowledge_article: 'Статьи',
  force_delete_knowledge_theme: 'Темы',
  force_delete_knowledge_chapter: 'Разделы',
  force_delete_knowledge_line: 'Направления',

  restore: 'Восстанавливать',
  restore_news: 'Статьи',
  restore_news_category: 'Категории',
  restore_news_сompetition: 'Конкурсы',
  restore_course: 'Курсы',
  restore_course_chapter: 'Главы',
  restore_course_theme: 'Темы',
  restore_course_lesson: 'Уроки',
  restore_course_test: 'Тесты',
  restore_knowledge_article: 'Статьи',
  restore_knowledge_theme: 'Темы',
  restore_knowledge_chapter: 'Разделы',
  restore_knowledge_line: 'Направления',
};
