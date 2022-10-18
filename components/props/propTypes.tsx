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

export type workPageTypes = [{
  hoverImage: {
    url: string;
  }
  projectName: string;
  projectLink: string;
}];

export type projectPageTypes = {
  projectTitle: string;
  projectVideo: string;
  projectCreds: {
    json: {
      content: [
        {
          content: [{ value: string }];
        }
      ];
    };
  };
  videoCover: { 
    url: string;
    width: number;
    height: number; 
  };
  videoStillsCollection: {
    items: [{
      url: string;
    }]
  };
  playButton: {
    url: string
  };
};
