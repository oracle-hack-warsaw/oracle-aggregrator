//SPDX-License-Identifier: GPLv3
pragma solidity >=0.8.0 <0.9.0;

import {GOAT} from "./GOAT.sol";

contract MockConsumer {
	GOAT public goat;

	constructor(GOAT goat_) {
		goat = goat_;
	}

	function consumePrice(uint256 tokenId) external view returns(uint256 value, uint256 age) {
		return goat.price(tokenId);
	}
}
