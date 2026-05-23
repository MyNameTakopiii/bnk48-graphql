/**
 * Test Fixtures
 *
 * Reusable GraphQL query strings and sample data for tests.
 */

// ── GraphQL Query Strings ──────────────────────────────────────────────────

export const QUERIES = {
  ALL_MEMBERS: `
    query {
      members {
        id name fullNameTh fullNameEn group team generation
        dateOfBirth height province likes bloodGroup hobby image
      }
    }
  `,

  MEMBER_BY_NAME: `
    query MemberByName($name: String!) {
      member(name: $name) {
        id name fullNameTh fullNameEn group team generation
        dateOfBirth height province likes bloodGroup hobby image
      }
    }
  `,

  FILTER_BY_LIKE: `
    query FilterByLike($keyword: String!) {
      filterByLike(keyword: $keyword) {
        id name group likes
      }
    }
  `,

  MEMBER_SUMMARY: `
    query MemberSummary($name: String!) {
      member(name: $name) {
        name group generation team
      }
    }
  `,
} as const;

// ── Known Test Values ──────────────────────────────────────────────────────

export const KNOWN_MEMBERS = {
  BNK_FAME: {
    name: "Fame",
    group: "BNK48",
    generation: 3,
  },
  BNK_BERRY: {
    name: "Berry",
    group: "BNK48",
    generation: 4,
  },
  CGM_NANA: {
    name: "Nana",
    group: "CGM48",
    generation: 2,
  },
  CGM_KWAN: {
    name: "Kwan",
    group: "CGM48",
    generation: 3,
  },
} as const;
