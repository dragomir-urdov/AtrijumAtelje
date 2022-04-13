export const appTitle = 'Atrijum Atelje';

export const MIN_PASSWORD_LENGTH = 8;

export const PRODUCT_ORDER_BY = [
  {
    orderBy: 'minPrice',
    order: 'ASC',
    title: 'Price, lowe to high',
  },
  {
    orderBy: 'minPrice',
    order: 'DESC',
    title: 'Price, high to lower',
  },
  {
    orderBy: 'title',
    order: 'ASC',
    title: 'Alphabetically, A-Z',
  },
  {
    orderBy: 'title',
    order: 'DESC',
    title: 'Alphabetically, Z-A',
  },
];

export const languages = [
  {
    short: 'sr',
    long: 'serbian',
    icon: '/assets/icons/flags/sr.svg',
  },
  {
    short: 'en',
    long: 'english',
    icon: '/assets/icons/flags/en.svg',
  },
];

export const route = {
  home: {
    path: '',
  },
  about: {
    path: 'about',
  },
  error: {
    path: 'error',
  },
  notFound: {
    path: 'page-not-found',
  },
  collections: {
    path: 'collections',
  },
};
