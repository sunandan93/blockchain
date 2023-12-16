import React, { useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import Navbar from './components/Navbar';
import JerseyCard from './components/JerseyCard';
import JerseyMarketplaceABI from './blockchain/JerseyMarketplaceABI.json';
import './App.css';

function App() {
    const [web3, setWeb3] = useState(null);
    const [jerseyMarketplaceContract, setJerseyMarketplaceContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [ethBalance, setEthBalance] = useState('0');

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            const contract = new web3Instance.eth.Contract(JerseyMarketplaceABI, '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8');
            setWeb3(web3Instance);
            setJerseyMarketplaceContract(contract);
            fetchEthBalance(web3Instance, '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8');
        } else {
            console.log('Please install MetaMask!');
        }
    }, []);
    const fetchEthBalance = async (web3, address) => {
      try {
          const balanceWei = await web3.eth.getBalance(address);
          const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
          setEthBalance(balanceEth);
      } catch (error) {
          console.error('Error fetching ETH balance:', error);
      }
  };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                console.log('Connected', accounts[0]);
            } catch (error) {
                console.error('Error connecting to MetaMask', error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app.');
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                setAccount(accounts[0] || null);
            });
        }
    }, []);

    

    const purchaseJersey = async (jerseyId, price) => {
      if (!account) {
          alert("Please connect your wallet to purchase a jersey.");
          return;
      }
  
      if (!jerseyMarketplaceContract) {
          console.log("Contract not loaded");
          return;
      }
  
      try {
          const priceInWei = web3.utils.toWei(price.toString(), 'ether');
          await jerseyMarketplaceContract.methods.purchaseJersey(jerseyId).send({ from: account, value: priceInWei });
          console.log(`Jersey ${jerseyId} purchased for ${price} ETH`);
      } catch (error) {
          console.error("Error purchasing jersey:", error);
      }
  };
  


    const fetchJerseys = useCallback(async () => {
        if (!jerseyMarketplaceContract) {
            console.log("Contract not loaded");
            return;
        }

        try {
            const jerseysData = await jerseyMarketplaceContract.methods.getAllJerseys().call();
            console.log(jerseysData); // Update this part to set the jerseys in your state
        } catch (error) {
            console.error("Error fetching jerseys:", error);
        }
    }, [jerseyMarketplaceContract]);

    useEffect(() => {
        fetchJerseys();
    }, [fetchJerseys]);

    // Dummy jersey data, replace with state variable if fetching from contract
		const jerseys = [
			{ id: 1, name: 'Jersey 1', price: '0.01 ETH', imageUrl: '/images/jersey1.jpg' },
			{ id: 2, name: 'Jersey 2', price: '0.02 ETH', imageUrl: '/images/jersey2.jpg' },
			{ id: 3, name: 'Jersey 3', price: '0.03 ETH', imageUrl: '/images/jersey3.jpg' },
      { id: 4, name: 'Jersey 4', price: '0.01 ETH', imageUrl: '/images/jersey4.jpg' },
      { id: 5, name: 'Jersey 5', price: '0.06 ETH', imageUrl: '/images/jersey5.jpg' },
      { id: 6, name: 'Jersey 6', price: '0.03 ETH', imageUrl: '/images/jersey6.jpg' },
      { id: 7, name: 'Jersey 7', price: '0.01 ETH', imageUrl: '/images/jersey7.jpg' },
      { id: 8, name: 'Jersey 8', price: '0.03 ETH', imageUrl: '/images/jersey8.jpg' },
      { id: 9, name: 'Jersey 9', price: '0.09 ETH', imageUrl: '/images/jersey9.jpg' },
      { id: 10, name: 'Jersey 10', price: '0.01 ETH', imageUrl: '/images/jersey10.jpg' },
      { id: 11, name: 'Jersey 11', price: '0.02 ETH', imageUrl: '/images/jersey11.jpg' },
      { id: 12, name: 'Jersey 12', price: '0.06 ETH', imageUrl: '/images/jersey12.jpg' },
		];

    return (
        <div className="App">
            <Navbar />
            {!account && <button onClick={connectWallet} className="connect-wallet-button">Connect Wallet</button>}
            {account && <p>Connected Account: {account}</p>}
            <p>ETH Balance of 0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8: {ethBalance} ETH</p>
            
            <div className="jersey-container">
                {jerseys.map(jersey => (
                    <JerseyCard 
                        key={jersey.id} 
                        jersey={jersey} 
                        purchaseJerseyFunction={purchaseJersey} 
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
