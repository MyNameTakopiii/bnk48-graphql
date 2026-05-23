/**
 * Pothos Schema Builder
 *
 * Code-first GraphQL schema using Pothos.
 * Defines the Member object type and all query fields.
 */

import SchemaBuilder from "@pothos/core";
import type { Member } from "../types.ts";
import {
  allMembers,
  memberByNameMap,
  membersWithNormalizedLikes,
} from "../data/index.ts";

// ── Builder ────────────────────────────────────────────────────────────────

const builder = new SchemaBuilder<{}>({});

// ── Member Object Type ─────────────────────────────────────────────────────

const MemberType = builder.objectRef<Member>("Member").implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    name: t.exposeString("name"),
    fullNameTh: t.exposeString("fullNameTh"),
    fullNameEn: t.exposeString("fullNameEn"),
    group: t.exposeString("group"),
    team: t.exposeString("team"),
    generation: t.exposeInt("generation"),
    dateOfBirth: t.exposeString("dateOfBirth"),
    height: t.exposeString("height"),
    province: t.exposeString("province"),
    likes: t.exposeStringList("likes"),
    bloodGroup: t.exposeString("bloodGroup"),
    hobby: t.exposeString("hobby"),
    image: t.exposeString("image"),
  }),
});

// ── Query Type ─────────────────────────────────────────────────────────────

builder.queryType({
  fields: (t) => ({
    /**
     * members — return every member across all groups and generations.
     */
    members: t.field({
      type: [MemberType],
      resolve: () => allMembers,
    }),

    /**
     * member(name) — exact name match, case-insensitive.
     * Returns null if no member is found.
     */
    member: t.field({
      type: MemberType,
      nullable: true,
      args: {
        name: t.arg.string({ required: true }),
      },
      resolve: (_root, args) => {
        return memberByNameMap.get(args.name.toLowerCase()) ?? null;
      },
    }),

    /**
     * filterByLike(keyword) — find members whose `likes` array
     * contains a substring match (case-insensitive).
     * Returns empty array on no match.
     */
    filterByLike: t.field({
      type: [MemberType],
      args: {
        keyword: t.arg.string({ required: true }),
      },
      resolve: (_root, args) => {
        const needle = args.keyword.toLowerCase();
        if (needle === "") return [];

        return membersWithNormalizedLikes
          .filter(({ normalizedLikes }) =>
            normalizedLikes.some((like) => like.includes(needle)),
          )
          .map(({ member }) => member);
      },
    }),
  }),
});

// ── Export built schema ────────────────────────────────────────────────────

export const schema = builder.toSchema();
