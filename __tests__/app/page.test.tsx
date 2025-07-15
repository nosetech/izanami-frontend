import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import renderer from 'react-test-renderer'

const Home = React.lazy(() => import('@/app/page'))

describe('Home', () => {
  beforeEach(() => {
    jest.mock('../../src/hooks/useUsers', () => ({
      getUsers: jest
        .fn()
        .mockResolvedValue([
          { id: '1', name: 'Test User', email: 'test@example.com' },
        ]),
    }))
  })

  it('renders a heading', async () => {
    render(
      <React.Suspense fallback={<div>loading...</div>}>
        <Home />
      </React.Suspense>,
    )

    await waitFor(() =>
      expect(screen.getByText('ログインフォーム')).toBeInTheDocument(),
    )
  })

  it('renders homepage unchanged', async () => {
    const component = renderer.create(
      <React.Suspense fallback={<div>loading...</div>}>
        <Home />
      </React.Suspense>,
    )

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await waitFor(() => {
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
