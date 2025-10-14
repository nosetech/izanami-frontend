'use client'

import { HttpLink } from '@apollo/client'
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/client-integration-nextjs'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'js-cookie'

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  })

  const authLink = setContext((_, { headers }) => {
    const userCookie = Cookies.get('user')
    const token = userCookie ? JSON.parse(userCookie).token : null

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  })
}

export function ApolloClientWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
