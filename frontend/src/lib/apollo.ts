import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "@apollo/client/link/http";

const link = new HttpLink({
  uri: import.meta.env.VITE_SUPABASE_GRAPHQL_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
  },
});


export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});