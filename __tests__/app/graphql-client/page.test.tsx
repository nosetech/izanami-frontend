import Home from '@/app/graphql-client/page'
import { useSuspenseQuery } from '@apollo/client'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import renderer from 'react-test-renderer'

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useSuspenseQuery: jest.fn().mockResolvedValue({
    data: { id: '1', name: 'Test User', email: 'test@example.com' },
  }),
}))

describe('GraphQL Client', () => {
  it('renders a content', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(
        screen.getByText('data received during Page render'),
      ).toBeInTheDocument()
      //    expect(screen.getByText('{"id":1}')).toBeInTheDocument()
      expect(useSuspenseQuery).toHaveBeenCalled()
    })
  })

  it('renders page unchanged', async () => {
    const component = renderer.create(<Home />)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    await waitFor(() => {
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
