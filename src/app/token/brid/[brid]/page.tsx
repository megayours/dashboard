"use client";


import { useState, useEffect } from 'react';
import { useYoursToken } from '@/app/hooks/useYoursToken';


export default async function TokenPage({params}: {params: Promise<{brid: string}>}) {
    const brid = (await params).brid;

    console.log("brid", brid);

    useEffect(() => {
        const { data: token, isLoading } = useYoursToken(brid, "1");

        console.log("brid", brid);
    }, [params]);


    return <div>{JSON.stringify("hrrlo")}</div>
}

