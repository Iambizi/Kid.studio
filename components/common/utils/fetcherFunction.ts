import useSWR from 'swr';

export default async function fetcher(url){
        const res = await fetch(url);
        return res.json();
    }