"use client";

import { useGammaChainMetadata } from '@/app/hooks/gamma/useGammaChainMetadata';
import InteractiveCard from '@/components/InteractiveCard/page';
import * as React from 'react';
import { useEffect } from 'react';

const TokenPage = ({ params }: { params: Promise<{ chain: string, contract: string, id: string }> }) => {
    const { chain, contract, id } = React.use(params);

    const { metadata:token, isLoading } = useGammaChainMetadata(chain, contract, parseInt(id));

    useEffect(() => {
        console.log(chain, contract, id);
    }, [chain, contract, id]);

    return <InteractiveCard chain={chain} contract={contract.replace("0x", "")} tokenId={parseInt(id)} />
}

export default TokenPage;