import React from 'react';
import { usePaginationFragment } from 'react-relay/hooks';
import { Link } from 'yarr';
import graphql from 'babel-plugin-relay/macro';
import { extractNodes } from '../utils';

export function Planet({ fragmentRef }) {
  const { data, loadNext, hasNext } = usePaginationFragment(
    graphql`
      fragment PlanetComponent_planets on Film
      @refetchable(queryName: "PlanetPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String" }
      ) {
        planets: planetConnection(first: $count, after: $cursor)
          @connection(key: "FilmComponent_planets") {
          totalCount
          edges {
            cursor
            node {
              id
              name
            }
          }
        }
      }
    `,
    fragmentRef
  );

  return (
    <div>
      Planets ({data.planets.totalCount}):
      <ul>
        {extractNodes(data.planets)?.map((planet) => (
          <li key={planet.id}>
            <Link to={`/planets/${planet.id}`}>{planet.name}</Link>
          </li>
        )) ?? null}
      </ul>
      {hasNext ? (
        <button
          onClick={() => {
            loadNext();
          }}
        >
          load more
        </button>
      ) : null}
    </div>
  );
}

function Page({ preloaded }) {
  return (
    <>
      <h4>Characters {'>'}</h4>
      <h3>'{null}'</h3>
    </>
  );
}

export default Page;
