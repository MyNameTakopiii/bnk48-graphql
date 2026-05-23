/**
 * Integration Tests — GraphQL API
 *
 * Simulates real GraphQL queries against the full Yoga server pipeline.
 * Tests schema → resolver → data flow end-to-end.
 */

import { describe, it, expect } from "bun:test";
import { createYoga } from "graphql-yoga";
import { schema } from "../../schema/index";
import { allMembers } from "../../data/index";


// ── Test Helpers ───────────────────────────────────────────────────────────

const yoga = createYoga({ schema });

/**
 * Execute a GraphQL query against the yoga instance and return parsed JSON.
 */
async function executeQuery(
  query: string,
  variables?: Record<string, unknown>,
) {
  const response = await yoga.fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json() as Promise<{ data: any; errors?: any[] }>;
}

// ── members Query ──────────────────────────────────────────────────────────

describe("GraphQL: members query", () => {
  it("should return all members", async () => {
    const result = await executeQuery(`
      query {
        members {
          id
          name
          group
          generation
        }
      }
    `);

    expect(result.errors).toBeUndefined();
    expect(result.data.members).toHaveLength(allMembers.length);
  });

  it("should return complete member fields", async () => {
    const result = await executeQuery(`
      query {
        members {
          id
          name
          fullNameTh
          fullNameEn
          group
          team
          generation
          dateOfBirth
          height
          province
          likes
          bloodGroup
          hobby
          image
        }
      }
    `);

    expect(result.errors).toBeUndefined();

    const firstMember = result.data.members[0];
    expect(firstMember).toHaveProperty("id");
    expect(firstMember).toHaveProperty("name");
    expect(firstMember).toHaveProperty("fullNameTh");
    expect(firstMember).toHaveProperty("fullNameEn");
    expect(firstMember).toHaveProperty("group");
    expect(firstMember).toHaveProperty("team");
    expect(firstMember).toHaveProperty("generation");
    expect(firstMember).toHaveProperty("dateOfBirth");
    expect(firstMember).toHaveProperty("height");
    expect(firstMember).toHaveProperty("province");
    expect(firstMember).toHaveProperty("likes");
    expect(firstMember).toHaveProperty("bloodGroup");
    expect(firstMember).toHaveProperty("hobby");
    expect(firstMember).toHaveProperty("image");
  });
});

// ── member(name) Query ─────────────────────────────────────────────────────

describe("GraphQL: member(name) query", () => {
  it("should find a member by exact lowercase name", async () => {
    const result = await executeQuery(`
      query {
        member(name: "fame") {
          name
          group
          generation
        }
      }
    `);

    expect(result.errors).toBeUndefined();
    expect(result.data.member).not.toBeNull();
    expect(result.data.member.name).toBe("Fame");
    expect(result.data.member.group).toBe("BNK48");
    expect(result.data.member.generation).toBe(3);
  });

  it("should find a member by UPPERCASE name", async () => {
    const result = await executeQuery(`
      query {
        member(name: "FAME") {
          name
          group
        }
      }
    `);

    expect(result.errors).toBeUndefined();
    expect(result.data.member).not.toBeNull();
    expect(result.data.member.name).toBe("Fame");
  });

  it("should find a member by mixed case name", async () => {
    const result = await executeQuery(`
      query {
        member(name: "FaMe") {
          name
        }
      }
    `);

    expect(result.errors).toBeUndefined();
    expect(result.data.member).not.toBeNull();
    expect(result.data.member.name).toBe("Fame");
  });

  it("should return null for unknown member", async () => {
    const result = await executeQuery(`
      query {
        member(name: "unknown_member_xyz") {
          name
        }
      }
    `);

    expect(result.errors).toBeUndefined();
    expect(result.data.member).toBeNull();
  });

  it("should find a CGM48 member", async () => {
    const result = await executeQuery(`
      query {
        member(name: "nana") {
          name
          group
          team
        }
      }
    `);

    expect(result.errors).toBeUndefined();
    expect(result.data.member).not.toBeNull();
    expect(result.data.member.name).toBe("Nana");
    expect(result.data.member.group).toBe("CGM48");
  });

  it("should return all fields for a member", async () => {
    const result = await executeQuery(`
      query {
        member(name: "berry") {
          id
          name
          fullNameTh
          fullNameEn
          group
          team
          generation
          dateOfBirth
          height
          province
          likes
          bloodGroup
          hobby
          image
        }
      }
    `);

    expect(result.errors).toBeUndefined();
    const m = result.data.member;
    expect(m.id).toBe("bnk48-gen4-berry");
    expect(m.fullNameEn).toBe("Jirapinya Chantawannakul");
    expect(m.group).toBe("BNK48");
    expect(m.generation).toBe(4);
    expect(m.image).toContain("berry.webp");
    expect(m.likes).toContain("TikTok");
  });
});

