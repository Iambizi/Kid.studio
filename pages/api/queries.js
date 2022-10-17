import { gql } from '@apollo/client';

const commonAssetsCollection = `
commonAssetsCollection {
      items {
        loader {
          url
        }
      }
    }`;

export const homePageQuery = gql`
  query {
    homePageCollection {
      items {
        title
        slug
        featuredProjectImage {
          url
        }
      }
    }
    ${commonAssetsCollection}
  }
`;

export const workPageQuery = gql`
  query {
    workPageCollection {
      items {
        projectName
        projectLink
        hoverImage {
          url
        }
      }
    }
  }
`;

export const infoPageQuery = gql`
  query {
    infoPageCollection {
      items {
        infoImage {
          url
        }
        aboutUs {
          json
        }
      }
    }
    ${commonAssetsCollection}
  }
`;
