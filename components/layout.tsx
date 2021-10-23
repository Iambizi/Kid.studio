import Navigation from "../components/common/header/navigation";
import Footer from "../components/common/footer";
import Flash from "../components/common/flash";
import Loader from "../components/common/loader";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Head from "next/head";
import Link from "next/link";

interface Type {
    children: React.ReactNode,
    bgImg?: boolean;
    setbgImg?: any;
    specificStyles?: string;
}

export default function layout( { children, bgImg, setbgImg, specificStyles }:Type ):JSX.Element{

    return(
        <>
            <Navigation bgImg={bgImg} />
            {/* <Loader /> */}
            <Flash />
                { children }
            <Footer bgImg={bgImg} specificStyles={specificStyles} />
        </>
    );
}
