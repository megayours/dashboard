

import dapps from "@/config/dapps";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "postchain-client";


export const fishingGameQueries = {
    GAME_DATA: "fishingGameData"
}

type AccountPage = {
    data: [{
        id: string;
    }], 
    next_cursor: string | null;
}

const FishingGameData = (chain: string, amoyContract: string, tokenId: number, owner: string) => {
    const directoryNodeUrlPool = dapps.directoryNodeUrlPool;
    const brid = dapps.chains.find(d => d.name === "Fishing Game")?.blockchainRid;

    const {data: fishingGameData, isLoading} = useQuery({
        queryKey: [fishingGameQueries.GAME_DATA, chain, amoyContract, tokenId],
        queryFn: async () => {
            const client = await createClient({ directoryNodeUrlPool, blockchainRid: brid });
            const account = await client.query<AccountPage>('ft4.get_accounts_by_signer', {id: owner, page_size: null, page_cursor: null});
            if (account.data.length < 1) return null;

            const accountId = account.data[0].id;


            const rods = await client.query('fishing.get_rods', {account_id: accountId})
            const fish = await client.query('fishing.get_caught_fishes', {account_id: accountId})
            const equipped = await client.query('equipments.get_equipped', {account_id: accountId});
            const armors = await client.query('equipments.get_armor', {account_id: accountId, slot: "all"});
            const weapons = await client.query('equipments.get_weapon', {account_id: accountId});

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