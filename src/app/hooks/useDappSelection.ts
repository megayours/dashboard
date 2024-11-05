import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dapps from '@/config/dapps';
import { yoursProtocolQueries } from './useYoursProtocol';

export interface Dapp {
  name: string;
  blockchainRid: string;
  enabled?: boolean;
}

// Query key for enabled dapps
export const dappQueries = {
  ENABLED_DAPPS: 'enabledDapps'
};

export function useDappSelection() {
  const queryClient = useQueryClient();

  // Query to get enabled dapps state
  const { data: enabledDapps = {} } = useQuery({
    queryKey: [dappQueries.ENABLED_DAPPS],
    queryFn: () => {
      // Initialize with all dapps enabled
      return dapps.chains.reduce((acc, chain) => ({
        ...acc,
        [chain.blockchainRid]: true
      }), {} as Record<string, boolean>);
    },
    staleTime: Infinity,
  });

  // Get all available dapps
  const availableDapps = useMemo(() => dapps.chains, []);

  // Get only enabled dapps
  const selectedDapps = useMemo(() => {
    return availableDapps.filter(chain => enabledDapps[chain.blockchainRid]);
  }, [availableDapps, enabledDapps]);

  // Mutation to update enabled dapps
  const { mutate: updateEnabledDapps } = useMutation({
    mutationFn: (newEnabledDapps: Record<string, boolean>) => {
      return Promise.resolve(newEnabledDapps);
    },
    onSuccess: (newEnabledDapps) => {
      queryClient.setQueryData([dappQueries.ENABLED_DAPPS], newEnabledDapps);
      // Invalidate and refetch tokens when dapp selection changes
      queryClient.invalidateQueries({ 
        queryKey: [yoursProtocolQueries.TOKENS],
        refetchType: 'active'
      });
    },
  });

  // Toggle single dapp
  const toggleDapp = (blockchainRid: string) => {
    updateEnabledDapps({
      ...enabledDapps,
      [blockchainRid]: !enabledDapps[blockchainRid]
    });
  };

  // Enable single dapp
  const enableDapp = (blockchainRid: string) => {
    updateEnabledDapps({
      ...enabledDapps,
      [blockchainRid]: true
    });
  };

  // Disable single dapp
  const disableDapp = (blockchainRid: string) => {
    updateEnabledDapps({
      ...enabledDapps,
      [blockchainRid]: false
    });
  };

  // Enable all dapps
  const enableAllDapps = () => {
    const allEnabled = availableDapps.reduce((acc, chain) => ({
      ...acc,
      [chain.blockchainRid]: true
    }), {});
    updateEnabledDapps(allEnabled);
  };

  // Disable all dapps
  const disableAllDapps = () => {
    const allDisabled = availableDapps.reduce((acc, chain) => ({
      ...acc,
      [chain.blockchainRid]: false
    }), {});
    updateEnabledDapps(allDisabled);
  };

  return {
    availableDapps,
    selectedDapps,
    isDappEnabled: (blockchainRid: string) => enabledDapps[blockchainRid],
    toggleDapp,
    enableDapp,
    disableDapp,
    enableAllDapps,
    disableAllDapps
  };
} 