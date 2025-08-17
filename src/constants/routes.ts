export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
};

export const APP_ROUTES = {
  HOME: '/',
  EXPLORE: '/explorar',
  TIENDA: '/tienda',
  LUGARES: '/lugares',
  ARTISTS: '/artistas',
  CONTACT: '/contacto',
};

export const NAVIGATION_ROUTES = {
  ...AUTH_ROUTES,
  ...APP_ROUTES,
};
