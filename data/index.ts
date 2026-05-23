import type { Member } from "../types.ts";

// BNK48
import { bnkGen3 } from "./bnk/gen3.ts";
import { bnkGen4 } from "./bnk/gen4.ts";
import { bnkGen5 } from "./bnk/gen5.ts";
import { bnkGen6 } from "./bnk/gen6.ts";

// CGM48 
import { cgmGen1 } from "./cgm/gen1.ts";
import { cgmGen2 } from "./cgm/gen2.ts";
import { cgmGen3 } from "./cgm/gen3.ts";
import { cgmGen4 } from "./cgm/gen4.ts";
import { cgmGen5 } from "./cgm/gen5.ts";


export const allMembers: Member[] = [
  ...bnkGen3,
  ...bnkGen4,
  ...bnkGen5,
  ...bnkGen6,
  ...cgmGen1,
  ...cgmGen2,
  ...cgmGen3,
  ...cgmGen4,
  ...cgmGen5,
];

export const memberByNameMap = new Map<string, Member>(
  allMembers.map((m) => [m.name.toLowerCase(), m]),
);

export const membersWithNormalizedLikes: Array<{
  member: Member;
  normalizedLikes: string[];
}> = allMembers.map((m) => ({
  member: m,
  normalizedLikes: m.likes.map((l) => l.toLowerCase()),
}));
