import { gql } from "graphql-request";

export const FETCH_ANALYTICS_BY_EMAIL = gql`
  query FetchAnalyticsByEmail(
    $email: String!
  ) {
    analyticsCollection(
      filter: { email: { eq: $email } }
    ) {
      edges {
        node {
          id
          createdAt
          payload
        }
      }
    }
  }
`;
