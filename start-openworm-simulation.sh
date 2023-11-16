#!/bin/bash

# Clone the OpenWorm repository
git clone http://github.com/openworm/openworm
cd openworm

# Build the Docker container (optional, can be skipped to use pre-built images)
./build.sh  # or build.cmd on Windows

# Run the simulation with the desired duration
# Replace [num] with the duration in milliseconds, e.g., 5000 for 5 seconds
./run.sh -d [num]  # or run.cmd on Windows

# Wait for the simulation to complete...
# This would need to be determined. As a placeholder, using sleep for a period longer than the simulation run time
sleep [duration_in_seconds]

# The simulation has completed at this point, and output should be in the "output" directory

# Assuming IPFS is installed and initialized
# Navigate to the output directory and add the contents to IPFS
cd output
ipfs add -r . 

# The above command will print out the CID of the uploaded content
# You can capture this output and use it as needed, for example:

CID=$(ipfs add -r . | tail -n1 | cut -d ' ' -f 2)
echo "Content added to IPFS with CID: $CID"

# If you want to store the CID in a smart contract, you could then call a script to do this
# You would need a script that uses web3.js or ethers.js to interact with your contract
# Assuming you have such a script set up, you might call it like this:

node storeCIDInContract.js $CID

# storeCIDInContract.js would be a Node.js script that takes a CID as an argument and stores it in a smart contract
