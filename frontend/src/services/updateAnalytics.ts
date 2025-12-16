import { gqlClient } from "../graphql/client";
import { UPDATE_ANALYTICS } from "../graphql/mutations/UpdateAnalytics";

export const updateAnalytics = async (
  email: string,
  payload: string
) => {
  return gqlClient.request(UPDATE_ANALYTICS, {
    email,
    payload,
  });
};