// ── filterByLike(keyword) Query ────────────────────────────────────────────

describe("GraphQL: filterByLike(keyword) query", () => {
  it("should find members who like 'ร้องเพลง'", async () => {
    const result = await executeQuery(`
      query {
        filterByLike(keyword: "ร้องเพลง") {
          name
          likes
        }
      }
    `);

    expect(result.errors).toBeUndefined();
    expect(result.data.filterByLike.length).toBeGreaterThan(0);

    // Every returned member should have a like containing "ร้องเพลง"
    for (const m of result.data.filterByLike) {
      const hasMatch = m.likes.some((like: string) =>
        like.toLowerCase().includes("ร้องเพลง"),
      );
      expect(hasMatch).toBe(true);
    }
  });

  it("should be case-insensitive", async () => {
    const lower = await executeQuery(`
      query { filterByLike(keyword: "tiktok") { name } }
    `);
    const upper = await executeQuery(`
      query { filterByLike(keyword: "TIKTOK") { name } }
    `);
    const mixed = await executeQuery(`
      query { filterByLike(keyword: "TiKtOk") { name } }
    `);

    expect(lower.data.filterByLike.length).toBeGreaterThan(0);
    expect(lower.data.filterByLike.length).toBe(
      upper.data.filterByLike.length,
    );
    expect(lower.data.filterByLike.length).toBe(
      mixed.data.filterByLike.length,
    );
  });

  it("should match substring in likes", async () => {
    const result = await executeQuery(`
      query {
        filterByLike(keyword: "อนิเม") {
          name
          likes
        }
      }
    `);

    expect(result.errors).toBeUndefined();
    // "อนิเม" should match "อนิเมะ"
    expect(result.data.filterByLike.length).toBeGreaterThan(0);
  });

  it("should return empty array when no match", async () => {
    const result = await executeQuery(`
      query {
        filterByLike(keyword: "xyznonexistent") {
          name
        }
      }
    `);

    expect(result.errors).toBeUndefined();
    expect(result.data.filterByLike).toHaveLength(0);
  });

  it("should return empty array for empty keyword", async () => {
    const result = await executeQuery(`
      query {
        filterByLike(keyword: "") {
          name
        }
      }
    `);

    expect(result.errors).toBeUndefined();
    expect(result.data.filterByLike).toHaveLength(0);
  });

  it("should return multiple members for common likes", async () => {
    const result = await executeQuery(`
      query {
        filterByLike(keyword: "กิน") {
          name
          group
        }
      }
    `);

    expect(result.errors).toBeUndefined();
    expect(result.data.filterByLike.length).toBeGreaterThan(1);
  });
});

// ── Edge Cases ─────────────────────────────────────────────────────────────

describe("GraphQL: Edge Cases", () => {
  it("should handle member with N/A fields gracefully", async () => {
    const result = await executeQuery(`
      query {
        member(name: "mail") {
          name
          fullNameTh
          fullNameEn
          height
          province
          bloodGroup
        }
      }
    `);

    expect(result.errors).toBeUndefined();
    expect(result.data.member).not.toBeNull();
    expect(result.data.member.name).toBe("Mail");
    expect(result.data.member.fullNameTh).toBe("N/A");
    expect(result.data.member.fullNameEn).toBe("N/A");
    expect(result.data.member.height).toBe("158 cm");
  });

  it("should return proper image URLs in query results", async () => {
    const result = await executeQuery(`
      query {
        members {
          name
          image
        }
      }
    `);

    expect(result.errors).toBeUndefined();
    for (const m of result.data.members) {
      expect(m.image).toContain(
        "cdn.jsdelivr.net/gh/withmywish/48th-members-cdn@3/optimized/",
      );
      expect(m.image).toMatch(/\.webp$/);
    }
  });

  it("should handle multiple concurrent queries", async () => {
    const [r1, r2, r3] = await Promise.all([
      executeQuery(`query { members { name } }`),
      executeQuery(`query { member(name: "fame") { name } }`),
      executeQuery(`query { filterByLike(keyword: "เต้น") { name } }`),
    ]);

    expect(r1.errors).toBeUndefined();
    expect(r2.errors).toBeUndefined();
    expect(r3.errors).toBeUndefined();
    expect(r1.data.members.length).toBeGreaterThan(0);
    expect(r2.data.member.name).toBe("Fame");
    expect(r3.data.filterByLike.length).toBeGreaterThan(0);
  });

  it("should return both BNK48 and CGM48 members in members query", async () => {
    const result = await executeQuery(`
      query {
        members {
          group
        }
      }
    `);

    const groups = new Set(
      result.data.members.map((m: { group: string }) => m.group),
    );
    expect(groups.has("BNK48")).toBe(true);
    expect(groups.has("CGM48")).toBe(true);
  });
});
