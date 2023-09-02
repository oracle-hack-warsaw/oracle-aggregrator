//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC6982} from "./interfaces/IERC6982.sol";
import {IERC4907} from "./interfaces/IERC4907.sol";
import {ERC721A} from "erc721a/contracts/ERC721A.sol";
import {ERC4907A} from "erc721a/contracts/extensions/ERC4907A.sol";

contract GoatToken is ERC4907A, IERC6982, Ownable {
	using Address for address;

	// Locking data
	bool public immutable defaultLocked;

	// Mapping to contract which accesses the oracle
	mapping(address => uint256) internal targetContractToTokenId;


	// On-chain metadata
	mapping(uint256 => string) public tokenIdToOracleName;
	mapping(uint256 => string) public tokenIdToTokenPair;

    uint256 public constant PRICE_PER_TOKEN = 0.01 ether;

    // ========================================
    //     CONSTRUCTOR AND MODIFIER FUNCTIONS
    // ========================================

    constructor() ERC721A("Groundbreaking Oracle Aggregator Technology", "GOAT") {
		defaultLocked = false;
		emit DefaultLocked(false);
	}

    // ========================================
    //     VIEW FUNCTIONS
    // ========================================

    function locked(uint256 tokenId) public view returns (bool) {
		return userOf(tokenId) != address(0);
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

	/// @notice Renting out an nft to a smart contract.
	/// @dev If target contract is address(0), then the token is removed from renting.
    function setUser(uint256 tokenId, address targetContract, uint64 expires) public override {
		if (targetContract != address(0)){
			_lockToken(tokenId, targetContract);
		} else {
			_unlockToken(tokenId);
		}
	
		super.setUser(tokenId, targetContract, expires);
	}

	function _lockToken(uint256 tokenId, address targetContract) internal {
		require(targetContract.isContract(), "User must be a contract");
		targetContractToTokenId[targetContract] = tokenId;
		emit Locked(tokenId, true);
	}

	function _unlockToken(uint256 tokenId) internal {
		address targetContract = _explicitUserOf(tokenId);
		if(targetContract != address(0)){
			delete targetContractToTokenId[targetContract];
			emit Locked(tokenId, false);
		}
	}

	 function _beforeTokenTransfers(
        address,
        address,
        uint256 startTokenId,
        uint256 quantity
    ) internal view override {
		for (uint256 tokenId = startTokenId; tokenId < startTokenId + quantity; tokenId++) {
			require(!locked(tokenId), "Token is locked");
		}
	}
}