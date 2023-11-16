# Decentralized Document Storage System

This project provides a decentralized solution for document storage utilizing Ethereum, IPFS, and Hardhat for local development. It is used as storage of procedually generated virtual worms, with 30+ neurons.

## Directory Structure

- `Website`: Contains the frontend HTML and JavaScript files.
- `crypto_Cloud`: Contains the Hardhat project with smart contracts, deployment scripts, and tests.

## Getting Started

To get the system running, follow these steps:

### Prerequisites

- Install Node.js and npm
- Install Hardhat
- Run a local IPFS node
- Start the script start.sh

The script, it is linked with the start of another project, (https://github.com/openworm) that after will be downloaded and uploaded into IPFS (locally for demostration purpose)

### Running the Project

1. **Compile and Deploy Contracts**

Navigate to the `crypto_Cloud` directory and run:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
