import FilmsQuery from './__generated__/FilmsQuery.graphql';
import FilmQuery from './__generated__/FilmQuery.graphql';
import { RelayEnvironment } from './relay/RelayEnvironment';
import { loadQuery } from 'react-relay/hooks';

export const routes = [
  {
    component: async () => {
      const module = await import('./pages/Films');

      return module.FilmsPage;
    },
    path: '/films',
    preload: () => ({
      query: loadQuery(RelayEnvironment, FilmsQuery, {}),
    }),
  },
  {
    component: async () => {
      const module = await import('./pages/Film');

      return module.FilmDetailPage;
    },
    path: '/films/:id',
    preload: ({ id }) => ({
      query: loadQuery(RelayEnvironment, FilmQuery, { id }),
    }),
  },
  {
    component: async () => {
      const module = await import('./pages/Home');

      return module.HomePage;
    },
    path: '/',
  },
  {
    component: async () => {
      const module = await import('./pages/NotFound');

      return module.NotFoundPage;
    },
    path: '*',
  },
];
