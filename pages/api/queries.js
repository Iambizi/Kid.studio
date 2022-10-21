import { gql } from '@apollo/client';

const commonAssetsCollection = `
    commonAssetsCollection {
        items {
            loader {
            url
            }
        }
        }
    `;

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

export const projectPageQuery = gql`
  query {
    projectPageCollection {
      items {
        projectTitle
        projectVideo
        projectSlug
        projectCreds {
          json
        }
        videoCover {
          url
          width
          height
        }
        playButton {
          url
        }
        videoStillsCollection {
          items {
            url
          }
        }
      }
    }
  }
`;

export const reelPageQuery = gql`
  query {
    reelPageCollection {
      items {
        pageTitle
        projectVideo
        details {
          json
        }
        videoCover {
          url
          width
          height
        }
        playButton {
          url
        }
        videoStillsCollection {
          items {
            url
          }
        }
      }
    }
  }
`;

export const commonQuery = gql`
  query {
    commonAssetsCollection(limit: 10) {
      items {
        siteLogosCollection {
          items {
            url
          }
        }
        flashAssetsCollection {
          items {
            url
          }
        }
      }
    }
  }
`;
