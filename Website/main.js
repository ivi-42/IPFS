// Access IpfsHttpClient from the global scope
const ipfs = window.IpfsHttpClient.create({ host: 'localhost', port: '5001', protocol: 'http' });

document.getElementById('uploadButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        try {
            const fileHash = await uploadToIPFS(file);
            console.log(`File uploaded to IPFS with hash: ${fileHash}`);
            // Call smart contract to store the CID here
        } catch (error) {
            alert(`File upload failed: ${error.message}`);
        }
    } else {
        alert('Please select a file to upload.');
    }
});

async function uploadToIPFS(file) {
    try {
        const addedFile = await ipfs.add(file);
        const fileHash = addedFile.cid.toString();
        return fileHash;
    } catch (error) {
        console.error('Error uploading file to IPFS', error);
        throw error;
    }
}
