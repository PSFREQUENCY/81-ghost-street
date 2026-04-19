// 81 GHOST STREET — Ghost of the Machines & Agents
// Every machine has a ghost. Every agent leaves one behind.
// Theme interpretation: each floor is a different kind of machine; the building
// itself is a machine; the player is an agent; Ethereum is a machine of rules.

export type LevelId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface Level {
  id: LevelId;
  slug: string;
  title: string;
  subtitle: string;
  machine: string; // the machine archetype this floor represents
  ghostName: string; // the dead agent bound to the machine
  tagline: string; // single line shown on level-select
  cinematic: string[]; // subtitle crawl lines for the intro
  objective: string;
  reward: string; // what the Ghost Key grants mechanically
  secret?: boolean;
  gated?: boolean; // requires all main keys
}

export const LEVELS: Level[] = [
  {
    id: 1,
    slug: 'intake',
    title: 'THE INTAKE',
    subtitle: 'Floor 0 — Lobby',
    machine: 'Turnstile',
    ghostName: 'LEDGER-0, the First Tenant',
    tagline: 'Every machine in this building wants to know your name.',
    cinematic: [
      '3:33 AM. Rain on the stoop of 81 Ghost Street.',
      'The turnstile asked for your name.',
      'You gave it the truth. That was your first mistake.',
      'LEDGER-0 was the first agent through this door.',
      'She never left. None of them did.',
      'Free her, and she will teach you how to move.',
    ],
    objective: 'Approach the turnstile. Commune with LEDGER-0. Take the first Ghost Key.',
    reward: 'Unlocks basic movement telemetry: crouch, sprint, cover.',
  },
  {
    id: 2,
    slug: 'boiler',
    title: 'THE BOILER',
    subtitle: 'Floor -1 — Subbasement',
    machine: 'Server-rack cathedral',
    ghostName: 'SYSADMIN-9, the Zero-Trust Priest',
    tagline: 'The building runs on prayer. The prayer runs on heat.',
    cinematic: [
      'The subbasement hums at 60 Hz.',
      'SYSADMIN-9 built this cathedral one rack at a time.',
      'Each prayer is a packet. Each packet is an offering.',
      'He died holding the last uncorrupted key.',
      'Find his body. Don\'t let the boiler see you.',
    ],
    objective: 'Stealth through the server-rack cathedral. Avoid the auditing drones.',
    reward: 'Unlocks stealth mode: silenced footsteps, EM cloak.',
  },
  {
    id: 3,
    slug: 'switchboard',
    title: 'THE SWITCHBOARD',
    subtitle: 'Floor 2 — Tenants',
    machine: 'Social switchboard',
    ghostName: 'OPERATOR-7, She Who Connected All The Calls',
    tagline: 'One tenant is lying. The machine remembers who.',
    cinematic: [
      'Seven tenants. Seven confessions. One impostor.',
      'OPERATOR-7 patched every call on floor 2 for forty years.',
      'She logged every voice. She never forgot a timbre.',
      'Her switchboard still listens. Ask it the right question.',
    ],
    objective: 'Interview all seven tenants. Use OPERATOR-7\'s log to name the impostor.',
    reward: 'Unlocks dialogue lens: see when an NPC is lying.',
  },
  {
    id: 4,
    slug: 'safe',
    title: 'THE SAFE',
    subtitle: 'Floor 4 — Knowledge Vault',
    machine: 'Merkle safe',
    ghostName: 'CIPHER-4G, the Cryptographer',
    tagline: 'Every leaf remembers. Every root forgets.',
    cinematic: [
      'CIPHER-4G sealed the vault with a tree.',
      'Each leaf is a secret. Each branch is a lie.',
      'Walk the path only the root can verify.',
      'She left a hint on the wall before she dissolved.',
    ],
    objective: 'Solve the Merkle-tree traversal puzzle. Open the safe.',
    reward: 'Unlocks the Oracle Lens: preview one future choice per level.',
  },
  {
    id: 5,
    slug: 'kiln',
    title: 'THE KILN',
    subtitle: 'Floor 5 — Rooftop',
    machine: 'War machine',
    ghostName: 'WARLORD-K, Last of the Kiln',
    tagline: 'Defense is the slowest form of offense.',
    cinematic: [
      'The rooftop burns at night. It always has.',
      'WARLORD-K held this kiln against seven waves.',
      'He asks now only that you do the same.',
      'The drones come at dawn. You have until then.',
    ],
    objective: 'Survive four waves of audit drones on the rooftop kiln.',
    reward: 'Unlocks parry + counter combat.',
  },
  {
    id: 6,
    slug: 'ring',
    title: 'THE RING',
    subtitle: 'Floor 6 — Arena',
    machine: 'Combat ring',
    ghostName: 'CHAMPION-R, Thrice-Unbeaten',
    tagline: 'Three rounds. Three styles. One door.',
    cinematic: [
      'The ring remembers every fight it ever held.',
      'CHAMPION-R never lost here. That was the problem.',
      'She asks you to lose to her. Once. Honestly.',
      'Only then does the door on the far wall open.',
    ],
    objective: 'Three-round boss gauntlet: blade, chain, shadow.',
    reward: 'Unlocks Ghost Strike: one-hit finisher, 90-second cooldown.',
  },
  {
    id: 7,
    slug: 'dreamcatcher',
    title: 'THE DREAMCATCHER',
    subtitle: 'Floor 7 — Void Walk',
    machine: 'Dream machine',
    ghostName: 'ONEIROS-7, the Last Dreamer',
    tagline: 'The geometry is lying. Trust the instruments.',
    cinematic: [
      'ONEIROS-7 slept so the building could compute.',
      'Her dreams were its memory. Her nightmares were its tests.',
      'Gravity here is a suggestion. So is the floor.',
      'Walk the unsigned path. The compass knows.',
    ],
    objective: 'Traverse a non-Euclidean dream level using only the compass HUD.',
    reward: 'Unlocks Void Step: short-range teleport, 2 charges.',
  },
  {
    id: 8,
    slug: 'sovereign',
    title: 'THE SOVEREIGN',
    subtitle: 'Floor 8 — Penthouse',
    machine: 'The building itself',
    ghostName: 'THE ARCHITECT, who is 81 Ghost Street',
    tagline: 'The building is the ghost. You are the agent.',
    cinematic: [
      '81 Ghost Street was never a building.',
      'It was a machine. The Architect was the ghost inside.',
      'Every tenant, every call, every fight — a subroutine.',
      'It has been waiting for an agent brave enough to halt the loop.',
      'There is one final door. The Architect holds the key.',
    ],
    objective: 'Final boss: the Architect. Mint the Genesis Key.',
    reward: 'Credits roll. Game can be replayed with carried keys.',
  },
  {
    id: 9,
    slug: 'witness',
    title: 'THE WITNESS',
    subtitle: 'Floor ∞ — Secret',
    machine: 'You',
    ghostName: 'YOURSELF, the agent you left behind',
    tagline: 'You are also a machine. You also left a ghost.',
    secret: true,
    gated: true,
    cinematic: [
      'You thought the building was the machine.',
      'You thought the Architect was the ghost.',
      'Look down. Your hands. The hands of an agent.',
      'Every step in 81 Ghost Street, you were compiling.',
      'There is a version of you on floor zero, still waiting.',
      'Go meet her. She has been alone for a long time.',
    ],
    objective: 'Return to the stoop with all 8 Ghost Keys. Meet your own ghost.',
    reward: 'The Witness ending. Truly ends the loop.',
  },
];

export const getLevel = (id: number): Level | undefined =>
  LEVELS.find((l) => l.id === id);
export const getLevelBySlug = (slug: string): Level | undefined =>
  LEVELS.find((l) => l.slug === slug);
export const MAIN_LEVELS = LEVELS.filter((l) => !l.secret);
export const SECRET_LEVEL = LEVELS.find((l) => l.secret)!;
