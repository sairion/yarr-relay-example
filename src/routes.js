import FilmsQuery from './__generated__/FilmsQuery.graphql';
import FilmQuery from './__generated__/FilmQuery.graphql';
import { RelayEnvironment } from './relay/RelayEnvironment';
import { loadQuery } from 'react-relay/hooks';

export const routes = [
  {
    component: async () => {
      const module = await import('./pages/Films');

      return module.default;
    },
    path: '/films',
    preload: () => ({
      query: loadQuery(RelayEnvironment, FilmsQuery, {}),
    }),
  },
  {
    component: async () => {
      const module = await import('./pages/Film');

      return module.default;
    },
    path: '/films/:id',
    preload: ({ id }) => ({
      query: loadQuery(RelayEnvironment, FilmQuery, { id }),
    }),
  },
  {
    component: async () => {
      const module = await import('./pages/Home');

      return module.default;
    },
    path: '/',
  },
  {
    path: '/',
    redirectRules: () => '/films',
  },
  {
    component: async () => {
      const module = await import('./pages/NotFound');

      return module.default;
    },
    path: '*',
  },
];
