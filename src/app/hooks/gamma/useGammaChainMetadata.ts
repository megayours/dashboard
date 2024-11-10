import { useQuery } from "@tanstack/react-query";
import dapps from "@/config/dapps";
import { createClient, IClient } from 'postchain-client';


export const gammaChainQueries = {
    METADATA: "gammaChainMetadata"
}

export type GammaChainTokenMetadata = {
    project: string;
    collection: string;
    address: string;
    chain: string;
    token_id: number;
    type: string;
    metadata: any;
    owner: string;
}

export function useGammaChainMetadata(chain="amoy", contract: string, tokenId: number) {

    const directoryNodeUrlPool = dapps.directoryNodeUrlPool;

    const {data: metadata, isLoading} = useQuery({
        queryKey: [gammaChainQueries.METADATA, contract, tokenId],
        queryFn: async () => {
            try{
                const client = await createClient({ directoryNodeUrlPool, blockchainRid: dapps.chains.find(d => d.name === "Gamma Chain")?.blockchainRid });
                console.log(chain, contract, tokenId);
                const metadata = await client.query<GammaChainTokenMetadata>('oracle.get_token', {chain, address: contract, token_id: tokenId});
                return metadata;
            } catch (error) {
                console.error("Error fetching metadata", error);
                return null;
            }
        },
        enabled: !!contract || !!tokenId,
        staleTime: 0,
        refetchOnWindowFocus: true
    })

    return {
        metadata,
        isLoading
    }
}