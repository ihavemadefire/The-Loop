import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://44.198.144.202:8000/___graphql",
  cache: new InMemoryCache(),
});

export default client;
