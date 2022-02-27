import React from 'react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

class Document extends NextDocument {
    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    <meta name="description" content="minimum-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="stylesheet preload prefetch" href="/fonts/andalemo.ttf" as="style" crossOrigin="anonymous" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default Document;