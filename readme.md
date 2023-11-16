# Decentralized Document Storage System

This project provides a decentralized solution for document storage utilizing Ethereum, IPFS, and Hardhat for local development. It is used as storage of procedually generated virtual worms, with 30+ neurons.

This project borns as an "answer" to the question of how, after waiting hours for 2 second of worms, how could i find a way to not lose them.

So i started an hypotetical decentralised server, but it didnt work for long, as I was the only person in it haha. 

This means, decentralizations needs adoption for it to work proprerly. This is reflected also with the concept of "pinging", where data is stored till something is storing it, a concept that, if extrapolated from thechnical to biological, it is a bit like the worm that we simulated here. Maybe better than vendor lock-in, maybe worst. Depends for how much important are the data.


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



+------------------+            +-------------------+
|                  |            |                   |
|  Worm Simulation +------------> Local IPFS Node   |
|                  | Upload     |                   |
+--------+---------+ Output     +--------+----------+
         |                                |
         |                                | CID
         |                                |
+--------v---------+            +---------v----------+
|                  |            |                    |
| Hardhat (Local   |            | Ethereum Network   |
| Ethereum Node)   |            | (Smart Contract)   |
|                  <------------+ DocumentVerification |
+--------+---------+ Store CID  +---------+----------+
         |                                |
         |                                |
+--------v---------+            +---------v----------+
|                  |            |                    |
|  Frontend (Web   | Interact   | Users/Participants |
|  Interface)      <------------+                    |
|                  |            |                    |
+------------------+            +--------------------+
