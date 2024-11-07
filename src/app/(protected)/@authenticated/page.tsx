"use client"

import { ConnectKitButton } from "connectkit";
import { useDappSelection } from "@/app/hooks/useDappSelection";
import { useYoursProtocol } from "@/app/hooks/useYoursProtocol";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Dapp } from "@/app/hooks/useDappSelection";
import Link from 'next/link';

import TokenAvatar from "@/components/TokenAvatar/page";
import BlockchainLogo from "@/components/BlockchainLogo/page";
// Create a client
const queryClient = new QueryClient();

// Wrap the actual page content
function AuthenticatedContent() {
    const {
        availableDapps,
        selectedDapps,
        toggleDapp,
        isDappEnabled,
        enableAllDapps,
        disableAllDapps
    } = useDappSelection();

    const { tokens, isLoading } = useYoursProtocol();

    console.log('tokens', tokens);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Dapps & Tokens</h1>
                <ConnectKitButton />
            </div>
            
            <div>
                <h1 className="text-xl font-semibold mb-4">Your Tokens</h1>
                <div >
                    {tokens.map((token,i) =>{
                        return (
                            <Link key={token.yours.project.name+"_"+i} href={`/token/blockchainrid/${token.yours.project.blockchain_rid.toString('hex')}`} className="flex items-center p-4 rounded-lg shadow-md mb-4">
                                <div className="flex-shrink-0 h-full">
                                    <TokenAvatar image={token.properties?.image} alt={token.name} />
                                </div>
                                <div className="ml-4 flex-grow flex flex-col">
                                    <span className="text-lg font-semibold">{token.name}</span>
                                    <span className="text-sm text-gray-600">{token.yours.project.name}</span>
                                </div>
                                <div className="flex-shrink-0 h-full">
                                    <BlockchainLogo blockchain={token.yours.project.blockchain_rid.toString('hex')} />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
            
            {/* Dapps Selection Section */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Available Dapps</h2>
                <div className="flex gap-2 mb-4">
                    <button 
                        onClick={enableAllDapps}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Enable All
                    </button>
                    <button 
                        onClick={disableAllDapps}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Disable All
                    </button>
                </div>
                
                <div className="space-y-2">
                    {availableDapps.map((dapp: Dapp) => (
                        <div key={dapp.blockchainRid} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id={dapp.blockchainRid}
                                checked={isDappEnabled(dapp.blockchainRid)}
                                onChange={() => toggleDapp(dapp.blockchainRid)}
                                className="w-4 h-4"
                            />
                            <label htmlFor={dapp.blockchainRid} className="text-sm">
                                {dapp.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tokens Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Your Tokens</h2>
                {isLoading ? (
                    <div className="text-gray-500">Loading tokens...</div>
                ) : tokens.length === 0 ? (
                    <div className="text-gray-500">No tokens found</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tokens.map((token, index) => (
                            <div 
                                key={`${token.yours.project.name}-${token.yours.collection}-${index}`}
                                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <h3 className="font-semibold text-lg">{token.name}</h3>
                                <div className="text-sm text-gray-600 mt-2">
                                    <p>Project: {token.yours.project.name}</p>
                                    <p>Collection: {token.yours.collection}</p>
                                </div>
                                {Object.entries(token.properties).length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-sm font-medium">Properties:</p>
                                        <div className="text-sm text-gray-600">
                                            {Object.entries(token.properties).map(([key, value]) => (
                                                <p key={key}>
                                                    {key}: {String(value)}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Export the wrapped component
export default function AuthenticatedPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthenticatedContent />
        </QueryClientProvider>
    );
}