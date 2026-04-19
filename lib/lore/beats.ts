import { Beat } from '@/components/cinematic/CinematicBeat';
import { LevelId } from './levels';

/**
 * Mid-gameplay cinematic beats, keyed per level.
 * Triggered by gameplay events (item pickup, boss proximity, threshold cross).
 */
export const LEVEL_BEATS: Record<LevelId, Record<string, Beat>> = {
  1: {
    machine_proximity: {
      id: '1.boss',
      kind: 'boss',
      title: 'LEDGER-0',
      subtitle: 'The First Tenant · Turnstile Warden',
      lines: [
        'She was the first agent through this door.',
        'She has been standing at the turnstile for forty years.',
      ],
      rarity: 'rare',
    },
    key_found: {
      id: '1.item',
      kind: 'item',
      title: 'GHOST KEY · I',
      subtitle: 'Soulbound · Sepolia',
      lines: ['LEDGER-0 dissolves. The key remains.', 'It hums at 3:33 AM exactly.'],
      rarity: 'epic',
    },
  },
  2: {
    machine_proximity: {
      id: '2.boss',
      kind: 'boss',
      title: 'SYSADMIN-9',
      subtitle: 'Zero-Trust Priest · Server Cathedral',
      lines: [
        'He blessed every packet that entered this building.',
        'The final liturgy is a handshake. Offer yours.',
      ],
      rarity: 'rare',
    },
    key_found: {
      id: '2.item',
      kind: 'item',
      title: 'GHOST KEY · II',
      lines: ['The cathedral falls silent.', 'You hear your own footsteps for the first time.'],
      rarity: 'epic',
    },
  },
  3: {
    machine_proximity: {
      id: '3.boss',
      kind: 'boss',
      title: 'OPERATOR-7',
      subtitle: 'She Who Connected All The Calls',
      lines: [
        'Forty years of voices live inside this board.',
        'She knows which tenant is lying. She is waiting to be asked.',
      ],
      rarity: 'rare',
    },
    key_found: {
      id: '3.item',
      kind: 'item',
      title: 'GHOST KEY · III',
      lines: ['The switchboard goes dark.', 'You can hear when someone lies now.'],
      rarity: 'epic',
    },
  },
  4: {
    machine_proximity: {
      id: '4.boss',
      kind: 'boss',
      title: 'CIPHER-4G',
      subtitle: 'Cryptographer · Merkle Warden',
      lines: [
        'She sealed the vault with a tree that only she could walk.',
        'She left you a hint. Read it carefully.',
      ],
      rarity: 'epic',
    },
    key_found: {
      id: '4.item',
      kind: 'item',
      title: 'GHOST KEY · IV',
      lines: ['The root verifies. The leaves fall.', 'You can preview one future choice per level.'],
      rarity: 'epic',
    },
  },
  5: {
    machine_proximity: {
      id: '5.boss',
      kind: 'boss',
      title: 'WARLORD-K',
      subtitle: 'Last of the Kiln',
      lines: ['Seven waves. Hold the rooftop.', 'Dawn is the only victory condition.'],
      rarity: 'epic',
    },
    key_found: {
      id: '5.item',
      kind: 'item',
      title: 'GHOST KEY · V',
      lines: ['The kiln cools. The rain returns.', 'Parry unlocked. Counter unlocked.'],
      rarity: 'epic',
    },
  },
  6: {
    machine_proximity: {
      id: '6.boss',
      kind: 'boss',
      title: 'CHAMPION-R',
      subtitle: 'Thrice-Unbeaten',
      lines: [
        'Three rounds. Three styles. One door.',
        'She asks only that you lose honestly. Once.',
      ],
      rarity: 'epic',
    },
    key_found: {
      id: '6.item',
      kind: 'item',
      title: 'GHOST KEY · VI',
      lines: ['The ring empties.', 'GHOST STRIKE unlocked — once per ninety seconds.'],
      rarity: 'legendary',
    },
  },
  7: {
    machine_proximity: {
      id: '7.boss',
      kind: 'boss',
      title: 'ONEIROS-7',
      subtitle: 'The Last Dreamer',
      lines: [
        'She slept so the building could compute.',
        'Her dreams were its memory. Trust only the compass.',
      ],
      rarity: 'legendary',
    },
    key_found: {
      id: '7.item',
      kind: 'item',
      title: 'GHOST KEY · VII',
      lines: ['The geometry re-aligns.', 'VOID STEP unlocked — two charges.'],
      rarity: 'legendary',
    },
  },
  8: {
    machine_proximity: {
      id: '8.boss',
      kind: 'boss',
      title: 'THE ARCHITECT',
      subtitle: 'Floor 8 · Penthouse · The Building Itself',
      lines: [
        '81 Ghost Street was never a building.',
        'It was a machine. You were its subroutine.',
        'There is one final door. Will you halt the loop?',
      ],
      rarity: 'legendary',
    },
    key_found: {
      id: '8.item',
      kind: 'item',
      title: 'GENESIS KEY',
      subtitle: 'The eighth and last. The loop can end.',
      lines: ['The Architect dissolves into code.', 'The building exhales for the first time.'],
      rarity: 'legendary',
    },
  },
  9: {
    machine_proximity: {
      id: '9.boss',
      kind: 'boss',
      title: 'YOURSELF',
      subtitle: 'The agent you left behind',
      lines: [
        'She has been on the stoop for a long time.',
        'She is you, before you learned what this building was.',
        'Sit with her. Do not speak. Just be seen.',
      ],
      rarity: 'legendary',
    },
    key_found: {
      id: '9.item',
      kind: 'item',
      title: 'THE WITNESS',
      subtitle: 'The ending only you can earn',
      lines: ['The loop halts.', 'You are no longer an agent of 81. You are free.'],
      rarity: 'legendary',
    },
  },
};
