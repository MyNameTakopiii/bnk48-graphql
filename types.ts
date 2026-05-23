// ─── Core Types ─────────────────────────────────────────────────────────────

/** Supported idol groups */
export type Group = "BNK48" | "CGM48";

/** Full member profile */
export interface Member {
  id: string;
  name: string;
  fullNameTh: string;
  fullNameEn: string;
  group: Group;
  team: string;
  generation: number;
  dateOfBirth: string;
  height: string;
  province: string;
  likes: string[];
  bloodGroup: string;
  hobby: string;
  image: string;
}

// ─── Constants ──────────────────────────────────────────────────────────────

/** CDN base URL for member images */
export const CDN_BASE =
  "https://cdn.jsdelivr.net/gh/withmywish/48th-members-cdn@3/optimized";

/**
 * Build a valid CDN image URL from a member's nickname.
 * Nickname is lowercased and used as the filename.
 */
export function buildImageUrl(nickname: string): string {
  return `${CDN_BASE}/${nickname.toLowerCase()}.webp`;
}

// ─── Validation Helpers ─────────────────────────────────────────────────────

const IMAGE_URL_REGEX =
  /^https:\/\/cdn\.jsdelivr\.net\/gh\/withmywish\/48th-members-cdn@3\/optimized\/[a-z0-9]+\.webp$/;

/** Check whether an image URL matches the required CDN format */
export function isValidImageUrl(url: string): boolean {
  return IMAGE_URL_REGEX.test(url);
}
