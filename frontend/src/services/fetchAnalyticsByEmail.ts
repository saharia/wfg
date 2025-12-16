import { gqlClient } from "../graphql/client";
import { FETCH_ANALYTICS_BY_EMAIL } from "../graphql/query/fetchAnalyticsByEmail";

export const fetchAnalyticsByEmail = async (
  email: string,
) => {
  return gqlClient.request(FETCH_ANALYTICS_BY_EMAIL, {
    email,
  });
};
