#!/bin/bash

# Clone the OpenWorm repository if it doesn't exist
#!/bin/bash

# Define the directory where openworm is expected to be
OPENWORM_DIR="/home/gia86326/openworm"

# Check if the directory exists
if [ -d "$OPENWORM_DIR" ]; then
  # Navigate to the directory
  cd "$OPENWORM_DIR"
  
  # Check if start.sh is present and executable
  if [ -x "./start.sh" ]; then
    # Execute start.sh
    ./start.sh
  else
    echo "start.sh is not present or not executable in $OPENWORM_DIR."
  fi
else
  echo "The directory $OPENWORM_DIR does not exist."
fi

cd "$OPENWORM_DIR"

# Build the Docker container (optional, can be skipped to use pre-built images)
#./build.sh  # or build.cmd on Windows

# Ensure the Docker container is built. If not, exit the script with an error message.
#if [[ "$(docker images -q openworm/openworm:0.9.3 2> /dev/null)" == "" ]]; then
#  echo "Docker image not found. Exiting..."
#  exit 1
#fi

# Run the simulation with the desired duration
./run.sh #-d [num]  # or run.cmd on Windows

# Wait for the simulation to complete...
#sleep 3000  # Adjust this value based on the expected duration of the simulation

./stop.sh 

# Assuming IPFS is installed and initialized
# Add the contents of the output directory to IPFS
cd openworm/output
CID=$(ipfs add -r . | tail -n1 | cut -d ' ' -f 2)
echo "Content added to IPFS with CID: $CID"

# Store the CID in a smart contract using a Node.js script
node crypto_Cloud/scripts/storeCIDInContract.js $CID


# Save the URL to a text file
echo "http://localhost:8080/ipfs/$CID" > open_url.txt


# Open the uploaded content in the default web browser
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "http://localhost:8080/ipfs/$CID"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    open "http://localhost:8080/ipfs/$CID"
elif [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    start "http://localhost:8080/ipfs/$CID"
else
    echo "Cannot open browser: Unknown OS"
fi
