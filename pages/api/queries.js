import { gql } from "@apollo/client";

export const homePageQuery = gql `
query {
    homePageCollection{
      items{
        title
        slug
        featuredProjectImage{
          url
        }
      }
    }
  }`;

  export const commonAssetsQuery = gql `
  query {
    commonAssetsCollection{
      items{
        loader{
          url
        }
      }
    }
  }`;
