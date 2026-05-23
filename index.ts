/**
 * Server Entry Point
 *
 * Starts the GraphQL Yoga server on Bun.
 * Default port: 4000 (override via PORT env var).
 */

import { createYoga } from "graphql-yoga";
import { schema } from "./schema/index.ts";

const yoga = createYoga({
  schema,
  // บังคับให้แสดงผลหน้า UI (GraphiQL) ทั้งบน local และ production
  graphiql: true,
});

const port = parseInt(process.env["PORT"] ?? "4000", 10);

const server = Bun.serve({
  port,
  fetch: yoga.fetch,
});

console.log(
  `🚀 48th Members GraphQL API running at http://localhost:${server.port}/graphql`,
);
