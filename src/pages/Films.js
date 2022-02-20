import React from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import { Link } from 'yarr';
import graphql from 'babel-plugin-relay/macro';
import { extractNodes } from '../utils';

export function FilmsPage({ preloaded }) {
  const data = usePreloadedQuery(
    graphql`
      query FilmsQuery {
        allFilms {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `,
    preloaded.query
  );
  return (
    <>
      <ul>
        {extractNodes(data.allFilms)?.map((film) => (
          <li key={film.title}>
            <Link to={`/films/${film.id}`}>{film.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
