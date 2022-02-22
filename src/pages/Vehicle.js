import React from 'react';
import { usePaginationFragment } from 'react-relay/hooks';
import { Link } from 'yarr';
import graphql from 'babel-plugin-relay/macro';
import { extractNodes } from '../utils';

export function Vehicle({ fragmentRef }) {
  const { data, loadNext, hasNext } = usePaginationFragment(
    graphql`
      fragment VehicleComponent_vehicles on Film
      @refetchable(queryName: "VehiclePaginationQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String" }
      ) {
        vehicles: vehicleConnection(first: $count, after: $cursor)
          @connection(key: "FilmComponent_vehicles") {
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
      Vehicle ({data.vehicles.totalCount}):
      <ul>
        {extractNodes(data.vehicles)?.map((vehicle) => (
          <li key={vehicle.id}>
            <Link to={`/species/${vehicle.id}`}>{vehicle.name}</Link>
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
