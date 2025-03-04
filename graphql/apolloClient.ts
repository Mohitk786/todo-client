import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "https://todo-server-oq3u.onrender.com",
  cache: new InMemoryCache(),
});

export default client;
