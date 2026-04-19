<pre align="center">
░▓█████▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓█████▓░

   █████╗  ██╗    ░█▀▀░█░█░█▀█░█▀▀░▀█▀░   ░█▀▀░▀█▀░█▀▄░█▀▀░█▀▀░▀█▀
  ██╔══██╗███║    ░█░█░█▀█░█░█░▀▀█░░█░░   ░▀▀█░░█░░█▀▄░█▀▀░█▀▀░░█░
  ╚█████╔╝╚██║    ░▀▀▀░▀░▀░▀▀▀░▀▀▀░░▀░░   ░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░░▀░
   ╚═══██╗ ██║
   █████╔╝ ██║         G H O S T   O F   T H E
   ╚════╝  ╚═╝     M A C H I N E S   &   A G E N T S

░▓█████▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓█████▓░

          ╔═══════════════════════════════════════════════════╗
          ║   every machine in this building has a ghost      ║
          ║   every agent leaves one behind                    ║
          ║   you are the last agent                           ║
          ╚═══════════════════════════════════════════════════╝

                   ┌──────┐   ┌──────┐   ┌──────┐
                   │  ◆I  │   │ ◆II  │   │ ◆III │   ·  ·  ·
                   └──────┘   └──────┘   └──────┘
                   turnstile  cathedral  switchboard

        [ WASD ] move   [ MOUSE ] look   [ E ] commune   [ ESC ] ghost

░▓█████▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓█████▓░
</pre>

# 81 GHOST STREET

### *Ghost of the Machines & Agents*

