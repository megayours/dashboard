import FishingGame from "../FishingGame/page";
import BattleGame from "../BattleGame/page";


const YoursCard = ({chain, amoyContract, tokenId, owner, project, collection}: {chain: string, amoyContract: string, tokenId: number, owner: string, project: string, collection: string}) => {
    return <div className="container mx-auto space-y-8">
        <FishingGame chain={chain} amoyContract={amoyContract} tokenId={tokenId} owner={owner} project={project} collection={collection} />
        <div className="my-8"></div>
        <BattleGame chain={chain} amoyContract={amoyContract} tokenId={tokenId} owner={owner} project={project} collection={collection} />
    </div>
}

export default YoursCard;