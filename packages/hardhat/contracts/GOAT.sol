//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC6982} from "./interfaces/IERC6982.sol";
import {ERC721A} from "erc721a/contracts/ERC721A.sol";
import {ERC4907A} from "erc721a/contracts/extensions/ERC4907A.sol";
import {IGOAT} from "./interfaces/IGOAT.sol";
import {IChronicle} from "./interfaces/IChronicle.sol";
import {IChainlinkOracle} from "./interfaces/IChainlinkOracle.sol";

contract GOAT is IGOAT, IERC6982, ERC4907A, Ownable {
	using Address for address;
	using EnumerableSet for EnumerableSet.AddressSet;

	// Locking data
	bool public immutable defaultLocked;
    uint256 public constant PRICE_PER_TOKEN = 0.01 ether;

	mapping(OracleProvider => EnumerableSet.AddressSet) private _oracles;

	// On-chain metadata
	mapping(uint256 => OracleId) public tokenIdToOracle;

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

	function decimals() public pure returns(uint8) {
		return 18;
	}

	function providerOracles(OracleProvider providerId) public view returns(address[] memory) {
		return _oracles[providerId].values();
	}

    function price(uint256 tokenId) external view returns(uint256, uint256) {
		require(userOf(tokenId) == msg.sender, "Caller is not user");
		OracleId memory oracle = tokenIdToOracle[tokenId];

		if (oracle.providerId == OracleProvider.Chronicle) {
			return IChronicle(oracle.oracle).readWithAge();
		} else if (oracle.providerId == OracleProvider.Chainlink) {
			(, int256 answer, , uint256 updatedAt, ) = IChainlinkOracle(oracle.oracle).latestRoundData();
			require(answer >= 0, "Negative answer");

			// scale to 18 decimals.
			uint8 feedDecimals = IChainlinkOracle(oracle.oracle).decimals();
			uint256 value = uint256(answer) * 10 ** (18 - feedDecimals);

			return (value, updatedAt);
		} else { // todo: redstone
			revert("Invalid oracle provider");
		}
	}

    // ========================================
    //     CORE FUNCTIONS
    // ========================================

    function mintGOAT(address to, OracleId[] calldata oracles) external payable returns(uint256[] memory tokenIds) {
		uint256 quantity = oracles.length;
        require(msg.value >= quantity * PRICE_PER_TOKEN, "Insufficient Funds");
		uint256 startTokenId = _nextTokenId();
		_safeMint(to, quantity);

		for (uint256 i = 0; i < quantity; i++) {
			uint256 tokenId = startTokenId + i;
			OracleId memory oracle = oracles[i];

			_checkOracleRegistered(oracle);

			tokenIds[i] = tokenId;
			tokenIdToOracle[tokenId] = oracle;
		}

		emit GOATsMinted(to, tokenIds, oracles);

		// Refund any dust. Use transfer to avoid re-entrancy.
		if (msg.value > quantity * PRICE_PER_TOKEN) {
			payable(msg.sender).transfer(msg.value - quantity * PRICE_PER_TOKEN);
		}
    }

	function addOracles(OracleProvider providerId, address[] calldata oracles) external override onlyOwner {
		for (uint256 i = 0; i < oracles.length; i++) {
			_oracles[providerId].add(oracles[i]);
		}

		emit OraclesAdded(oracles, providerId);
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

	function withdraw() external onlyOwner {
		payable(msg.sender).transfer(address(this).balance);
	}

	// ========================================
	//     INTERNAL FUNCTIONS
	// ========================================

	function _lockToken(uint256 tokenId, address targetContract) internal {
		require(targetContract.isContract(), "User must be a contract");
		emit Locked(tokenId, true);
	}

	function _unlockToken(uint256 tokenId) internal {
		emit Locked(tokenId, false);
	}

	function _checkOracleRegistered(OracleId memory oracle) internal view {
		require(_oracles[oracle.providerId].contains(oracle.oracle), "Oracle not registered");
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