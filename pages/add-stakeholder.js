import { useState } from 'react';
import { ethers } from 'ethers';
import Vesting from '../artifacts/contracts/Vesting.sol/Vesting.json';

const AddStakeholder = () => {
    const [vestingAddress, setVestingAddress] = useState('');
    const [stakeholder, setStakeholder] = useState('');
    const [amount, setAmount] = useState('');
    const [releaseTime, setReleaseTime] = useState('');

    const addStakeholder = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const vesting = new ethers.Contract(vestingAddress, Vesting.abi, signer);

        const tx = await vesting.addStakeholder(stakeholder, ethers.utils.parseUnits(amount, 18), Math.floor(new Date(releaseTime).getTime() / 1000));
        await tx.wait();
        alert('Stakeholder added');
    };

    return (
        <div>
            <h1>Add Stakeholder</h1>
            <input type="text" value={vestingAddress} onChange={(e) => setVestingAddress(e.target.value)} placeholder="Vesting Contract Address" />
            <input type="text" value={stakeholder} onChange={(e) => setStakeholder(e.target.value)} placeholder="Stakeholder Address" />
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
            <input type="datetime-local" value={releaseTime} onChange={(e) => setReleaseTime(e.target.value)} />
            <button onClick={addStakeholder}>Add Stakeholder</button>
        </div>
    );
};

export default AddStakeholder;
