export const ROUTES = {
    HOME: '/',
    MINING_SERVICES: '/miningServices',
    REGISTRATION: '/registration',
    LK: '/user',
    AUTHORISATION: '/login',
    MINING_ORDER: '/mining_order'
}

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: 'Главная',
    MINING_SERVICES: 'Услуги по разработке месторождений',
    REGISTRATION: 'Регистрация',
    LK: 'Личный кабинет',
    AUTHORISATION: 'Авторизация',
    MINING_ORDER: 'Заявка'
  };