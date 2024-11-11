import { useQuery } from "@tanstack/react-query";
import { createClient } from "postchain-client";
import dapps from "@/config/dapps";

export const gammaUserTokensQueries = {
    USER_TOKENS: "gammaUserTokens"
}

export function useGammaUserTokens(address: string) {
    const directoryNodeUrlPool = dapps.directoryNodeUrlPool;

    const { data: userTokens = [] } = useQuery({
        queryKey: [gammaUserTokensQueries.USER_TOKENS, address],
        queryFn: async () => {
            const client = await createClient({ directoryNodeUrlPool, blockchainRid: dapps.chains.find(d => d.name === "Gamma Chain")?.blockchainRid });
            const userTokens = await client.query<any[]>('oracle.tracked_token', { address });
            return [];
        }
    })
}