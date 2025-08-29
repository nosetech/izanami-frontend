import Page from '@/app/page'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'
import { createWithTheme, renderWithTheme } from '../test-utils'

const mockedUseRouter = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => mockedUseRouter(),
  usePathname: jest.fn().mockReturnValue('/graphql-client'),
}))

jest.mock('@/hooks', () => ({
  useCurrentUser: jest.fn().mockReturnValue({
    currentUser: null,
    isLoading: false,
    refreshUser: jest.fn(),
  }),
}))

describe('Page', () => {
  it('renders a login field', () => {
    renderWithTheme(<Page />)

    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('renders page unchanged', async () => {
    const component = createWithTheme(<Page />)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await waitFor(() => {
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
