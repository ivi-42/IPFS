// Import the ethers library from a CDN
import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers/dist/ethers.esm.min.js';

// Access the IPFS HTTP client from the global scope
const ipfs = window.IpfsHttpClient.create({ host: 'localhost', port: '5001', protocol: 'http' });



// Connect to the local Hardhat node
const provider = new ethers.providers.JsonRpcProvider();
// ABI of the address
const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "hash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "DocumentAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "DocumentDeleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "rating",
          "type": "uint256"
        }
      ],
      "name": "DocumentRated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "newHash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "DocumentUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newReputation",
          "type": "uint256"
        }
      ],
      "name": "ReputationChanged",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_hash",
          "type": "string"
        }
      ],
      "name": "addDocument",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "deleteDocument",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "documentRatings",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "documentVersions",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "documents",
      "outputs": [
        {
          "internalType": "string",
          "name": "hash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isDeleted",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getDocument",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_version",
          "type": "uint256"
        }
      ],
      "name": "getDocumentVersion",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getUserReputation",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lastDocumentId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_rating",
          "type": "uint256"
        }
      ],
      "name": "rateDocument",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_newHash",
          "type": "string"
        }
      ],
      "name": "updateDocument",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userReputation",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
];

// Function to update the status message
function updateStatusMessage(message) {
    const statusMessageElement = document.getElementById('statusMessage');
    statusMessageElement.textContent = message;
}



const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

//the contract address changes, not permanent as its local hardhat


// Create a signer from the provider
const signer = provider.getSigner();

// Create a new instance of the contract
const documentContract = new ethers.Contract(contractAddress, contractABI, signer);

// Event listener for the file upload button
document.getElementById('uploadButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        console.log('Uploading file:', file.name);
        updateStatusMessage('Uploading file...');
        
        try {
            const fileHash = await uploadToIPFS(file);
            console.log(`File uploaded to IPFS with hash: ${fileHash}`);
            updateStatusMessage(`File uploaded. IPFS Hash: ${fileHash}`);
            
            // Call smart contract to store the CID
            const tx = await documentContract.addDocument(fileHash);
            console.log(`Transaction sent. Waiting for confirmation...`);
            await tx.wait();
            console.log(`Document hash stored in smart contract: ${tx.hash}`);
            updateStatusMessage(`Document hash stored in smart contract: ${tx.hash}`);
        } catch (error) {
            console.error('File upload failed:', error);
            updateStatusMessage(`File upload failed: ${error.message}`);
        }
    } else {
        alert('Please select a file to upload.');
        updateStatusMessage('No file selected.');
    }
});

async function uploadToIPFS(file) {
    try {
        const addedFile = await ipfs.add(file);
        const fileHash = addedFile.cid.toString();
        return fileHash;
    } catch (error) {
        console.error('Error uploading file to IPFS:', error);
        throw error;
    }
}
