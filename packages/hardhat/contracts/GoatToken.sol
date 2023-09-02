//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC6982 } from "./interfaces/IERC6982.sol";
import { IERC4907 } from "./interfaces/IERC4907.sol";
import {ERC721A} from "erc721a/contracts/ERC721A.sol";

contract GoatToken is ERC721A, IERC6982, IERC4907, Ownable {

	// Mapping to contract which accesses the oracle
	mapping(uint256 => address) public tokenIdToTargetContract;

	// Mapping for locking
	mapping(uint256 => bool) public tokenIdToLockStatus;
	
	// Mapping for renting
	mapping(uint256 => address) public tokenIdToUser;
	mapping(uint256 => uint256) public tokenIdToExpires;

	// On-chain metadata
	mapping(uint256 => string) public tokenIdToOracleName;
	mapping(uint256 => string) public tokenIdToTokenPair;
	bool public defaultLockedStatus;

    uint256 public constant PRICE_PER_TOKEN = 0.01 ether;

    // ========================================
    //     CONSTRUCTOR AND MODIFIER FUNCTIONS
    // ========================================

    constructor() ERC721A("GroundbreakingOracleAggregatorToken", "GOAT") {
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
	
    function userOf(uint256 tokenId) external view returns(address) {
		return tokenIdToUser[tokenId];
	}

    function userExpires(uint256 tokenId) external view returns(uint256){
		return tokenIdToExpires[tokenId];
	}

    // ========================================
    //     CORE FUNCTIONS
    // ========================================

    function safeMint(address to, uint256 quantity, string calldata oracleName, string calldata tokenPair) external payable {
        require(msg.value >= quantity * PRICE_PER_TOKEN, "Insufficient Funds");
		uint256 firstTokenId = _nextTokenId();
		_safeMint(to, quantity);

		// Add metadata for all tokens minted in the batch mint based on nextTokenId before and after minting.
		for (uint256 tokenId = firstTokenId; tokenId < _nextTokenId(); tokenId++) {
			tokenIdToOracleName[tokenId] = oracleName;
			tokenIdToTokenPair[tokenId] = tokenPair;
		}

		// TODO: add picture metadata (oracle logo)
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

	// Renting out an nft 
    function setUser(uint256 tokenId, address user, uint64 expires) external {
		tokenIdToUser[tokenId] = user;
		tokenIdToExpires[tokenId] = expires;
	}

}