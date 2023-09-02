//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IGOAT {
    event GOATsMinted(address indexed to, uint256[] tokenIds, OracleId[] oracles);

    event OraclesAdded(address[] oracles, OracleProvider providerId);

    enum OracleProvider {
		Chronicle,
		Chainlink
	}

	struct OracleId {
		address oracle;
		OracleProvider providerId;
	}

    function mintGOAT(address to, OracleId[] calldata oracles) external payable returns(uint256[] memory tokenIds);

    function addOracles(OracleProvider providerId, address[] calldata oracles) external;

    function decimals() external view returns(uint8);

    function providerOracles(OracleProvider providerId) external view returns(address[] memory);

    function price(uint256 tokenId) external view returns(uint256 value, uint256 age);
}