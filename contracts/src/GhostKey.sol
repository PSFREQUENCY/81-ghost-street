// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

/// @title GhostKey — 81 GHOST STREET soulbound level-completion keys
/// @notice One non-transferable key per (agent, level). Nine levels (1..9).
///         Level 9 (THE WITNESS) is gated by owning all of 1..8.
/// @dev    Soulbound: any transfer after mint reverts.
contract GhostKey is ERC721, Ownable {
    using Strings for uint256;

    uint8 public constant MAIN_LEVELS = 8;
    uint8 public constant SECRET_LEVEL = 9;

    // tokenId is packed: levelId (uint8) | agent-counter (uint248) → but for
    // soulbound-per-level we just use a global incrementing counter and track
    // (agent, levelId) → tokenId separately.
    uint256 private _nextTokenId = 1;

    mapping(address => mapping(uint8 => uint256)) public keyOf;   // agent => level => tokenId (0 = none)
    mapping(uint256 => uint8) public levelOfToken;                // tokenId => levelId

    event GhostFreed(address indexed agent, uint256 indexed levelId, uint256 tokenId);

    error InvalidLevel();
    error AlreadyCommuned();
    error WitnessLocked();
    error Soulbound();

    constructor() ERC721("81 Ghost Street Keys", "81KEY") Ownable(msg.sender) {}

    /// @notice Mint the Ghost Key for a completed level. Caller = the agent.
    /// @param  levelId 1..9
    function communeWith(uint256 levelId) external returns (uint256 tokenId) {
        if (levelId == 0 || levelId > SECRET_LEVEL) revert InvalidLevel();
        uint8 lvl = uint8(levelId);

        if (keyOf[msg.sender][lvl] != 0) revert AlreadyCommuned();
        if (lvl == SECRET_LEVEL && !hasAllMainKeys(msg.sender)) revert WitnessLocked();

        tokenId = _nextTokenId++;
        keyOf[msg.sender][lvl] = tokenId;
        levelOfToken[tokenId] = lvl;

        _safeMint(msg.sender, tokenId);
        emit GhostFreed(msg.sender, levelId, tokenId);
    }

    function hasKey(address agent, uint256 levelId) external view returns (bool) {
        if (levelId == 0 || levelId > SECRET_LEVEL) return false;
        return keyOf[agent][uint8(levelId)] != 0;
    }

    function hasAllMainKeys(address agent) public view returns (bool) {
        for (uint8 i = 1; i <= MAIN_LEVELS; i++) {
            if (keyOf[agent][i] == 0) return false;
        }
        return true;
    }

    // --- Soulbound enforcement ---
    // ERC721 v5: _update handles mint/transfer/burn. Allow mint (from == 0),
    // allow burn by owner (to == 0), block everything else.
    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        returns (address)
    {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) revert Soulbound();
        return super._update(to, tokenId, auth);
    }

    // --- On-chain metadata ---
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        uint8 lvl = levelOfToken[tokenId];
        string memory name = string.concat("Ghost Key ", _roman(lvl));
        string memory machine = _machineName(lvl);
        string memory ghost = _ghostName(lvl);

        string memory svg = _svg(lvl);
        string memory json = string.concat(
            '{"name":"', name, '",',
            '"description":"81 GHOST STREET — Ghost of the Machines & Agents. Soulbound level-', lvl.toString(),
            ' key. Machine: ', machine, '. Ghost: ', ghost, '.",',
            '"attributes":[',
                '{"trait_type":"Level","value":"', lvl.toString(), '"},',
                '{"trait_type":"Machine","value":"', machine, '"},',
                '{"trait_type":"Ghost","value":"', ghost, '"},',
                '{"trait_type":"Soulbound","value":"true"}',
            '],',
            '"image":"data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'
        );
        return string.concat("data:application/json;base64,", Base64.encode(bytes(json)));
    }

    function _svg(uint8 lvl) internal pure returns (string memory) {
        string memory color = _color(lvl);
        return string.concat(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#05060a"/>',
            '<circle cx="200" cy="200" r="120" fill="none" stroke="', color, '" stroke-width="2" opacity="0.6"/>',
            '<text x="200" y="180" text-anchor="middle" font-family="monospace" font-size="24" fill="', color, '" letter-spacing="8">81 GHOST ST</text>',
            '<text x="200" y="230" text-anchor="middle" font-family="monospace" font-size="72" fill="', color, '" font-weight="900">', _roman(lvl), '</text>',
            '<text x="200" y="280" text-anchor="middle" font-family="monospace" font-size="12" fill="#e8e6de" letter-spacing="4">', _machineName(lvl), '</text>',
            '<text x="200" y="360" text-anchor="middle" font-family="monospace" font-size="10" fill="#e8e6de" opacity="0.5" letter-spacing="4">SOULBOUND</text>',
            '</svg>'
        );
    }

    function _roman(uint8 lvl) internal pure returns (string memory) {
        if (lvl == 1) return "I";
        if (lvl == 2) return "II";
        if (lvl == 3) return "III";
        if (lvl == 4) return "IV";
        if (lvl == 5) return "V";
        if (lvl == 6) return "VI";
        if (lvl == 7) return "VII";
        if (lvl == 8) return "VIII";
        if (lvl == 9) return "IX";
        return "?";
    }

    function _machineName(uint8 lvl) internal pure returns (string memory) {
        if (lvl == 1) return "Turnstile";
        if (lvl == 2) return "Server Cathedral";
        if (lvl == 3) return "Switchboard";
        if (lvl == 4) return "Merkle Safe";
        if (lvl == 5) return "Kiln";
        if (lvl == 6) return "Combat Ring";
        if (lvl == 7) return "Dreamcatcher";
        if (lvl == 8) return "The Architect";
        if (lvl == 9) return "The Witness";
        return "Unknown";
    }

    function _ghostName(uint8 lvl) internal pure returns (string memory) {
        if (lvl == 1) return "LEDGER-0";
        if (lvl == 2) return "SYSADMIN-9";
        if (lvl == 3) return "OPERATOR-7";
        if (lvl == 4) return "CIPHER-4G";
        if (lvl == 5) return "WARLORD-K";
        if (lvl == 6) return "CHAMPION-R";
        if (lvl == 7) return "ONEIROS-7";
        if (lvl == 8) return "THE ARCHITECT";
        if (lvl == 9) return "YOURSELF";
        return "?";
    }

    function _color(uint8 lvl) internal pure returns (string memory) {
        if (lvl == 1) return "#c084fc";
        if (lvl == 2) return "#22d3ee";
        if (lvl == 3) return "#e879f9";
        if (lvl == 4) return "#22c55e";
        if (lvl == 5) return "#f43f5e";
        if (lvl == 6) return "#fbbf24";
        if (lvl == 7) return "#a855f7";
        if (lvl == 8) return "#ffffff";
        if (lvl == 9) return "#fbbf24";
        return "#e8e6de";
    }
}
