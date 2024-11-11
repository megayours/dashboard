

import dapps from "@/config/dapps";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "postchain-client";
import { useGammaChainMetadata } from "@/app/hooks/gamma/useGammaChainMetadata";

export const fishingGameQueries = {
    GAME_DATA: "fishingGameData"
}

type AccountPage = {
    data: [{
        id: string;
    }], 
    next_cursor: string | null;
}

const FishingGameData = (chain: string, amoyContract: string, tokenId: number, owner: string, project: string, collection: string) => {
    const directoryNodeUrlPool = dapps.directoryNodeUrlPool;
    const brid = dapps.chains.find(d => d.name === "Fishing Game")?.blockchainRid;

    const {data: fishingGameData, isLoading} = useQuery({
        queryKey: [fishingGameQueries.GAME_DATA, chain, amoyContract, tokenId],
        queryFn: async () => {
            const client = await createClient({ directoryNodeUrlPool, blockchainRid: brid });
            const account = await client.query<AccountPage>('ft4.get_accounts_by_signer', {id: owner, page_size: null, page_cursor: null});
            if (account.data.length < 1) return null;

            const accountId = account.data[0].id;


            const equippedPfp = await client.query<any>('pfps.get_equipped', {account_id: accountId});

            // const equippedPfpYours = await client.query('yours.get_token_balance', {project: equippedPfp!.project, token_id: parseInt(equippedPfp!.id), collection: equippedPfp!.collection});
            // const equippedPfpYours = await client.query('yours.get_token_balances', {account_id: accountId});
            // console.log("EQUIPPED PFP", equippedPfp, project, collection, tokenId);

            if(equippedPfp && (equippedPfp!.project != project ||
                equippedPfp!.collection != collection ||
                equippedPfp!.id != tokenId
            )) {
                console.log("PFP not equipped");
                return null;
            }
                
            const rods = await client.query<any>('fishing.get_rods', {account_id: accountId})
            const fish = await client.query<any>('fishing.get_caught_fishes', {account_id: accountId})
            const equipped = await client.query<any>('equipments.get_equipped', {account_id: accountId});
            const armors = await client.query<any>('equipments.get_armor', {account_id: accountId, slot: "all"});
            const weapons = await client.query<any>('equipments.get_weapon', {account_id: accountId});
            
            console.log("ACCOUNT ID", rods, fish, equipped, armors, weapons);
            console.log("FISHING GAME DATA");
            return {
                rods,
                fish,
                armors,
                weapons,
                equipped
            };
        }, 
        enabled: !!owner && !!amoyContract && !!chain,
        refetchInterval: 2000,
        refetchOnWindowFocus: true
    })

    return {
        fishingGameData,
        isLoading
    }
}

export default FishingGameData; 