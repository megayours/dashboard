import { useEffect, useState } from "react";
import { GammaChainTokenMetadata, useGammaChainMetadata } from "../../app/hooks/gamma/useGammaChainMetadata";
import GammaMetadata from "@/components/Interactive/GammaMetadata/GammaMetadata";
import { useAccount } from "wagmi";

const InteractiveCard = ({ chain="amoy", contract, tokenId }: { chain: string, contract: string, tokenId: number }) => {

    const { metadata, isLoading } = useGammaChainMetadata(chain, contract, tokenId);
    const [tokenMetadata, setTokenMetadata] = useState<GammaChainTokenMetadata | null>(null);
    const { address } = useAccount();

    
    useEffect(() =>{
        if(metadata) {
            setTokenMetadata(metadata);
            console.log("ADDRESS", address);
            console.log("TOKEN METADATA", metadata.owner.toString('hex'));
        }
    }, [metadata, isLoading])

    return <div>
        {!isLoading && !tokenMetadata && <div>Token not extended yet</div>}
        {
        tokenMetadata &&
         address &&  
         "0x"+tokenMetadata.owner.toString('hex').toLowerCase() == address.toLowerCase() &&
         <div className="bg-primary text-white text-center p-4 rounded-lg">
            <h1 className="text-2xl font-bold">You are the owner of this token!</h1>
         </div>
        } 
        {tokenMetadata && <div className="">
                <GammaMetadata token={tokenMetadata} />
            </div>
        }
    </div>
}

export default InteractiveCard;