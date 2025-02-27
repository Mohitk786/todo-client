"use client"
import { ApolloClient, InMemoryCache, ApolloProvider, NormalizedCacheObject } from '@apollo/client';

const client = new ApolloClient<NormalizedCacheObject>({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
});

const ApolloProviderLayout = ({ children }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <ApolloProvider client={client}>
        {children}
        </ApolloProvider>
    );
}

export default ApolloProviderLayout;