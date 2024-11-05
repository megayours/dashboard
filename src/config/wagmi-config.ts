import { getDefaultConfig } from 'connectkit';
import { http, createConfig, cookieStorage, createStorage } from 'wagmi'
import { polygonAmoy } from "wagmi/chains";

// Simple mobile detection
const isMobile = typeof window !== 'undefined' && 
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export function getWagmiConfig() {
    return createConfig(
        getDefaultConfig({
        chains: [polygonAmoy],
        ssr: true,
        storage: createStorage({
            storage: cookieStorage,
        }),
        transports: {
            [polygonAmoy.id]: http(),
        },

         // Required API Keys
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

        // Required App Info
        appName: "MegaYours Dashboard",

        // Optional App Info
        appDescription: "The Web3 Dashboard for all your NFTs",
        appUrl: "https://megayours.com", 
        appIcon: "https://megayours.com/favicon.ico", 
        })
    )
}