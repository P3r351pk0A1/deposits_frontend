export const ROUTES = {
    HOME: '/',
    MINING_SERVICES: '/miningServices'
}

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: 'Главная',
    MINING_SERVICES: 'Услуги по разработке месторождений',
  };