import { CodegenConfig } from '@graphql-codegen/cli'

const schema: string = process.env.NEXT_PUBLIC_GRAPHQL_URI ?? ''

const config: CodegenConfig = {
  overwrite: true,
  schema: schema,
  documents: ['src/**/*.graphql'],
  generates: {
    'src/graphql/generated/components.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
  },
  config: {
    namingConvention: {
      enumValues: 'change-case-all#upperCase',
    },
  },
}
export default config
