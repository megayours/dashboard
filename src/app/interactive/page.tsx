"use client"

import { useGammaChain } from "@/app/hooks/gamma/useGammaChain";
import { useState } from "react";

import dapps from "@/config/dapps";
import { useAccount } from "wagmi";
import InteractiveCard from "@/components/InteractiveCard/page";

const Interactive = () => {
    const { contracts, isLoading } = useGammaChain();

    const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
    const [selectedContract, setSelectedContract] = useState<string | null>(null);
    const [tokenId, setTokenId] = useState<number | null>(null);

    const hangleCollectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCollection(event.target.value === "" ? null : event.target.value);
        setSelectedContract(contracts.find((contract) => contract.collection === event.target.value)?.address.toString('hex') || null);
        setTokenId(null);

        // TODO: const userTokens = useYoursUserTokens(gammaChain.blockchainRid, address);
    };
    console.log("contacts", contracts.map((contract) => contract));

    const handleTokenIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTokenId(event.target.value ? Number(event.target.value) : null); // Update tokenId state
    };

    
    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading && contracts && (
                <div className="container mx-auto p-4 flex flex-col items-center justify-center space-y-8">
                    <h1 className="text-2xl font-bold mb-4 text-center">Extended Metadata Explorer</h1>
                    <select className="w-full p-2 border border-gray-300 rounded text-center">
                        <option value="ethereum">Ethereum</option>
                    </select>
                    <div className="flex justify-center flex flex-col">
                        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-400">
                            <img src="https://static-00.iconduck.com/assets.00/ethereum-icon-317x512-0vz32hj4.png" alt="Ethereum Logo" className="object-contain w-full h-full" />
                        </div>
                        <img src="https://png.pngtree.com/png-clipart/20230823/original/pngtree-vector-image-of-a-long-vertical-down-arrow-picture-image_8288456.png" style={{ height: '100px' }} />
                    </div>

                    <div className="w-full">
                        <select value={selectedCollection || ""} onChange={hangleCollectionChange} className="w-full p-2 border border-gray-300 rounded text-center">
                            <option value="">Select a collection</option>
                            {contracts.map((contract) => (
                                <option key={contract.collection} value={contract.collection}>
                                    {contract.collection}
                                </option>
                            ))}
                        </select>
                        {selectedCollection && (

                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded text-center mt-4"
                                placeholder="Enter a number"
                                value={tokenId || ""}
                                onChange={handleTokenIdChange} // Update tokenId on change
                            />
                        )}
                    </div>

                    {selectedContract && tokenId && <InteractiveCard chain="amoy" contract={selectedContract} tokenId={tokenId} />}
                </div>
                
            )}
        </div>
    );
}

export default Interactive;