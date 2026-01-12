'use client';

import { ApolloProvider } from '@apollo/client/react';

import { apolloClient } from '~/lib/apollo';

export function ApolloClientProvider(props: React.PropsWithChildren) {
  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
}
