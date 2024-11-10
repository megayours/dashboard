"use client";
    
import useFishingGameData from "@/app/hooks/fishing/useFishingGameData";


const FishingGame = ({chain, amoyContract, tokenId, owner}: {chain: string, amoyContract: string, tokenId: number, owner: string}) => {

    const { fishingGameData, isLoading } = useFishingGameData(chain, amoyContract, tokenId, owner);

    const { rods, fish, armors, weapons } = fishingGameData || { rods: null, fish: null, armors: null, weapons: null };


    return (
        <div className="container mx-auto space-y-4">
            <a href={`https://demo-fishing-dapp.vercel.app/` } target="_blank" rel="noopener noreferrer">
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
                        <div key={fish.id} className="container mx-2 bg-gray-200 p-4 rounded text-center w-1/3">
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