import { GraphQLClient } from "graphql-request";

export const gqlClient = new GraphQLClient(
  import.meta.env.VITE_SUPABASE_GRAPHQL_URL,
  {
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
  }
);
