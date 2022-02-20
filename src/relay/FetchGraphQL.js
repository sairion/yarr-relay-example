async function fetchGraphQL(text, variables) {
  const response = await fetch(
    'https://swapi-graphql.netlify.app/.netlify/functions/index',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: text,
        variables,
      }),
    }
  );

  // Get the response as JSON
  return await response.json();
}

export default fetchGraphQL;
