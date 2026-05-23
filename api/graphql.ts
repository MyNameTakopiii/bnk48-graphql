import { createYoga } from "graphql-yoga";
import { schema } from "../schema/index.js";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  graphiql: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default yoga;
