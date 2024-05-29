import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/schema/*.graphql",
  require: ["ts-node/register"],
  generates: {
    "./src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"],
      config: {
        contextType: "../context/context.js#DataContext",
      },
    },
  },
};

export default config;
