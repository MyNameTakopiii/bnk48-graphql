import type { Member } from "../types";

// BNK48
import { bnk } from "./bnk";

// CGM48
import { cgm } from "./cgm";

export const allMembers: Member[] = [...bnk, ...cgm];

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
