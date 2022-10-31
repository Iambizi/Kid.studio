import { ApolloClient, InMemoryCache } from "@apollo/client";

// Allows you to connect to contentful Headless CMS via GRAPHQL API interfaces

const KidStudioAPIURL = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ID}/environments/master?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY}`;
const apolloClient = new ApolloClient({
    uri: KidStudioAPIURL,
    cache: new InMemoryCache(),
});

export default apolloClient;