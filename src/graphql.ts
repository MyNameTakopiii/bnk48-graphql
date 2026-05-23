import { createYoga } from "graphql-yoga";
import { schema } from "../schema";

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
