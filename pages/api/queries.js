export const homePageQuery = `
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

  export const commonAssetsQuery = `
  query {
    commonAssetsCollection{
      items{
        loader{
          url
        }
      }
    }
  }`;
