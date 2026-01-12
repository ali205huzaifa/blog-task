import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const supabaseGraphqlUrl = process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL!;

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: supabaseGraphqlUrl,
    headers: {
      apikey: supabaseAnonKey,
      'Content-Type': 'application/json',
    },
  }),
  cache: new InMemoryCache(),
});
