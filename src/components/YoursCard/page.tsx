import FishingGame from "../FishingGame/page";
import BattleGame from "../BattleGame/page";


const YoursCard = ({chain, amoyContract, tokenId, owner}: {chain: string, amoyContract: string, tokenId: number, owner: string}) => {
    return <div className="container mx-auto space-y-8">
        <FishingGame chain={chain} amoyContract={amoyContract} tokenId={tokenId} owner={owner} />
        <div className="my-8"></div>
        <BattleGame chain={chain} amoyContract={amoyContract} tokenId={tokenId} owner={owner} />
    </div>
}

export default YoursCard;