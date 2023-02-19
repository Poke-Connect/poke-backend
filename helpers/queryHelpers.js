export const createRideFilterQuery = (queryParams) => {
  const { user = "", date = "", rideType = "" } = queryParams;
  const query = {
    discoverability: true,
    user: { $ne: user },
    rideType: { $eq: rideType },
    date: { $eq: date },
  };
  return query;
};
