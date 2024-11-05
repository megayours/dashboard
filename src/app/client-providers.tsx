"use client"


import {
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React, { useState } from "react";
import type { PropsWithChildren } from "react";
import type { State as WagmiState } from "wagmi";
import { WagmiProvider } from "wagmi";
import { getWagmiConfig } from "@/config/wagmi-config";
import { ConnectKitProvider } from "connectkit";


const makeQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },

    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) => {
        const mutationKey =
          typeof mutation.options.mutationKey?.[0] === "string"
            ? mutation.options.mutationKey[0]
            : "unknown";

        if (process.env.NODE_ENV === "development") {
          console.error(
            `[mutation error for mutationKey ${mutationKey}]`,
            error,
            mutation,
          );
        }
      },
    }),

    queryCache: new QueryCache({
      onError: (error, query) => {
        const queryKey =
          typeof query.queryKey[0] === "string" ? query.queryKey[0] : "unknown";

        if (process.env.NODE_ENV === "development") {
          console.error(`[query error for queryKey ${queryKey}]`, error, query);
        }
      },
    }),
  });

let browserQueryClient: QueryClient | undefined;

const getQueryClient = (): QueryClient => {
  if (isServer) {
    // Server: always make a new query client

    return makeQueryClient();
  }

  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
};

type ClientProviderProps = {
    initialState?: WagmiState | undefined;
};


export const ClientProviders = ({ children, initialState }: ClientProviderProps & PropsWithChildren) => {


  const [wagmiConfig] = useState(() => getWagmiConfig())


  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
       <QueryClientProvider client={queryClient}>
          <ConnectKitProvider 
            options={{
              enforceSupportedChains: true,
              initialChainId: wagmiConfig.chains[0].id,
              overlayBlur: 0,
            }}
          >
            {children}
          </ConnectKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
  )
}
