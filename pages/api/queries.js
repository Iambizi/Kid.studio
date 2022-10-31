import { gql } from '@apollo/client';

const commonR3fLoader = `
    loader {
      url
    }
`;

const commonLogoAndFlashAssets = `
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
    commonAssetsCollection(limit: 10){
      items{
        ${commonR3fLoader}
        ${commonLogoAndFlashAssets}
      }
    }
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
    commonAssetsCollection(limit: 10){
      items{
        ${commonLogoAndFlashAssets}
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
    commonAssetsCollection(limit: 10){
      items{
        ${commonR3fLoader}
        ${commonLogoAndFlashAssets}
      }
    }
  }
`;

export const projectPageQuery = gql`
  query {
    projectPageCollection(limit: 10) {
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
    commonAssetsCollection(limit: 10){
      items{
        ${commonLogoAndFlashAssets}
      }
    }
  }
`;

export const reelPageQuery = gql`
  query {
    reelPageCollection(limit: 10) {
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
    commonAssetsCollection(limit: 10){
      items{
        ${commonLogoAndFlashAssets}
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
