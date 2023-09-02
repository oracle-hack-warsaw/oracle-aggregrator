//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import { IERC6982 } from "./IERC6982.sol";

contract OracleToken is ERC721, IERC6982, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

	mapping(uint256 => address) public tokenIdToTargetContract;
	mapping(uint256 => bool) public tokenIdToLockStatus;

    constructor() ERC721("OracleToken", "OT") {}


	modifier notLocked(uint256 tokenId) {
    	require(!tokenIdToLockStatus[tokenId]);
    	_;
	}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function locked(uint256 tokenId) external view returns (bool) {
		//todo: get boolean from mapping
      return false;
    }

	function defaultLocked() external view returns (bool){
		//TODO: store default somewhere
		return false;
	}

	function lockToken(uint256 tokenId, address targetContract) public onlyOwner notLocked(tokenId) {
		tokenIdToTargetContract[tokenId] = targetContract;
		if (targetContract == address(0)) {
			//emit unlock event
		}
		else {
			//emit lock event
		}
	}

	// Unlocking tokens by calling the lockTokens function to the zero address.
	function unlockToken(uint256 tokenId) public onlyOwner {
		lockToken(tokenId, address(0));
	}


}