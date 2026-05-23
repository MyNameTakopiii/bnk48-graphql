import { createYoga } from "graphql-yoga";
import { schema } from "../schema/index.ts";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  graphiql: true,
});

export default yoga;
