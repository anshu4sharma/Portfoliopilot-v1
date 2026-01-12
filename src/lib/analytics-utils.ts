export function getPortfolioPaths(host: string | null, routeName: string) {
  const isSubdomain =
    host?.includes(process.env.NEXT_PUBLIC_ROOT_DOMAIN!) &&
    host !== process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  const paths = [];

  // Add subdomain path if applicable
  if (isSubdomain) {
    paths.push(host!.split(".")[0]);
  }

  // Always add regular path
  paths.push(`/${routeName}`);

  return paths;
}
