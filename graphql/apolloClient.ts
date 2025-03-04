import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://todo-server-oq3u.onrender.com",
  cache: new InMemoryCache(),
});

export default client;
