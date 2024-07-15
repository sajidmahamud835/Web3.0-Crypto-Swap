import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

const providerOptions = {
  // Add any provider options here
};

let web3Modal;

if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
  });
}

export async function connectWallet() {
  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  return { provider, signer, address };
}

export async function disconnectWallet() {
  web3Modal.clearCachedProvider();
  window.location.reload();
}

export default web3Modal;