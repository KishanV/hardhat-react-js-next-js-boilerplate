export function getNetworkUrl(chainId?: number) {
  if (chainId === 42) {
    return `https://kovan.etherscan.io/`;
  } else if (chainId === 3) {
    return `http://ropsten.etherscan.io/`;
  } else if (chainId === 1 || chainId === undefined) {
    return `http://etherscan.io/`;
  }
}

export function openTokenUrl(tokenAddress: string, chainId?: number) {
  const networkUrl = getNetworkUrl(chainId);
  window.open(`${networkUrl}token/${tokenAddress}`, "_blank");
}

export function openAddressUrl(tokenAddress: string, chainId?: number) {
  const networkUrl = getNetworkUrl(chainId);
  window.open(`${networkUrl}address/${tokenAddress}`, "_blank");
}
