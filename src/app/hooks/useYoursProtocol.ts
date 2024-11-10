import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDappSelection } from './useDappSelection';
import dapps from '@/config/dapps';
import { createClient, IClient } from 'postchain-client';
import { useAccount } from 'wagmi';

export const yoursProtocolQueries = {
  TOKENS: 'tokens'
};

export type Token = {
  project: string;
  collection: string;
  token_id: string;
  type: string;
  amount: number;
}

type YoursProject = {
  name: string;
  blockchain_rid: Buffer;
}

export type YoursMetadata = {
  modules: string[];
  project: YoursProject;
  collection: string;
}

export type TokenMetadata = {
  name: string;
  properties: Record<string, any>;
  yours: YoursMetadata;
}

type TokenResponse = TokenMetadata & { current_brid: string; token_id: string; };

const cachedClients = new Map<string, IClient>();

export function useYoursProtocol() {
  const queryClient = useQueryClient();
  const directoryNodeUrlPool = dapps.directoryNodeUrlPool;
  const { selectedDapps } = useDappSelection();
  const { address } = useAccount();

  const { data: tokens = [], isLoading } = useQuery({
    queryKey: [yoursProtocolQueries.TOKENS, address, selectedDapps.map(d => d.blockchainRid)],
    queryFn: async () => {
      if (!address) return [];
      const allTokens: TokenResponse[] = [];

      const seenTokens = new Set<string>();
      console.log('selectedDapps', selectedDapps);
      for (const dapp of selectedDapps) {
        try {
          const client = cachedClients.get(dapp.blockchainRid) || 
                        await createClient({ directoryNodeUrlPool, blockchainRid: dapp.blockchainRid });
          cachedClients.set(dapp.blockchainRid, client);

          // Get accounts
          const accounts = await client.query<{ data: { id: Buffer }[] }>('ft4.get_accounts_by_signer', { 
            id: Buffer.from(address.replace('0x', ''), 'hex'),
            page_size: 1,
            page_cursor: null
          });
          console.log('accounts', dapp.blockchainRid, accounts);
          
          if (accounts.data.length === 0) continue;
          
          const accountId = accounts.data[0].id;
          
          // Get tokens
          const tokens = await client.query<Token[]>('yours.tokens', { account_id: accountId });
          
          // Fetch metadata for each token
          const tokensWithMetadata = await Promise.all(
            Array.from(new Set(tokens)).map(async (token) => {
              if (seenTokens.has(`${token.project}-${token.collection}-${token.token_id}`)) return null;
              seenTokens.add(`${token.project}-${token.collection}-${token.token_id}`);
              const metadata = await client.query<TokenMetadata>('yours.metadata', {
                project: token.project,
                collection: token.collection,
                token_id: token.token_id
              });
              
              return {...metadata, current_brid: dapp.blockchainRid, token_id: token.token_id};
            })
          ).then(results => results.filter((v): v is TokenResponse => v !== null));

          allTokens.push(...tokensWithMetadata);
          console.log('allTokens', allTokens);
        } catch (error) {
          console.error(`Error fetching tokens for dapp ${dapp.name}:`, error);
          continue;
        }
      }

      return allTokens;
    },
    staleTime: Infinity,
    enabled: !!address
  });

  return {
    tokens,
    isLoading,
    error: null
  };
}