import { useState } from 'react';
import { ethers } from 'ethers';
import OrganizationFactory from '../artifacts/contracts/OrganizationFactory.sol/OrganizationFactory.json';

const RegisterOrg = () => {
    const [tokenAddress, setTokenAddress] = useState('');

    const registerOrg = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const orgFactory = new ethers.Contract('<OrganizationFactoryAddress>', OrganizationFactory.abi, signer);

        const tx = await orgFactory.registerOrganization(tokenAddress);
        await tx.wait();
        alert('Organization registered');
    };

    return (
        <div>
            <h1>Register Organization</h1>
            <input type="text" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} placeholder="Token Address" />
            <button onClick={registerOrg}>Register Organization</button>
        </div>
    );
};

export default RegisterOrg;
