import dapps from "@/config/dapps";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "postchain-client";    

export const battleGameQueries = {
    GAME_DATA: "battleGameData"
}

type AccountPage = {
    data: [{
        id: string;
    }], 
    next_cursor: string | null;
}


const BattleGameData = ({chain, amoyContract, tokenId, owner, project, collection}: {chain: string, amoyContract: string, tokenId: number, owner: string, project: string, collection: string}) => {
    const directoryNodeUrlPool = dapps.directoryNodeUrlPool;
    const brid = dapps.chains.find(d => d.name === "Battle Game")?.blockchainRid;


    const {data: battleGameData, isLoading} = useQuery({
        queryKey: [battleGameQueries.GAME_DATA, chain, amoyContract, tokenId],
        queryFn: async () => {
            const client = await createClient({ directoryNodeUrlPool, blockchainRid: brid });
            const account = await client.query<AccountPage>('ft4.get_accounts_by_signer', {id: owner, page_size: null, page_cursor: null});
            if (account.data.length < 1) return null;
            const accountId = account.data[0].id;

            const equippedPfp = await client.query<any>('pfps.get_equipped', {account_id: accountId});
            // const equippedPfpYours = await client.query('yours.get_token_balance', {project: equippedPfp!.project, token_id: parseInt(equippedPfp!.id), collection: equippedPfp!.collection});
            // const equippedPfpYours = await client.query('yours.get_token_balances', {account_id: accountId});
            console.log("EQUIPPED BATTLE", equippedPfp, project, collection, tokenId);

            if(equippedPfp && (equippedPfp!.project != project ||
                equippedPfp!.collection != collection ||
                equippedPfp!.id != tokenId
            )) {
                console.log("PFP not equipped");
                return null;
            }
            
            const equipped = await client.query('equipments.get_equipped', {account_id: accountId});
            const armors = await client.query('equipments.get_armor', {account_id: accountId, slot: "all"});
            const weapons = await client.query('equipments.get_weapon', {account_id: accountId});
            const battleHistory = await client.query('battles.get_history', {account_id: accountId});

            console.log("BATTLE GAME DATA");
            return {
                equipped,
                armors,
                weapons,
                battleHistory
            }
        },
        enabled: !!owner && !!amoyContract && !!chain,
        refetchInterval: 2000,
        refetchOnWindowFocus: true
    })


    
    return {
        battleGameData,
        isLoading
    }
} 

export default BattleGameData;