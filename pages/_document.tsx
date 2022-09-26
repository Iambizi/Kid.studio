import React from 'react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

class Document extends NextDocument {
    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    <meta name="description" content="Creative studio — branding, design and film." />
                    <meta name="keywords" content="Kid,Studio,Design,Film,Toronto,Creative"></meta>
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