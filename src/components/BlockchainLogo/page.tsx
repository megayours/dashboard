import Jdenticon from 'react-jdenticon';


const BlockchainLogo = ({ blockchain }: { blockchain: string }) => {
    return (
        <div className="w-10 h-10 bg-gray-200 rounded-full">
            <div className="flex justify-center items-center w-full h-full">
                <Jdenticon size="48" value="blockchain" />
            </div>
        </div>
    )
}

export default BlockchainLogo;