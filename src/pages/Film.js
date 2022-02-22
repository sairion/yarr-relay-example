import React from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';
import { Species } from './Species';
import { Planet } from './Planet';
import { Character } from './Character';
import { Starship } from './Starship';
import { Vehicle } from './Vehicle';

function Page({ preloaded }) {
  const data = usePreloadedQuery(
    graphql`
      query FilmQuery($id: ID!) {
        film(id: $id) {
          id
          title
          ...SpeciesComponent_species @arguments(count: 5)
          ...PlanetComponent_planets @arguments(count: 5)
          ...CharacterComponent_characters @arguments(count: 5)
          ...StarshipComponent_starships @arguments(count: 5)
          ...VehicleComponent_vehicles @arguments(count: 5)
        }
      }
    `,
    preloaded.query
  );

  return (
    <>
      <h3>Data from '{data.film.title}'</h3>
      <Species fragmentRef={data.film} />
      <Planet fragmentRef={data.film} />
      <Character fragmentRef={data.film} />
      <Starship fragmentRef={data.film} />
      <Vehicle fragmentRef={data.film} />
    </>
  );
}

// <div>
//   Vehicles:
//   <ul>
//     {extractNodes(data.vehicles)?.map((vehicle) => (
//       <li key={vehicle.id}>
//         <Link to={`/vehicles/${vehicle.id}`}>{vehicle.name}</Link>
//       </li>
//     )) ?? null}
//   </ul>
// </div>

// <div>
//   Characters:
//   <ul>
//     {extractNodes(data.characters)?.map((character) => (
//       <li key={character.id}>
//         <Link to={`/characters/${character.id}`}>{character.name}</Link>
//       </li>
//     )) ?? null}
//   </ul>
// </div>

export default Page;
