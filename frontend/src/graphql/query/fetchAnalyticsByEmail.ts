import { gql } from "graphql-request";

export const FETCH_ANALYTICS_BY_EMAIL = gql`
  query FetchAnalyticsByEmail(
    $email: String!
  ) {
    analyticsCollection(
      filter: { email: { eq: $email } }
      first: 1
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
