import { gql } from "graphql-request";

export const INSERT_ANALYTICS = gql`
  mutation InsertAnalytics(
    $email: String!
    $payload: jsonb!
  ) {
    insertIntoanalyticsCollection(
      objects: [{
        email: $email
        payload: $payload
      }]
    ) {
      records {
        id
        createdAt
      }
    }
  }
`;
