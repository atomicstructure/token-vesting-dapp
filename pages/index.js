import { useState } from 'react';
import { ethers } from 'ethers';

const ConnectWallet = () => {
    const [walletAddress, setWalletAddress] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setWalletAddress(accounts[0]);
        } else {
            alert('MetaMask is not installed');
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            {walletAddress && <p>Connected: {walletAddress}</p>}
        </div>
    );
};

export default function Home() {
    return (
        <div>
            <h1>Token Vesting DApp</h1>
            <ConnectWallet />
        </div>
    );
}
