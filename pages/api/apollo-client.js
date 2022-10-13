import { ApolloClient, InMemoryCache } from "@apollo/client";
const KidStudioAPIURL = "https://graphql.contentful.com/content/v1/spaces/kllhmdk2nlsw/environments/master";
const client = new ApolloClient({
    uri: KidStudioAPIURL,
    cache: new InMemoryCache(),
});

export default client;