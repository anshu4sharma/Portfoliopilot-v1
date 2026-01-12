export function useCanEditPortfolio(userId?: number, routeUserId?: number) {
  if (!isNumber(userId) || !isNumber(routeUserId)) return false;
  return userId === routeUserId;
}

function isNumber(value: any) {
  return typeof value === "number";
}
