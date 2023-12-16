import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import JerseyMarketplaceABI from './JerseyMarketplaceABI.json';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            const jerseyMarketplaceContract = new web3Instance.eth.Contract(JerseyMarketplaceABI, '0xd9145CCE52D386f254917e481eB44e9943F39138');
            
            setWeb3(web3Instance);
            setContract(jerseyMarketplaceContract);
        } else {
            console.log('Please install MetaMask!');
        }
    }, []);

    return (
        <Web3Context.Provider value={{ web3, contract }}>
            {children}
        </Web3Context.Provider>
    );
};