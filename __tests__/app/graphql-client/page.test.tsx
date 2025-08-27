import Home from '@/app/graphql-client/page'
import { useSuspenseQuery } from '@apollo/client'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'
import { renderWithTheme, createWithTheme } from '../../test-utils'

jest.mock('@apollo/client', () => {
  const actual = jest.requireActual('@apollo/client')
  return {
    ...actual,
    useSuspenseQuery: jest.fn(),
  }
})

describe('GraphQL Client', () => {
  beforeEach(() => {
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: {
        users: [
          // 配列形式で返す
          {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            __typename: 'User',
          },
        ],
      },
    })
  })

  it('renders a content', async () => {
    renderWithTheme(<Home />)

    await waitFor(() => {
      expect(
        screen.getByText('data received during Page render'),
      ).toBeInTheDocument()
    })
    expect(
      screen.getByText(
        '{"users":[{"id":1,"name":"Test User","email":"test@example.com","__typename":"User"}]}',
      ),
    ).toBeInTheDocument()
  })

  it('renders page unchanged', async () => {
    const component = createWithTheme(<Home />)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    await waitFor(() => {
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
