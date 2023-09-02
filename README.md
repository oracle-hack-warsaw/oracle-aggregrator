# 🐐 G.O.A.T.

Groundbreaking Oracle Aggregator Technology (in short, GOAT) is a tokenized oracle aggregator service that allows token holders access to selected oracles using a single source. In this way, oracle protocols can monetize their data providing services and users can mint or rent an NFT, which then can be connected to a smart contract to access the oracle's data feeds. This solution is innovative as it opens up a marketplace of decentralized data providers and allows for different mechanics such as time-limited renting, trust-based supply management, hierarchical oracle aggregation (ERC-6150).

⚙️ Built using Solidity, NextJS, Hardhat, and Typescript.

- 📃 **Smart contracts**: Using ERC721A, ERC4907A and ERC6982.
- 🔮 **Connected to oracles**: End users can access different oracles in one place (i.e. GOAT smart contract).
- 💰 **Fair pricing for oracle providers**: GOAT's demand based pricing will make sure providers will receive a fair market price.
- 🖼️ **NFT-based access** Trade or rent different data feeds from various providers on NFT marketplaces.

## Contents

- [Hackathon bounties](#hackathon-bounties)
- [Deployment](#deployment)
- [Contracts addresses](#contracts-addresses)
- [Links](#links)
- [Team](#team)

## Hackathon bounties

#### Chronicle

- Our use-case is innovative and interesting for Chronicle Protocol as it provides oracle providers a way to monetize their services in a fair and demand-based way. Also it makes it oracles more accessible, aggregating them in a single place is a huge UX improvement for users. Chronicle Oracle is integrated into project using Oracles on Sepolia.
- [Chronicle integrated in smart contract deployed on Ethereum Sepolia testnet](https://twitter.com/arjanjohan/status/1698071677416972377)

#### Mantle

- [Post on Twitter mentioning @0xMantle](https://twitter.com/arjanjohan/status/1698071677416972377)
- [Smart contract on Mantle testnet](https://explorer.testnet.mantle.xyz/address/0x385d55e3e0cE503526380b40523f41D8290B4793)
- Aiming for Build on Mantle, Best Defi Project and Best UX

#### Celo

- [Smart contract on Celo testnet](https://alfajores.celoscan.io/address/0x82C993811B40609c5Dc3380E7Eb8c4BcAc42D46c)
- Aiming for First, Second, Third Best dApp Building Solutions for Real World Usecases - deployed in Celo

## Deployment

To deploy

`yarn hardhat deploy-goat --oracle-config C:\git\oracle-aggregrator\packages\hardhat\oracles\sepolia.json --network <NETWORK_NAME>`

To verify

`yarn hardhat verify <GOAT_ADDRESS> --network <NETWORK_NAME>`

Execute minting script

`yarn hardhat mint --goat <GOAT_ADDRESS> --oracle-provider 0 --oracle <ORACLE_ADDRESS> --network <NETWORK_NAME>`

## Contracts addresses

- [Ethereum Sepolia](https://sepolia.etherscan.io/address/0x085039d9644736b5970ae5BeE3B1DD56D00A9f0B)
- [Mantle testnet](https://explorer.testnet.mantle.xyz/address/0x385d55e3e0cE503526380b40523f41D8290B4793)
- [Celo testnet](https://alfajores.celoscan.io/address/0x82C993811B40609c5Dc3380E7Eb8c4BcAc42D46c)

## Links

- [devpost](https://devpost.com/software/oracle-aggregator)
- [presentation slides](https://docs.google.com/presentation/d/1VX5CuagIlJY3jI_LOm5ACR58CmpsCqlnDqI-QlLJnHw)
- [demo video: TODO](youtube.com)
- [vercel live app](https://oracle-aggregrator-nextjs-aleksanderw1992-hackathon-warsaw-2023.vercel.app)

## Team

This project was build at EthWarsaw 2023 by:

- [Alexe Spataru](twitter.com/urataps/)
- [arjanjohan](twitter.com/arjanjohan/)
- [Aleksander Wójcik](linkedin.com/in/aleksanderwojcik/)

## License

This project is licensed using GPLv3. The project is initialized using Scaffold-ETH 2 by BuidlGuidl.
