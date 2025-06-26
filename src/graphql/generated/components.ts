import { GraphQLClient, RequestOptions } from 'graphql-request'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  ISO8601DateTime: { input: any; output: any }
}

export type Family = {
  __typename?: 'Family'
  createdAt: Scalars['ISO8601DateTime']['output']
  deletedAt?: Maybe<Scalars['ISO8601DateTime']['output']>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  updatedAt: Scalars['ISO8601DateTime']['output']
  users?: Maybe<Array<User>>
}

export type Mutation = {
  __typename?: 'Mutation'
  /** An example field added by the generator */
  testField: Scalars['String']['output']
}

export type Query = {
  __typename?: 'Query'
  /** Returns a list of families */
  families: Array<Family>
  family?: Maybe<Family>
  user?: Maybe<User>
  /** Returns a list of active users */
  users: Array<User>
}

export type QueryFamilyArgs = {
  id: Scalars['ID']['input']
}

export type QueryUserArgs = {
  id: Scalars['ID']['input']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['ISO8601DateTime']['output']
  deletedAt?: Maybe<Scalars['ISO8601DateTime']['output']>
  email: Scalars['String']['output']
  family?: Maybe<Family>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  role: Scalars['String']['output']
  updatedAt: Scalars['ISO8601DateTime']['output']
}

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetUsersQuery = {
  __typename?: 'Query'
  users: Array<{ __typename?: 'User'; id: string; name: string; email: string }>
}

export const GetUsersDocument = gql`
  query getUsers {
    users {
      id
      name
      email
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    getUsers(
      variables?: GetUsersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetUsersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUsersQuery>({
            document: GetUsersDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'getUsers',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
