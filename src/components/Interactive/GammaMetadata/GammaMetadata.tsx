import Link from "next/link";
import { GammaChainTokenMetadata } from "@/app/hooks/gamma/useGammaChainMetadata";
import TokenAvatar from "@/components/TokenAvatar/page";
import YoursCard from "@/components/YoursCard/page";


const GammaMetadata = ({ token }: { token: GammaChainTokenMetadata }) => {
    console.log("Token", token);

    return <div className="">
            <Link href={`/token/chain/${token.chain}/contract/${token.address.toString('hex')}/id/${token.token_id}`}>
                <div className="flex justify-between items-center px-6 py-4">
                    <div>
                        <h1 className="font-bold text-3xl mb-2">{token.project}</h1>
                        <p className="text-lg">
                            {token.project}
                        </p>
                    </div>
                    <div className="inline-block bg-primary rounded-full px-4 py-2 text-xl font-semibold">
                        <span className="text-white font-thin">#{token.token_id}</span>
                    </div>
                </div> 
            </Link>
            <div className="flex justify-between h-full">
                <div className="w-1/2 rounded border p-4 space-y-4">
                    <div className="w-2/3 mx-auto">
                        <TokenAvatar image={token.metadata.image} alt={token.metadata.name}  />
                    </div>
                    <div className="container mx-auto space-y-4">
                        <div>
                            <span className="text-md font-bold">Name: </span><span className="text-md">{token.metadata.name}</span>
                        </div>
                        <div>
                            <span className="text-md font-bold">Description: </span><span className="text-md">{token.metadata.description}</span>
                        </div>
                        <div className="container mx-auto">
                            <div className="text-md font-bold">Original Metadata: </div>
                            {token.metadata.attributes.map((attribute: {trait_type: string, value: string}) => (
                                <div key={attribute.trait_type} className="flex space-x-2 items-center space-y-2">
                                    <div className="w-1/3">
                                        <span className="text-md font-bold">{attribute.trait_type}: </span>
                                    </div>
                                    <div className="w-2/3">
                                        <span className="text-sm">{attribute.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-1/2 container mx-auto">
                    <h1 className="text-2xl font-bold">Available Chains</h1>
                    <div className="flex flex-col mt-2">
                        <YoursCard chain={token.chain} amoyContract={token.address} tokenId={token.token_id} owner={token.owner} />
                    </div>
                </div>
            </div>
        </div>          
}

export default GammaMetadata;