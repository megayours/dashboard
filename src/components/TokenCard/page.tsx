import { useEffect, useState } from "react";
import { useYoursToken } from "@/app/hooks/useYoursToken";
import { Token } from "@/app/hooks/useYoursProtocol";
import { useYoursTokenMetadata } from "@/app/hooks/useYoursTokenMetadata";
import Metadata from "@/components/Metadata/page";

export const TokenCard = ({ brid, tokenId }: { brid: string, tokenId: number }) => {

    const {token, isLoading} = useYoursToken(brid, tokenId);



    if(isLoading) return <div>Loading...</div>;
    if(!token && !isLoading) return <div>Token not found</div>;

    if(!isLoading && token) return <div>
        <div className="">
            <div className="flex justify-between items-center px-6 py-4">
                <div>
                    <h1 className="font-bold text-3xl mb-2">{token.collection}</h1>
                    <p className="text-lg">
                        {token.project}
                    </p>
                </div>
                <div className="inline-block bg-primary rounded-full px-4 py-2 text-xl font-semibold">
                    <span className="text-white font-thin">#{token.token_id}</span>
                </div>
            </div>
            {/* <Metadata brid={brid} project={token.project} collection={token.collection} tokenId={parseInt(token.token_id)} /> */}
        </div>
    </div>
}

export default TokenCard;