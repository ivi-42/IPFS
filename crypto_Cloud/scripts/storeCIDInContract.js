// storeCIDInContract.js
const ethers = require('ethers');

// Setup the provider, contract ABI, contract address, and wallet
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const signer = provider.getSigner();
const contractABI = [...]; // Your contract ABI
const contractAddress = 'your_contract_address_here';

async function storeCID(cid) {
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  await contract.storeDocumentCID(cid);
}

const cid = process.argv[2]; // Get CID from the first command-line argument
storeCID(cid).catch(console.error);
