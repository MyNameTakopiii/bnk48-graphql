/**
 * Unit Tests — Utility Functions
 *
 * Tests for buildImageUrl, isValidImageUrl, and the pre-computed
 * lookup structures used for performance.
 */

import { describe, it, expect } from "bun:test";
import { buildImageUrl, isValidImageUrl } from "../../types.ts";
import {
  memberByNameMap,
  membersWithNormalizedLikes,
  allMembers,
} from "../../data/index.ts";

// ── buildImageUrl ──────────────────────────────────────────────────────────

describe("buildImageUrl", () => {
  it("should produce a lowercase URL from a lowercase nickname", () => {
    const url = buildImageUrl("fame");
    expect(url).toBe(
      "https://cdn.jsdelivr.net/gh/withmywish/48th-members-cdn@3/optimized/fame.webp",
    );
  });

  it("should lowercase the nickname automatically", () => {
    const url = buildImageUrl("FAME");
    expect(url).toBe(
      "https://cdn.jsdelivr.net/gh/withmywish/48th-members-cdn@3/optimized/fame.webp",
    );
  });

  it("should handle mixed case", () => {
    const url = buildImageUrl("Berry");
    expect(url).toBe(
      "https://cdn.jsdelivr.net/gh/withmywish/48th-members-cdn@3/optimized/berry.webp",
    );
  });
});

// ── isValidImageUrl ────────────────────────────────────────────────────────

describe("isValidImageUrl", () => {
  it("should accept valid CDN URLs", () => {
    expect(
      isValidImageUrl(
        "https://cdn.jsdelivr.net/gh/withmywish/48th-members-cdn@3/optimized/fame.webp",
      ),
    ).toBe(true);
  });

  it("should reject URLs with wrong domain", () => {
    expect(
      isValidImageUrl(
        "https://example.com/gh/withmywish/48th-members-cdn@3/optimized/fame.webp",
      ),
    ).toBe(false);
  });

  it("should reject URLs with uppercase nicknames", () => {
    expect(
      isValidImageUrl(
        "https://cdn.jsdelivr.net/gh/withmywish/48th-members-cdn@3/optimized/FAME.webp",
      ),
    ).toBe(false);
  });

  it("should reject URLs with wrong extension", () => {
    expect(
      isValidImageUrl(
        "https://cdn.jsdelivr.net/gh/withmywish/48th-members-cdn@3/optimized/fame.png",
      ),
    ).toBe(false);
  });

  it("should reject empty strings", () => {
    expect(isValidImageUrl("")).toBe(false);
  });
});

// ── memberByNameMap ────────────────────────────────────────────────────────

describe("memberByNameMap (pre-computed lookup)", () => {
  it("should contain all members", () => {
    expect(memberByNameMap.size).toBe(allMembers.length);
  });

  it("should use lowercased keys", () => {
    for (const [key] of memberByNameMap) {
      expect(key).toBe(key.toLowerCase());
    }
  });

  it("should look up a known member by lowercase name", () => {
    const fame = memberByNameMap.get("fame");
    expect(fame).toBeDefined();
    expect(fame!.name).toBe("Fame");
    expect(fame!.group).toBe("BNK48");
  });

  it("should return undefined for unknown names", () => {
    expect(memberByNameMap.get("nonexistent")).toBeUndefined();
  });
});

// ── membersWithNormalizedLikes ──────────────────────────────────────────────

describe("membersWithNormalizedLikes (pre-computed cache)", () => {
  it("should have the same length as allMembers", () => {
    expect(membersWithNormalizedLikes.length).toBe(allMembers.length);
  });

  it("all normalizedLikes should be lowercase", () => {
    for (const { normalizedLikes } of membersWithNormalizedLikes) {
      for (const like of normalizedLikes) {
        expect(like).toBe(like.toLowerCase());
      }
    }
  });
});
