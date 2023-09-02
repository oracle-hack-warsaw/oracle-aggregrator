//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IGOAT {
    event GOATMinted(address indexed to, uint256[] tokenIds, address[] oracles);

    function decimals() external view returns(uint8);

    function addChronicles(address[] calldata oracles) external;

    function addChainlinkOracles(address[] calldata oracles) external;

    function price(uint256 tokenId) external view returns(uint256);
}