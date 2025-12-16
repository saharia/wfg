import { gql } from "graphql-request";

export const UPDATE_ANALYTICS = gql`
  mutation UpdateAnalytics(
    $email: String!
    $payload: jsonb!
  ) {
    updateanalyticsCollection(
      filter: { email: { eq: $email } }
      set: { payload: $payload }
      atMost: 1
    ) {
      records {
        id
        createdAt
      }
    }
  }
`;
