import React from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import { Link } from 'yarr';
import graphql from 'babel-plugin-relay/macro';
import { extractNodes } from '../utils';
import { useFragment } from 'react-relay';

const fragment = graphql`
  fragment FilmDetail on Film {
    id
    title
    species: speciesConnection(first: 5) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          name
        }
      }
    }
    starships: starshipConnection(first: 5) {
      edges {
        cursor
        node {
          id
          name
        }
      }
    }
    vehicles: vehicleConnection(first: 5) {
      edges {
        cursor
        node {
          id
          name
        }
      }
    }
    characters: characterConnection(first: 5) {
      edges {
        cursor
        node {
          id
          name
        }
      }
    }
    planets: planetConnection(first: 5) {
      edges {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

export function FilmDetailPage({ preloaded }) {
  const query = usePreloadedQuery(
    graphql`
      query FilmQuery($id: ID!) {
        film(id: $id) {
          ...FilmDetail
        }
      }
    `,
    preloaded.query
  );
  const data = useFragment(fragment, query.film);

  return (
    <>
      <h3>'{data.title}' wiki</h3>
      <div>
        Species:
        <ul>
          {extractNodes(data.species)?.map((species) => (
            <li key={species.id}>
              <Link to={`/species/${species.id}`}>{species.name}</Link>
            </li>
          )) ?? null}
        </ul>
      </div>

      <div>
        Starships:
        <ul>
          {extractNodes(data.starships)?.map((starship) => (
            <li key={starship.id}>
              <Link to={`/starships/${starship.id}`}>{starship.name}</Link>
            </li>
          )) ?? null}
        </ul>
      </div>

      <div>
        Vehicles:
        <ul>
          {extractNodes(data.vehicles)?.map((vehicle) => (
            <li key={vehicle.id}>
              <Link to={`/vehicles/${vehicle.id}`}>{vehicle.name}</Link>
            </li>
          )) ?? null}
        </ul>
      </div>

      <div>
        Characters:
        <ul>
          {extractNodes(data.characters)?.map((character) => (
            <li key={character.id}>
              <Link to={`/characters/${character.id}`}>{character.name}</Link>
            </li>
          )) ?? null}
        </ul>
      </div>

      <div>
        Planets:
        <ul>
          {extractNodes(data.planets)?.map((planet) => (
            <li key={planet.id}>
              <Link to={`/planets/${planet.id}`}>{planet.name}</Link>
            </li>
          )) ?? null}
        </ul>
      </div>
    </>
  );
}
