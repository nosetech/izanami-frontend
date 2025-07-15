'use client'
import { GetUsersDocument } from '@/graphql/generated/components'
import { useSuspenseQuery } from '@apollo/client'
import { Suspense } from 'react'

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <p>data received during Page render</p>
        <Content />
      </div>
    </Suspense>
  )
}

const Content = () => {
  const { data } = useSuspenseQuery(GetUsersDocument)
  return <p>{JSON.stringify(data)}</p>
}
