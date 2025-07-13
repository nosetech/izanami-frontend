import { getClient } from '@/graphql/client'
import { GetUsersDocument, GetUsersQuery } from '@/graphql/generated/components'
import { Users } from '@/types/api/Users'

export const getUsers = async () => {
  const { data: queryData } = await getClient().query<GetUsersQuery>({
    query: GetUsersDocument,
  })
  const usersList: Users[] = queryData.users.map((user) => {
    return { id: user.id, name: user.name, email: user.email } as Users
  })

  return usersList
}
