"use client";

import useBattleGameData from "@/app/hooks/battle/useBattleGameData";
import TokenAvatar from "../TokenAvatar/page";
import Link from "next/link";


const BattleGame = ({chain, amoyContract, tokenId, owner, project, collection}: {chain: string, amoyContract: string, tokenId: number, owner: string, project: string, collection: string}) => {
    const { battleGameData, isLoading } = useBattleGameData({chain, amoyContract, tokenId, owner, project, collection});

    const { equipped, armors, weapons, battleHistory } = battleGameData || { equipped: null, armors: null, weapons: null, battleHistory: null };

    console.log("BATTLE GAME DATA", battleHistory);

    
    return !battleGameData && !isLoading? <div><h1>Battle Game</h1><p>Metadata not extended</p></div> : <div className="container mx-auto space-y-4">
        <Link href={`https://t.me/MegaYoursDemoBot/megayours` } target="_blank" rel="noopener noreferrer" style={{color: 'blue', textDecoration: 'underline'}}>
            <h1>Battle Game</h1>
        </Link>
        <div className="container mx-auto">
            <div className="flex flex-wrap space-y-2">
                {armors && Array.isArray(armors) && armors.map((armor: any) => (
                    <div key={armor.id} className="container mx-2 bg-gray-200 p-4 rounded text-center w-1/3" style={{marginTop: "8px"}}>
                        <h2 className="text-sm">{armor.name}</h2>
                        <div className="flex justify-center">
                            <img src={armor.image} alt={armor.name} className="mb-2 w-10 h-10" />
                        </div>
                        <p className="text-xs">Defense: {armor.defense}</p>
                        <p className="text-xs">Weight: {armor.weight}</p>
                    </div>
                ))}
                {weapons && Array.isArray(weapons) && weapons.map((weapon: any) => (
                    <div key={weapon.id} className="container mx-2 bg-gray-200 p-4 rounded text-center w-1/3" style={{marginTop: "8px"}}>
                        <h2 className="text-sm">{weapon.name}</h2>
                        <div className="flex justify-center">
                            <img src={weapon.image} alt={weapon.name} className="mb-2 w-10 h-10" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="container mx-auto">
            <div className="flex flex-col space-y-2">
                <h2>Battle History</h2>
                {battleHistory && Array.isArray(battleHistory) && battleHistory.map((battle: any) => (
                    <div key={battle.id} className={`flex items-center space-x-4 mx-2 ${battle.won ? "bg-green-200" : "bg-red-200"} p-4 rounded w-2/3`} style={{marginTop: "8px"}}>
                        <Link href={`/token/chain/${"amoy"}/contract/${"c5f7f51e9de3b92a5f2ad9fd41c9e58c0cd2f2a6"}/id/${battle.opponent.token_id}`}>
                            <p className="text-sm"><span className="font-bold">Opponent: </span>{battle.opponent.name}</p>
                            <div className="w-10 h-10 rounded-full">
                                <TokenAvatar image={battle.opponent.image} alt={battle.opponent.name} />
                            </div>
                        </Link>
                        <p className="text-sm font-bold">{battle.won ? "Won" : "Lost"}</p>
                    </div>
                ))}
            </div>
            </div>
        </div>
    
}

export default BattleGame;