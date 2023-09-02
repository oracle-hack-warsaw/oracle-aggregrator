# 🐐 G.O.A.T.

Groundbreaking Oracle Aggregator Technology (in short, GOAT) is a decentralized oracle aggregator service. GOAT allows token holders access to selected oracles. Users can mint or rent an NFT, which then can be connected to a smart contract to access the oracle's data feeds. This solution is innovative as it allows end users to access different oracle providers trough a single source (GOAT).

⚙️ Built using Solidity, NextJS, Hardhat, and Typescript.

- 📃 **Smart contracts**: Using ERC721A, ERC4907A and ERC6982.
- 🔮 **Connected to oracles**: End users can access different oracles via GOAT.
- 💰 **Fair pricing for oracle providers**: GOAT's demand based pricing will make sure providers will receive a fair market price.

## Contents

- [Deployment](#deployment)
- [Contracts addresses](#contracts-addresses)
- [Links](#links)
- [Team](#team)

## Deployment

To deploy 
```yarn hardhat deploy-goat --oracle-config C:\git\oracle-aggregrator\packages\hardhat\oracles\sepolia.json --network <NETWORK_NAME>```

To verify
```yarn hardhat verify <GOAT_ADDRESS> --network <NETWORK_NAME>```

Execute minting script
```yarn hardhat mint --goat <GOAT_ADDRESS> --oracle-provider 0 --oracle <ORACLE_ADDRESS> --network <NETWORK_NAME>```

## Contracts addresses

- [Ethereum Sepolia](https://sepolia.etherscan.io/address/0x085039d9644736b5970ae5BeE3B1DD56D00A9f0B)
- [Mantle testnet](https://explorer.testnet.mantle.xyz/address/0x385d55e3e0cE503526380b40523f41D8290B4793)
- [Celo testnet](https://alfajores.celoscan.io/address/0x82C993811B40609c5Dc3380E7Eb8c4BcAc42D46c)

## Links

- [devpost](https://devpost.com/software/oracle-aggregator)
- [presentation slides](https://docs.google.com/presentation/d/1VX5CuagIlJY3jI_LOm5ACR58CmpsCqlnDqI-QlLJnHw)
- [demo video](youtube.com)

## Team

This project was build at EthWarsaw 2023 by:

- [Alexe Spataru](twitter.com/urataps/)
- [arjanjohan](twitter.com/arjanjohan/)
- [Aleksander Wójcik](twitter.com/aleksan64074481)
