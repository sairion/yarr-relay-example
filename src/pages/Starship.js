import React from 'react';
import { usePaginationFragment } from 'react-relay/hooks';
import { Link } from 'yarr';
import graphql from 'babel-plugin-relay/macro';
import { extractNodes } from '../utils';

export function Starship({ fragmentRef }) {
  const { data, loadNext, hasNext } = usePaginationFragment(
    graphql`
      fragment StarshipComponent_starships on Film
      @refetchable(queryName: "StarshipPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String" }
      ) {
        starships: starshipConnection(first: $count, after: $cursor)
          @connection(key: "FilmComponent_starships") {
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
      Starships ({data.starships.totalCount}):
      <ul>
        {extractNodes(data.starships)?.map((starship) => (
          <li key={starship.id}>
            <Link to={`/starships/${starship.id}`}>{starship.name}</Link>
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
