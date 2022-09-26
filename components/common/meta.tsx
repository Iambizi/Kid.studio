import Head from 'next/head';

interface Type{
    page: string;
}

const Meta: React.FC<Type> = ({page}): JSX.Element =>{
    return(
        <>
            <Head>
                <title>Kid. Studio | {page}</title>
            </Head>
        </>
    );
}

export default Meta;