# 81 GHOST STREET · Contracts

Soulbound ERC-721 "Ghost Keys" for 81 GHOST STREET.

## Setup

```sh
forge install openzeppelin/openzeppelin-contracts --no-commit
forge install foundry-rs/forge-std --no-commit
forge build
forge test
```

## Deploy to Sepolia

```sh
cp ../.env.example ../.env
# fill SEPOLIA_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY

source ../.env
forge script script/Deploy.s.sol \
  --rpc-url $SEPOLIA_RPC_URL \
  --broadcast \
  --verify
```

After deploy, put the address in the project root `.env` as
`NEXT_PUBLIC_GHOSTKEY_ADDRESS`.

## Design

- `communeWith(uint256 levelId)` — agent mints their own key for a completed level.
- Each `(agent, level)` pair may only be minted once.
- Level 9 reverts with `WitnessLocked` unless the agent already holds keys 1..8.
- Any post-mint transfer reverts with `Soulbound`. Burn is still permitted.
- `tokenURI` returns fully on-chain SVG metadata.
