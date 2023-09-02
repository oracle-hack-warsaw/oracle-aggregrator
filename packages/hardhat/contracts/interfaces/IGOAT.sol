//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IGOAT {
    event GOATMinted(address indexed to, uint256[] tokenIds, OracleId[] oracles);

    event OraclesAdded(address[] oracles, OracleProvider providerId);

    enum OracleProvider {
		Chronicle,
		Chainlink
	}

	struct OracleId {
		address oracle;
		OracleProvider providerId;
	}

    function decimals() external view returns(uint8);

    function addChronicles(address[] calldata oracles) external;

    function addChainlinkOracles(address[] calldata oracles) external;

    function price(uint256 tokenId) external view returns(uint256 value, uint256 age);
}