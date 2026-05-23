import type { Member } from "../types";

// BNK48
import { bnkGen3 } from "./bnk/gen3";
import { bnkGen4 } from "./bnk/gen4";
import { bnkGen5 } from "./bnk/gen5";
import { bnkGen6 } from "./bnk/gen6";

// CGM48 
import { cgmGen1 } from "./cgm/gen1";
import { cgmGen2 } from "./cgm/gen2";
import { cgmGen3 } from "./cgm/gen3";
import { cgmGen4 } from "./cgm/gen4";
import { cgmGen5 } from "./cgm/gen5";



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
