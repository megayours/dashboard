import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient, IClient } from 'postchain-client';
import dapps from '@/config/dapps';
import { useAccount } from 'wagmi';
import { Token } from "./useYoursProtocol";


const cachedClients = new Map<string, IClient>();

export function useYoursToken(brid: string, tokenId: number): { token: Token | null; isLoading: boolean; error: null } {

    const queryClient = useQueryClient();
    const directoryNodeUrlPool = dapps.directoryNodeUrlPool;

    const { address } = useAccount();


    const { data: token = null, isLoading } = useQuery({
        queryKey: ['yoursToken', brid, address],
        queryFn: async () => {
            if (!address) return null;
            if (!brid) return null;

            if(!tokenId) return null;

            try {
                const client = cachedClients.get(brid) || 
                    await createClient({ directoryNodeUrlPool, blockchainRid: brid });
                cachedClients.set(brid, client);

                 // Get accounts
                const accounts = await client.query<{ data: { id: Buffer }[] }>('ft4.get_accounts_by_signer', { 
                    id: Buffer.from(address.replace('0x', ''), 'hex'),
                    page_size: 1,
                    page_cursor: null
                });

                if (accounts.data.length === 0) return null;
                
                const accountId = accounts.data[0].id;

                const tokens = await client.query<Token[]>('yours.tokens', { 
                    account_id: accountId
                });
                console.log("BRID", brid, "ACCOUNT", accountId)
                console.log("TOKENS", tokens)


                if(!tokens) return null;
                const token = tokens.find((t: Token) => t.token_id == tokenId.toString());


                return token;

            } catch (error) {
                console.error('Error fetching token', error);
                return null;
            }
        },
        staleTime: Infinity,
        enabled: !!brid && !!address && !!tokenId
    });

    return {
        token,
        isLoading,
        error: null
    };

}