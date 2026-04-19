// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {GhostKey} from "../src/GhostKey.sol";

contract GhostKeyTest is Test {
    GhostKey k;
    address alice = address(0xA11CE);
    address bob = address(0xB0B);

    function setUp() public {
        k = new GhostKey();
    }

    function test_mintLevelOne() public {
        vm.prank(alice);
        uint256 id = k.communeWith(1);
        assertEq(id, 1);
        assertEq(k.ownerOf(1), alice);
        assertTrue(k.hasKey(alice, 1));
    }

    function test_cannotDoubleCommune() public {
        vm.startPrank(alice);
        k.communeWith(1);
        vm.expectRevert(GhostKey.AlreadyCommuned.selector);
        k.communeWith(1);
        vm.stopPrank();
    }

    function test_invalidLevelReverts() public {
        vm.prank(alice);
        vm.expectRevert(GhostKey.InvalidLevel.selector);
        k.communeWith(0);

        vm.prank(alice);
        vm.expectRevert(GhostKey.InvalidLevel.selector);
        k.communeWith(10);
    }

    function test_witnessRequiresAllMainKeys() public {
        vm.startPrank(alice);
        vm.expectRevert(GhostKey.WitnessLocked.selector);
        k.communeWith(9);

        for (uint256 i = 1; i <= 8; i++) {
            k.communeWith(i);
        }
        assertTrue(k.hasAllMainKeys(alice));
        uint256 id9 = k.communeWith(9);
        assertTrue(id9 > 0);
        vm.stopPrank();
    }

    function test_soulboundBlocksTransfer() public {
        vm.prank(alice);
        k.communeWith(1);
        vm.prank(alice);
        vm.expectRevert(GhostKey.Soulbound.selector);
        k.transferFrom(alice, bob, 1);
    }

    function test_tokenURIReturnsDataUri() public {
        vm.prank(alice);
        k.communeWith(4);
        string memory uri = k.tokenURI(1);
        assertGt(bytes(uri).length, 100);
    }
}
