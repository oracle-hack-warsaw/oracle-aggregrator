//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IOracleAggregator {
    function decimals() external view returns(uint8);

    function addPriceFeed(address base, address quote, address oracle) external;
    
    function removePriceFeed(address base, address quote, address oracle) external;

    function price(address base, address quote) external view returns(uint256);
}