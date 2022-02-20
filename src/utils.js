export function extractNodes(data) {
  return data?.edges?.map((edge) => edge.node);
}
