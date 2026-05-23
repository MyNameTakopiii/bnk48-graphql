/**
 * Unit Tests — Data Layer
 *
 * Validates that every member in the dataset conforms to the schema,
 * has all required fields, and uses correctly formatted image URLs.
 */

import { describe, it, expect } from "bun:test";
import { allMembers } from "../../data/index.ts";
import { isValidImageUrl } from "../../types.ts";

describe("Data Layer — Member Schema Validation", () => {
  it("should have at least one member in the dataset", () => {
    expect(allMembers.length).toBeGreaterThan(0);
  });

  it("every member must have a non-empty id", () => {
    for (const m of allMembers) {
      expect(m.id).toBeTruthy();
      expect(typeof m.id).toBe("string");
    }
  });

  it("every member must have a non-empty name", () => {
    for (const m of allMembers) {
      expect(m.name).toBeTruthy();
      expect(typeof m.name).toBe("string");
    }
  });

  it("every member must have a valid group (BNK48 or CGM48)", () => {
    for (const m of allMembers) {
      expect(["BNK48", "CGM48"]).toContain(m.group);
    }
  });

  it("every member must have a positive integer generation", () => {
    for (const m of allMembers) {
      expect(Number.isInteger(m.generation)).toBe(true);
      expect(m.generation).toBeGreaterThan(0);
    }
  });

  it("every member must have a non-empty team", () => {
    for (const m of allMembers) {
      expect(m.team).toBeTruthy();
    }
  });

  it("every member must have a string height", () => {
    for (const m of allMembers) {
      expect(typeof m.height).toBe("string");
      expect(m.height.length).toBeGreaterThan(0);
    }
  });

  it("every member must have a likes array", () => {
    for (const m of allMembers) {
      expect(Array.isArray(m.likes)).toBe(true);
      expect(m.likes.length).toBeGreaterThan(0);
    }
  });

  it("every member must have a non-empty bloodGroup", () => {
    for (const m of allMembers) {
      expect(typeof m.bloodGroup).toBe("string");
      expect(m.bloodGroup.length).toBeGreaterThan(0);
    }
  });

  it("every member must have a non-empty hobby", () => {
    for (const m of allMembers) {
      expect(typeof m.hobby).toBe("string");
      expect(m.hobby.length).toBeGreaterThan(0);
    }
  });

  it("every member must have fullNameTh and fullNameEn strings", () => {
    for (const m of allMembers) {
      expect(typeof m.fullNameTh).toBe("string");
      expect(typeof m.fullNameEn).toBe("string");
      expect(m.fullNameTh.length).toBeGreaterThan(0);
      expect(m.fullNameEn.length).toBeGreaterThan(0);
    }
  });

  it("every member must have a province string", () => {
    for (const m of allMembers) {
      expect(typeof m.province).toBe("string");
      expect(m.province.length).toBeGreaterThan(0);
    }
  });

  it("every member must have a dateOfBirth string", () => {
    for (const m of allMembers) {
      expect(typeof m.dateOfBirth).toBe("string");
      expect(m.dateOfBirth.length).toBeGreaterThan(0);
    }
  });

  it("all member IDs must be unique", () => {
    const ids = allMembers.map((m) => m.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe("Data Layer — Image URL Validation", () => {
  it("every member image URL must match the CDN format", () => {
    for (const m of allMembers) {
      expect(isValidImageUrl(m.image)).toBe(true);
    }
  });

  it("image URL must use lowercase nickname", () => {
    for (const m of allMembers) {
      const expectedFragment = `/${m.name.toLowerCase()}.webp`;
      expect(m.image).toContain(expectedFragment);
    }
  });

  it("should reject invalid image URLs", () => {
    expect(isValidImageUrl("https://example.com/image.png")).toBe(false);
    expect(isValidImageUrl("")).toBe(false);
    expect(
      isValidImageUrl(
        "https://cdn.jsdelivr.net/gh/withmywish/48th-members-cdn@3/optimized/BAD.webp",
      ),
    ).toBe(false); // uppercase
  });
});

describe("Data Layer — Group & Generation Integrity", () => {
  it("BNK48 members should have generations 3–6", () => {
    const bnk = allMembers.filter((m) => m.group === "BNK48");
    for (const m of bnk) {
      expect(m.generation).toBeGreaterThanOrEqual(3);
      expect(m.generation).toBeLessThanOrEqual(6);
    }
  });

  it("CGM48 members should have generations 1–5", () => {
    const cgm = allMembers.filter((m) => m.group === "CGM48");
    for (const m of cgm) {
      expect(m.generation).toBeGreaterThanOrEqual(1);
      expect(m.generation).toBeLessThanOrEqual(5);
    }
  });
});
