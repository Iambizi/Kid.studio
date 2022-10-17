export type homePageTypes = [
  {
    featuredProjectImage: { url: string };
    title: string;
    slug: string;
  }
];

export type infoPageTypes = {
  aboutUs: {
    json: {
      content: [
        {
          content: [{ value: string }];
        }
      ];
    };
  };
  infoImage: {
    url: string;
  };
};

export type workPageTypes = {
  
}
