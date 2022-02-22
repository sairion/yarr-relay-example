import React from 'react';
import { usePaginationFragment } from 'react-relay/hooks';
import { Link } from 'yarr';
import graphql from 'babel-plugin-relay/macro';
import { extractNodes } from '../utils';

export function Species({ fragmentRef }) {
  const { data, loadNext, hasNext } = usePaginationFragment(
    graphql`
      fragment SpeciesComponent_species on Film
      @refetchable(queryName: "SpeciesPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String" }
      ) {
        species: speciesConnection(first: $count, after: $cursor)
          @connection(key: "FilmComponent_species") {
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
      Species ({data.species.totalCount}):
      <ul>
        {extractNodes(data.species)?.map((species) => (
          <li key={species.id}>
            <Link to={`/species/${species.id}`}>{species.name}</Link>
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
