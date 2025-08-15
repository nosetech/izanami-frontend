import { getClient } from '@/graphql/client'
import { GetUsersDocument, GetUsersQuery } from '@/graphql/generated/components'
import { User } from '@/types/api/User'

export const getUsers = async () => {
  const { data: queryData } = await getClient().query<GetUsersQuery>({
    query: GetUsersDocument,
  })
  const usersList: User[] = queryData.users.map((user) => {
    return { id: user.id, name: user.name, email: user.email } as User
  })

  return usersList
}
