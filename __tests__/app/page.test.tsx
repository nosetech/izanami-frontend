import Page from '@/app/page'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'
import { renderWithTheme, createWithTheme } from '../test-utils'

const mockedUseRouter = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => mockedUseRouter(),
  usePathname: jest.fn().mockReturnValue('/graphql-client'),
}))

// TODO: テストコードはまだサンプルの実装の状態。画面実装完了後にテストコードも整備する。
describe('Page', () => {
  it('renders a heading', () => {
    renderWithTheme(<Page />)

    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  it('renders homepage unchanged', async () => {
    const component = createWithTheme(<Page />)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await waitFor(() => {
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
