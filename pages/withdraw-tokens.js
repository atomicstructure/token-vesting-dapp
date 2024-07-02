import { useState } from 'react';
import { ethers } from 'ethers';
import Vesting from '../artifacts/contracts/Vesting.sol/Vesting.json';

const WithdrawTokens = () => {
    const [vestingAddress, setVestingAddress] = useState('');

    const withdrawTokens = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const vesting = new ethers.Contract(vestingAddress, Vesting.abi, signer);

        const tx = await vesting.releaseTokens();
        await tx.wait();
        alert('Tokens withdrawn');
    };

    return (
        <div>
            <h1>Withdraw Tokens</h1>
            <input type="text" value={vestingAddress} onChange={(e) => setVestingAddress(e.target.value)} placeholder="Vesting Contract Address" />
            <button onClick={withdrawTokens}>Withdraw Tokens</button>
        </div>
    );
};

export default WithdrawTokens;