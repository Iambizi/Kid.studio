import Head from 'next/head';
import Script from 'next/script';

interface Types{
    page: string;
}
export default function Meta({page}: Types): JSX.Element{
    return(
        <>
            <Head>
                <title>Kid. Studio | {page}</title>
                {/* <Script>0</Script> */}
            </Head>
        </>
    );
}