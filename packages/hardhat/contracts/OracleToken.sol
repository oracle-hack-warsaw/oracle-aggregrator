//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import { IERC6982 } from "./IERC6982.sol";
import "erc721a/contracts/ERC721A.sol";

contract OracleToken is ERC721A, IERC6982, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
	mapping(uint256 => address) public tokenIdToTargetContract;
	mapping(uint256 => bool) public tokenIdToLockStatus;
	mapping(uint256 => string) public tokenIdToOracleName;
	mapping(uint256 => string) public tokenIdToTokenPair;
	bool public defaultLockedStatus;


	// TODO: where to store metadata?

    // ========================================
    //     CONSTRUCTOR AND MODIFIER FUNCTIONS
    // ========================================

    constructor() ERC721A("OracleToken", "OT") {
		defaultLockedStatus = false;
		emit DefaultLocked(defaultLockedStatus);
	}

	modifier notLocked(uint256 tokenId) {
    	require(!tokenIdToLockStatus[tokenId]);
    	_;
	}

    // ========================================
    //     VIEW FUNCTIONS
    // ========================================

    function locked(uint256 tokenId) external view returns (bool) {
		return tokenIdToLockStatus[tokenId];
    }

	function defaultLocked() external view returns (bool){
		return defaultLockedStatus;
	}

    // ========================================
    //     CORE FUNCTIONS
    // ========================================

    function safeMint(address to, uint256 quantity, string calldata oracleName, string calldata tokenPair) public onlyOwner {
        //TODO: loop over this
		uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
		tokenIdToOracleName[tokenId] = oracleName;
		tokenIdToTokenPair[tokenId] = tokenPair;
        _safeMint(to, tokenId);
    }

	function lockToken(uint256 tokenId, address targetContract) public onlyOwner {
		tokenIdToTargetContract[tokenId] = targetContract;
		if (targetContract == address(0)) {
			emit Locked(tokenId, false);
		}
		else {
			emit Locked(tokenId, true);
		}
	}

	// Unlocking tokens by calling the lockTokens function to the zero address.
	function unlockToken(uint256 tokenId) public onlyOwner {
		lockToken(tokenId, address(0));
	}


}