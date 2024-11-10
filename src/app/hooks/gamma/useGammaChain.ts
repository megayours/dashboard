import dapps from "@/config/dapps";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { createClient, IClient } from 'postchain-client';


export const gammaChainQueries = {
    CONTRACTS: "gammaChainContracts"
}

export type Contract = {
    chain: string;
    address: Buffer;
    block_height: number;
    project: string;
    collection: string;
    type: string;
}

export function useGammaChain(): { contracts: Contract[], isLoading: boolean, error: null } {

    const queryClient = useQueryClient();
    const directoryNodeUrlPool = dapps.directoryNodeUrlPool;

    

    const {data: fetchedContracts = [], isLoading: contractsLoading} = useQuery({
        queryKey: [gammaChainQueries.CONTRACTS],
        queryFn: async () => {
            const client = await createClient({ directoryNodeUrlPool, blockchainRid: dapps.chains.find(d => d.name === "Gamma Chain")?.blockchainRid });
            const fetchedContracts = await client.query<Contract[]>('oracle.list_contracts', {});
            return fetchedContracts;
        }
    });
    return {
        contracts: fetchedContracts,
        isLoading: contractsLoading,
        error: null
    }

}