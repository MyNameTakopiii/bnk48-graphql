import { createYoga } from "graphql-yoga";
import { schema } from "../schema/index.ts";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/graphql",
  graphiql: true,
});

export default {
  async fetch(request: Request) {
    return yoga.fetch(request);
  }
};
