const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient.create({ host: 'localhost', port: '5001', protocol: 'http' });


document.getElementById('uploadButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        try {
            const fileHash = await uploadToIPFS(file);
            console.log(`File uploaded to IPFS with hash: ${fileHash}`);
            // Here you might also want to call your smart contract to store the CID
        } catch (error) {
            alert(`File upload failed: ${error.message}`);
        }
    } else {
        alert('Please select a file to upload.');
    }
});

// Placeholder function for uploadToIPFS, this should be replaced with your actual IPFS upload logic.
async function uploadToIPFS(file) {
    const ipfsClient = require('ipfs-http-client');
    const ipfs = ipfsClient.create({ host: 'localhost', port: '5001', protocol: 'http' });

    try {
        const addedFile = await ipfs.add(file);
        const fileHash = addedFile.cid.toString();
        return fileHash;
    } catch (error) {
        console.error('Error uploading file to IPFS', error);
        throw error;
    }
}