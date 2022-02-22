//
// const fragment = graphql`
//   fragment CharacterOutline on Person {
//     id
//     name
//   }
//   fragment CharacterDetail on Person {
//     ...CharacterOutline
//     birthYear
//     eyeColor
//     gender
//     hairColor
//     height
//     mass
//     skinColor
//     homeworld {
//       name
//     }
//     species {
//       name
//     }

//     films: filmConnection(first: 5) {
//       edges {
//         node {
//           id
//           title
//         }
//       }
//     }
//     starhips: starshipConnection(first: 5) {
//       edges {
//         node {
//           id
//           name
//         }
//       }
//     }
//     vehicles: vehicleConnection(first: 5) {
//       edges {
//         node {
//           id
//           name
//         }
//       }
//     }
//   }
// `;
import React from 'react';
import { usePaginationFragment } from 'react-relay/hooks';
import { Link } from 'yarr';
import graphql from 'babel-plugin-relay/macro';
import { extractNodes } from '../utils';

export function Character({ fragmentRef }) {
  const { data, loadNext, hasNext } = usePaginationFragment(
    graphql`
      fragment CharacterComponent_characters on Film
      @refetchable(queryName: "CharacterPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String" }
      ) {
        characters: characterConnection(first: $count, after: $cursor)
          @connection(key: "FilmComponent_characters") {
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
      Characters ({data.characters.totalCount}):
      <ul>
        {extractNodes(data.characters)?.map((character) => (
          <li key={character.id}>
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
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
