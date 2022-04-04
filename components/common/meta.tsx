import Head from 'next/head';

interface Types{
    page: string;
}

const Meta = ({page}: Types): JSX.Element =>{
    return(
        <>
            <Head>
                <title>Kid. Studio | {page}</title>
            </Head>
        </>
    );
}

export default Meta;