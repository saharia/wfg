import { gqlClient } from "../graphql/client";
import { INSERT_ANALYTICS } from "../graphql/mutations/InsertAnalytics";

export const saveAnalytics = async (
  email: string,
  payload: string
) => {
  return gqlClient.request(INSERT_ANALYTICS, {
    email,
    payload,
  });
};
