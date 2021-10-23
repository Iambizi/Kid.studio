import Head from 'next/head';
interface Types{
    page: string;
}
export default function meta({page}: Types): JSX.Element{
    return(
        <>
            <Head>
                <title>Kid. Studio | {page}</title>
            </Head>
        </>
    );
}