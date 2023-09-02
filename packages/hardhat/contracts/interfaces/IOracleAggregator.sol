//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IOracleAggregator {
    function price(uint256 tokenId) external view returns (uint256);
}