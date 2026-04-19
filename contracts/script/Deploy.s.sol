// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script, console2} from "forge-std/Script.sol";
import {GhostKey} from "../src/GhostKey.sol";

contract Deploy is Script {
    function run() external returns (GhostKey) {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(pk);
        GhostKey k = new GhostKey();
        vm.stopBroadcast();
        console2.log("GhostKey deployed at:", address(k));
        return k;
    }
}
