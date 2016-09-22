export const RouteConstants = {
  CREATE_ROUTE: "CREATE_ROUTE",
  RECEIVE_SINGLE_ROUTE: "RECEIVE_SINGLE_ROUTE",
};

export const createRoute = route => ({
  type: RouteConstants.CREATE_ROUTE,
  route
});


export const receiveSingleRoute = route => ({
  type: RouteConstants.RECEIVE_SINGLE_ROUTE,
  route
});
