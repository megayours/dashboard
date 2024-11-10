"use client";

import * as React from 'react';

import { useState, useEffect } from 'react';
import { useYoursToken } from '@/app/hooks/useYoursToken';
import TokenCard from '@/components/TokenCard/page';

export default function TokenPage({params}: {params: Promise<{brid: string, tokenid: string, projectname: string}>}) {
    const { brid, tokenid, projectname } = React.use(params) 

    return <div className="">
        <TokenCard brid={brid} tokenId={parseInt(tokenid)} />
    </div>
}

