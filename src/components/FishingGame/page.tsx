"use client";
    
import useFishingGameData from "@/app/hooks/fishing/useFishingGameData";
import { useEffect, useState } from "react";
import './FishingGame.css'; // Import the CSS file for pulsing effect
import Link from "next/link";
const FishingGame = ({chain, amoyContract, tokenId, owner, project, collection}: {chain: string, amoyContract: string, tokenId: number, owner: string, project: string, collection: string}) => {

    const { fishingGameData, isLoading } = useFishingGameData(chain, amoyContract, tokenId, owner, project, collection);

    const { rods, fish, armors, weapons } = fishingGameData || { rods: null, fish: null, armors: null, weapons: null };

    const [fishBackgrounds, setFishBackgrounds] = useState<{[key: number]: string}>({});
    const [isFirstUpdate, setIsFirstUpdate] = useState(true);
    const [pulsingFishIds, setPulsingFishIds] = useState<Set<number>>(new Set()); // Track pulsing fish IDs

    useEffect(() => {
        console.log("AN UPDATE!");
        
        if (fish) {
            const newBackgrounds = {...fishBackgrounds};
            fish.forEach((f: any) => {
                if (!isFirstUpdate && f.amount !== (fishBackgrounds[f.id] ? fishBackgrounds[f.id].amount : 0)) {
                    newBackgrounds[f.id] = 'lightcoral'; // Set to light orange color
                    setPulsingFishIds(prev => new Set(prev).add(f.id)); // Add fish ID to pulsing set

                    // Reset the color back to neutral and remove pulsing class after 2 seconds
                    setTimeout(() => {
                        setFishBackgrounds(prev => ({
                            ...prev,
                            [f.id]: '#E5E7EB' // Reset to specified color
                        }));
                        setPulsingFishIds(prev => {
                            const updated = new Set(prev);
                            updated.delete(f.id); // Remove fish ID from pulsing set
                            return updated;
                        });
                    }, 2000);
                }
            });
            setFishBackgrounds(newBackgrounds);
            setIsFirstUpdate(false);
        }
    }, [fishingGameData])

    return (
       
        !fishingGameData && !isLoading? <div><h1>Fishing Game</h1><p>Metadata not extended</p><Link href={`https://demo-fishing-dapp.vercel.app/` } target="_blank" rel="noopener noreferrer" style={{color: 'blue', textDecoration: 'underline'}}>Extend them now!</Link></div> : <div className="container mx-auto space-y-4">
            <a href={`https://demo-fishing-dapp.vercel.app/` } target="_blank" rel="noopener noreferrer" style={{color: 'blue', textDecoration: 'underline'}}>
                <h1>Fishing Game</h1>
            </a>
            <div className="container mx-auto">
                <div className="flex flex-wrap space-y-2">
                    {rods && rods.map((rod: any) => (
                        <div key={rod.id} className="container mx-2 bg-gray-200 p-4 rounded text-center w-1/3" style={{marginTop: "8px"}}>
                            <h2 className="text-sm">{rod.name}</h2>
                            <div className="flex justify-center">
                                <img src={rod.image} alt={rod.name} className="mb-2 w-10 h-10" />
                            </div>
                            <p className="text-xs">Durability: {rod.durability}</p>
                        </div>
                    ))}
                    {fish && fish.map((fish: any) => (
                        <div key={fish.id} className={`container mx-2 p-4 rounded text-center w-1/3 ${pulsingFishIds.has(fish.id) ? 'pulsing' : ''}`} style={{backgroundColor: fishBackgrounds[fish.id] || '#E5E7EB'}}>
                            <h2 className="text-sm">{fish.name}</h2>
                            <div className="flex justify-center">
                                <img src={fish.image} alt={fish.name} className="mb-2 w-10 h-10" />
                            </div>
                            <p className="text-xs">Amount: {fish.amount}</p>
                        </div>
                    ))}
                    {armors && armors.map((armor: any) => (
                        <div key={armor.id} className="container mx-2 bg-gray-200 p-4 rounded text-center w-1/3">
                            <h2 className="text-sm">{armor.name}</h2>
                            <div className="flex justify-center">
                                <img src={armor.image} alt={armor.name} className="mb-2 w-10 h-10" />
                            </div>
                        </div>
                    ))}
                    {weapons && weapons.map((weapon: any) => (
                        <div key={weapon.id} className="container mx-2 bg-gray-200 p-4 rounded text-center w-1/3">
                            <h2 className="text-sm">{weapon.name}</h2>
                            <div className="flex justify-center">
                                <img src={weapon.image} alt={weapon.name} className="mb-2 w-10 h-10" />
                            </div>
                            <p className="text-xs">Damage: {weapon.damage}</p>
                            <p className="text-xs">Weight: {weapon.weight}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FishingGame;