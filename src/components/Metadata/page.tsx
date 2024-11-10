import { useYoursTokenMetadata } from "@/app/hooks/useYoursTokenMetadata";
import TokenAvatar from "../TokenAvatar/page";
import BattleGame from "../BattleGame/page";
import FishingGame from "../FishingGame/page";


const Metadata = ({ brid, project, collection, tokenId, owner }: { brid: string, project: string, collection: string, tokenId: number, owner: string }) => {


    const { metadata } = useYoursTokenMetadata(brid, project, collection, tokenId);
    console.log("metadata page useYoursTokenMetadata", metadata);

    return <div className="container mx-auto">
        <div className="flex space-x-4">
            <div className="w-1/2 rounded border p-4">
                <TokenAvatar image={metadata?.[0].dappTokenMetadata.properties?.image} alt={metadata?.[0].dappTokenMetadata.properties?.name} />
                <div className="mt-4 space-y-4">
                    <div>
                        <div>
                            <span className="text-md font-bold">Name: </span><span className="text-md">{metadata?.[0].dappTokenMetadata.name}</span>
                        </div>
                        <div>
                            <span className="text-md font-bold">Description: </span><span className="text-md">{metadata?.[0].dappTokenMetadata.properties?.description}</span>
                        </div>

                    </div>
                    <div className="container mx-auto ">
                        <div className="text-md font-bold">Original Metadata: </div>
                        <div className="text-xl">{metadata?.[0].dappTokenMetadata.properties?.attributes}</div>
                        {Object.entries(metadata?.[0].dappTokenMetadata.properties || {}).map(([trait_type, value]) => (
                            <div key={trait_type} className="flex space-x-2 items-center space-y-1 [overflow-wrap:anywhere]">
                                <div className="w-1/3">
                                    <span className="text-md font-bold">{trait_type}: </span>
                                </div>
                                <div className="w-2/3">
                                    <span className="text-sm">{value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-1/2 container mx-auto">
                <h1 className="text-2xl font-bold">Available Chains</h1>
                <div className="flex flex-col mt-2">
                    {metadata?.map((m) => {
                        return <div key={m.name} className="border-b py-2">
                            
                            {m.name == "Battle Game"? <BattleGame /> : null}
                            {/* {m.name == "Fishing Game"? <FishingGame /> : null} */}

                            
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
}

export default Metadata;