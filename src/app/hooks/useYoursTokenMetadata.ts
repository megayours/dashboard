import { TokenMetadata } from "./useYoursProtocol";
import dapps from '@/config/dapps';
import { useQuery } from '@tanstack/react-query';
import { createClient, IClient } from 'postchain-client';

const cachedMetadata = new Map<string, IClient>();

export function useYoursTokenMetadata(brid: string, project: string, collection: string, tokenId: number) {
    const directoryNodeUrlPool = dapps.directoryNodeUrlPool;    
    
    const {data: metadata, isLoading} = useQuery({
        queryKey: ["getTokenMetadata", project, collection, tokenId],
        queryFn: async () => {
            const allMetadata = [];
            for (const dapp of dapps.chains) {
                const client = cachedMetadata.get(dapp.blockchainRid) || await createClient({ directoryNodeUrlPool, blockchainRid: dapp.blockchainRid });
                cachedMetadata.set(dapp.blockchainRid, client);

                try {
                    const dappTokenMetadata = await client.query<TokenMetadata>('yours.metadata', {
                        project,
                        collection,
                        token_id: tokenId
                    });
                    if(dappTokenMetadata) allMetadata.push({name: dapp.name, dappTokenMetadata});
                } catch (error) {
                    console.error("Error fetching token metadata", error);
                    return null;
                }
            }
            return allMetadata;
        },
        staleTime: Infinity,
        enabled: !!project && !!collection && !!tokenId
    })

    return {
        metadata,
        isLoading
    }
}