A neo-noir occult 3D HTML5 thriller built for **[Gamedev.js Jam 2026](https://gamedevjs.com/jam/2026/)** (theme: **Machines**).

> Every machine in this building has a ghost. Every agent leaves one behind. You are the last agent.

**Play in browser:** _Wavedash URL pending upload_
**Repo:** https://github.com/PSFREQUENCY/81-ghost-street
**Jam page:** _TBA_

---

## The Pitch

81 Ghost Street is a building. The building is a machine. Every floor is a different kind of machine — a turnstile, a server cathedral, a switchboard, a Merkle safe, a kiln, a combat ring, a dream engine, and finally the building itself. Each machine is haunted by the ghost of the agent who once operated it.

You are the last agent. Your job is to **commune** with each machine, free its ghost, and take the soulbound key it leaves behind. There are eight keys. Collect all eight and you unlock the ninth machine — which is you, still sitting on the stoop, waiting for yourself to come back.

Third-person cinematic gameplay inspired by **Tomb Raider**, **Metal Gear Solid**, and **Grand Theft Auto** — stealth, puzzle-traversal, wave defense, boss fights, and dream-logic platforming, wrapped in a rain-soaked neo-noir aesthetic.

## The 9 Levels

| # | Title | Machine | Ghost |
| - | ----- | ------- | ----- |
| 1 | THE INTAKE | Turnstile | LEDGER-0 |
| 2 | THE BOILER | Server Cathedral | SYSADMIN-9 |
| 3 | THE SWITCHBOARD | Social Switchboard | OPERATOR-7 |
| 4 | THE SAFE | Merkle Safe | CIPHER-4G |
| 5 | THE KILN | War Machine | WARLORD-K |
| 6 | THE RING | Combat Ring | CHAMPION-R |
| 7 | THE DREAMCATCHER | Dream Machine | ONEIROS-7 |
| 8 | THE SOVEREIGN | 81 Ghost Street itself | THE ARCHITECT |
| 9 | THE WITNESS *(secret)* | You | YOURSELF |

The secret 9th level is gated by holding **all 8 main Ghost Keys** on-chain.

---

## Gamedev.js Jam 2026 — Challenge Entries

### GitHub Open Source Challenge *(GitHub)*

- **Fully open source** — MIT licensed, all source readable in this repo.
- Tree layout:
  - `app/` — Next.js 14 app router, level routing, HTML5 static export.
  - `components/scene/` — React Three Fiber scene graph (player, stage, machines, keys, buildings).
  - `components/cinematic/` — full-screen and mid-game cinematic overlays.
  - `components/ui/` — title screen, HUD, connect button.
  - `lib/lore/` — lore bible, level manifest, cinematic beats.
  - `lib/chain/` — wagmi/viem Sepolia config + ABI.
  - `lib/hooks/` — game hooks (keyboard, mint).
  - `lib/game/` — zustand store.
  - `contracts/` — Foundry project for the `GhostKey` soulbound ERC-721.
  - `.github/workflows/` — CI + Wavedash deploy.
- Uses GitHub Actions for CI (typecheck + web build + contract tests) and a tag-triggered Wavedash deploy.
- Code is commented sparingly — gameplay logic, contract invariants, and lore are the priority.

### Deploy to Wavedash Challenge *(Wavedash)*

- Ships as a static export (`next export` → `out/`) uploaded via the Wavedash CLI.
- `wavedash.toml` at repo root pins `game_id`, `upload_dir = "out"`, and `entrypoint = "index.html"`.
- Pushed on tag via `.github/workflows/wavedash-deploy.yml`.
- Runs in any modern browser with WebGL 2, no download, no plugin.

### Ethereum Challenge *(OP Guild)*

Ethereum (Sepolia) is **meaningfully integrated**, not bolted on:

- **Soulbound level-completion keys.** Each level-clear mints a non-transferable ERC-721 `GhostKey` to the player's wallet. Tokens are **genuinely soulbound** (`_update` reverts on any post-mint transfer).
- **Secret level gate is on-chain.** The 9th level (THE WITNESS) is locked by a contract-level invariant: `communeWith(9)` reverts with `WitnessLocked` unless the agent already holds keys 1..8. The UI enforces this by reading `hasAllMainKeys(agent)` on the client, but the **contract is the source of truth**.
- **On-chain SVG metadata.** `tokenURI` emits a fully on-chain SVG + JSON data URI — no IPFS, no centralized host. Each key carries its level, machine archetype, and ghost name as attributes.
- **Graceful degradation.** If no wallet is connected (or no address is configured), the game still plays locally — the chain layer adds **true ownership** but never gates **entertainment**.
- Tech: `wagmi` + `viem` + `RainbowKit` on the client, Foundry for contracts, verified on Etherscan post-deploy.

### Theme — *Machines*

- **Literal.** Every one of the nine levels centers on a machine with a name, a purpose, and a ghost. The building itself is the eighth machine.
- **Metaphorical.** The player is an agent — an autonomous process — and the game's central question is whether you are an operator of machines or one of them.
- **Systemic.** The Ethereum smart contract is itself a machine: a deterministic rule-engine that mints the keys and enforces the witness gate without any central authority.
- **Narrative.** Every cinematic beat reinforces the theme — "The building was never a building. It was a machine. You were a subroutine."

---

## Controls

| Input | Action |
| --- | --- |
| `WASD` / Arrows | Move |
| Mouse | Look (click to capture pointer) |
| `Shift` | Sprint |
| `C` | Crouch |
| `E` | Interact / commune |
| `Esc` | Menu / skip cinematic |
| `Enter` / `Space` | Advance cinematic line |

Approach a machine → mid-game cinematic beat introduces the ghost → pick up the floating Ghost Key → if a wallet is connected, the mint is sent to Sepolia; otherwise the progress persists locally.

---

## Tech Stack

- **Engine:** React Three Fiber + Three.js (WebGL 2)
- **Post-processing:** `@react-three/postprocessing` — Bloom, chromatic aberration, vignette
- **Framework:** Next.js 14 app router, fully static export
- **State:** Zustand (persisted to localStorage)
- **Chain:** Sepolia + wagmi v2 + viem + RainbowKit
- **Contracts:** Foundry + OpenZeppelin v5 (ERC-721 + Ownable + Base64)
- **Styling:** Tailwind + custom CRT/neon shader overlays

---

## Local Development

```sh
# prerequisites: Node 20+, Foundry, a Sepolia RPC URL

# 1. web
npm install
cp .env.example .env         # fill in values (optional — game runs without chain)
npm run dev                  # http://localhost:3000

# 2. contracts
cd contracts
forge install openzeppelin/openzeppelin-contracts --no-commit
forge install foundry-rs/forge-std --no-commit
forge test -vvv
# deploy to Sepolia:
source ../.env
forge script script/Deploy.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify
```

After deploying, set `NEXT_PUBLIC_GHOSTKEY_ADDRESS` in `.env` and rebuild.

## Production Build

```sh
npm run build         # outputs ./out as static HTML
wavedash auth login
wavedash build push
```

## Repository Structure

```
81-ghost-street/
├── app/                       Next.js routes
│   ├── game/[level]/          one route per level (static export)
│   ├── layout.tsx             root layout + providers
│   ├── page.tsx               title screen
│   ├── providers.tsx          wagmi + rainbowkit + react-query
│   └── globals.css            tailwind + CRT overlays
├── components/
│   ├── cinematic/             full-screen intro + mid-game beat overlays
│   ├── scene/                 R3F components
│   │   ├── GameScene.tsx      main playable composite
│   │   ├── Player.tsx         TPS controller
│   │   ├── Stage.tsx          floor, rain, fog, lights
│   │   └── props/             Machine, GhostKey, Building
│   └── ui/                    HUD, TitleScreen
├── lib/
│   ├── chain/                 wagmi config, ABI
│   ├── game/                  zustand store
│   ├── hooks/                 useKeyboard, useGhostKey
│   └── lore/                  levels.ts, beats.ts
├── contracts/                 Foundry project
│   ├── src/GhostKey.sol
│   ├── script/Deploy.s.sol
│   └── test/GhostKey.t.sol
├── .github/workflows/         CI + Wavedash deploy
├── wavedash.toml              Wavedash build config
└── README.md
```

---

## Credits

- **Design, code, lore:** PHENOMENAL MARK / PSFREQUENCY
- **Theme:** *Machines* — Gamedev.js Jam 2026
- **Built with:** [Claude Code](https://claude.com/claude-code)

## License

MIT — see [LICENSE](./LICENSE).
