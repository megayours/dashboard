import { useQuery } from "@tanstack/react-query";
import { createClient, IClient } from 'postchain-client';
import dapps from '@/config/dapps';
import { useAccount } from 'wagmi';


const cachedClients = new Map<string, IClient>();

export function useYoursToken(brid: string, tokenId: string) {

    const directoryNodeUrlPool = dapps.directoryNodeUrlPool;
    const { address } = useAccount();

    const queryResult = useQuery({
        queryKey: ['yoursToken', tokenId],
        queryFn: async () => {
            if (!address) return [];
            if(!tokenId) return [];
            
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
                console.log('accounts', accounts);
                
                if (accounts.data.length === 0) return [];
                
                const accountId = accounts.data[0].id;

                const token = await client.query('yours.tokens', { 
                    account_id: accountId
                });

            } catch (error) {
                console.error('Error fetching token', error);
                return null;
            }

        }
    });

    const { data: token, isLoading } = queryResult;
}