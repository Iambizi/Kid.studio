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
    commonAssetsCollection{
        items{
          loader{
            url
          }
        }
      }
  }`;
