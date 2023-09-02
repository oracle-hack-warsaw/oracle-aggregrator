//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC6982} from "./interfaces/IERC6982.sol";
import {ERC721A} from "erc721a/contracts/ERC721A.sol";
import {ERC4907A} from "erc721a/contracts/extensions/ERC4907A.sol";
import {IGOAT} from "./interfaces/IGOAT.sol";

contract GOAT is IGOAT, IERC6982, ERC4907A, Ownable {
	using Address for address;

	// Locking data
	bool public immutable defaultLocked;

	// On-chain metadata
	mapping(uint256 => address) public tokenIdToOracle;

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

	function decimals() public pure override returns(uint8) {
		return 18;
	}

    function price(uint256 tokenId) external view returns(uint256){
		// todo:
	}

    function addChainlinkOracles(address[] calldata oracles) external {
		// todo:
	}

	function addChronicles(address[] calldata oracles) external {
		// todo:
	}

    // ========================================
    //     CORE FUNCTIONS
    // ========================================

    function mintGOAT(address to, address[] calldata oracles) external payable returns(uint256[] memory tokenIds) {
        require(msg.value >= PRICE_PER_TOKEN, "Insufficient Funds");
		uint256 startTokenId = _nextTokenId();
		uint256 quantity = oracles.length;
		_safeMint(to, quantity);

		for (uint256 i = 0; i < quantity; i++) {
			uint256 tokenId = startTokenId + i;
			tokenIds[i] = tokenId;
			tokenIdToOracle[tokenId] = oracles[i];
		}
	

		// TODO: add picture metadata (oracle logo)
		// TODO: emit event
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
		emit Locked(tokenId, true);
	}

	function _unlockToken(uint256 tokenId) internal {
		emit Locked(tokenId, false);
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