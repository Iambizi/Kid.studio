import useSWR from 'swr';

//Fetcher function need to use useSWR

export default async function fetcher(url){
    const res = await fetch(url);
    return res.json();
}