import { createClient } from 'contentful';

// Allows you to connect to contentful Headless CMS via a REST API interfaces

export const connectClient = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSKEY
  });
