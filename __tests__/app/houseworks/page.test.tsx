import Page from '@/app/houseworks/page'
import '@testing-library/jest-dom'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { createWithTheme, renderWithTheme } from '../../test-utils'

// Create default mock functions that can be accessed from tests
let mockGetHouseWorksList: jest.Mock
let mockLoadMoreHouseWorks: jest.Mock

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
  usePathname: jest.fn().mockReturnValue('/houseworks'),
}))

// Mock the hooks that are critical for component behavior
jest.mock('@/hooks', () => ({
  useCurrentUser: jest.fn().mockReturnValue({
    currentUser: {
      id: 'user-1',
      name: 'Test User',
      family_id: 'family-1',
      role: 'user',
    },
    isLoading: false,
    refreshUser: jest.fn(),
  }),
  useIntersectionObserver: jest.fn((callback) => {
    return { current: null }
  }),
  useLocalStorage: jest.fn((key, defaultValue) => {
    return [defaultValue, jest.fn()]
  }),
}))

// Mock useHouseWorks hook
jest.mock('@/hooks/api/useHouseWorks')

// Helper to setup useHouseWorks mock with default return value
function setupUseHouseWorksMock(overrides?: any) {
  const { useHouseWorks } = require('@/hooks/api/useHouseWorks')
  mockGetHouseWorksList = jest.fn()
  mockLoadMoreHouseWorks = jest.fn()

  const defaultReturn = {
    isLoading: false,
    isLoadingMore: false,
    getHouseWorksList: mockGetHouseWorksList,
    loadMoreHouseWorks: mockLoadMoreHouseWorks,
    houseWorksList: {
      edges: [
        {
          node: {
            id: 'housework-1',
            title: 'Clean kitchen',
            description: 'Deep clean',
            category: 'CLEANING',
            schedule: 'Weekly',
            point: 10,
            committed: true,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            suggestedBy: { id: 'user-2', name: 'Other User' },
          },
        },
      ],
      totalCount: 1,
    },
    hasNextPage: false,
    ...overrides,
  }

  useHouseWorks.mockReturnValue(defaultReturn)
}

// Mock child components to simplify testing
jest.mock('@/components/organisms', () => ({
  HouseWorkCard: ({ housework, onClick }: any) => (
    <div
      data-testid={`housework-card-${housework.id}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {housework.title}
    </div>
  ),
  HouseWorkModal: ({ open, onClose, housework, isAdmin }: any) => {
    if (!open) return null
    return (
      <div data-testid="housework-modal">
        <span>{housework ? `Edit: ${housework.title}` : 'Create new housework'}</span>
        <button data-testid="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    )
  },
  HouseWorkSearch: ({ onSearchChange }: any) => (
    <input
      data-testid="search-input"
      type="text"
      placeholder="Search"
      onChange={(e) => onSearchChange({ title: e.target.value })}
    />
  ),
}))

jest.mock('@/components/atoms/PrimaryButton', () => ({
  PrimaryButton: ({ onClick, children }: any) => (
    <button data-testid="create-button" onClick={onClick}>
      {children}
    </button>
  ),
}))

// Mock BaseLayout to avoid mocking Footer and other dependencies
jest.mock('@/components/templates/BaseLayout', () => ({
  BaseLayout: ({ children }: any) => <div data-testid="base-layout">{children}</div>,
}))

describe('HouseWorks Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    setupUseHouseWorksMock()
  })

  describe('Snapshot Tests', () => {
    it('renders houseworks page unchanged', async () => {
      const component = createWithTheme(<Page />)

      await new Promise((resolve) => setTimeout(resolve, 500))

      await waitFor(() => {
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('Component Rendering Tests', () => {
    it('should render the page title', async () => {
      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(screen.getByText('House Work')).toBeInTheDocument()
      })
    })

    it('should render create button', async () => {
      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(screen.getByTestId('create-button')).toBeInTheDocument()
      })
    })

    it('should render search input', async () => {
      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(screen.getByTestId('search-input')).toBeInTheDocument()
      })
    })

    it('should render housework cards', async () => {
      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(
          screen.getByTestId('housework-card-housework-1'),
        ).toBeInTheDocument()
      })
    })

    it('should display total count', async () => {
      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(screen.getByText('検索結果1件')).toBeInTheDocument()
      })
    })
  })

  describe('User Interaction Tests', () => {
    it('should open modal when create button is clicked', async () => {
      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(screen.getByTestId('create-button')).toBeInTheDocument()
      })

      const createButton = screen.getByTestId('create-button')
      fireEvent.click(createButton)

      await waitFor(() => {
        expect(screen.getByTestId('housework-modal')).toBeInTheDocument()
        expect(screen.getByText('Create new housework')).toBeInTheDocument()
      })
    })

    it('should close modal when close button is clicked', async () => {
      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(screen.getByTestId('create-button')).toBeInTheDocument()
      })

      const createButton = screen.getByTestId('create-button')
      fireEvent.click(createButton)

      await waitFor(() => {
        expect(screen.getByTestId('housework-modal')).toBeInTheDocument()
      })

      const closeButton = screen.getByTestId('modal-close')
      fireEvent.click(closeButton)

      await waitFor(() => {
        expect(
          screen.queryByTestId('housework-modal'),
        ).not.toBeInTheDocument()
      })
    })

    it('should open modal with selected housework when card is clicked', async () => {
      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(
          screen.getByTestId('housework-card-housework-1'),
        ).toBeInTheDocument()
      })

      const card = screen.getByTestId('housework-card-housework-1')
      fireEvent.click(card)

      await waitFor(() => {
        expect(screen.getByTestId('housework-modal')).toBeInTheDocument()
        expect(screen.getByText('Edit: Clean kitchen')).toBeInTheDocument()
      })
    })

    it('should update search filter when input changes', async () => {
      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(screen.getByTestId('search-input')).toBeInTheDocument()
      })

      const searchInput = screen.getByTestId('search-input')
      fireEvent.change(searchInput, { target: { value: 'kitchen' } })

      // Verify search was called with the filter
      await waitFor(() => {
        expect(mockGetHouseWorksList).toHaveBeenCalled()
      })
    })
  })

  describe('State Management Tests', () => {
    it('should call getHouseWorksList on component mount', async () => {
      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(mockGetHouseWorksList).toHaveBeenCalled()
      })
    })

    it('should pass correct parameters to getHouseWorksList', async () => {
      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(mockGetHouseWorksList).toHaveBeenCalledWith(
          'family-1',
          expect.objectContaining({
            field: 'created_at',
            direction: 'desc',
          }),
          expect.any(Object),
        )
      })
    })

  })

  describe('Loading State Tests', () => {
    it('should display loading spinner when data is loading', async () => {
      setupUseHouseWorksMock({
        isLoading: true,
        houseWorksList: null,
      })

      const { container } = renderWithTheme(<Page />)

      await waitFor(() => {
        // CircularProgress component renders as SVG
        expect(container.querySelector('svg')).toBeInTheDocument()
      })
    })

    it('should not display cards when houseWorksList is null', async () => {
      setupUseHouseWorksMock({
        houseWorksList: null,
      })

      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(
          screen.queryByTestId('housework-card-housework-1'),
        ).not.toBeInTheDocument()
      })
    })

    it('should handle empty housework list', async () => {
      setupUseHouseWorksMock({
        houseWorksList: {
          edges: [],
          totalCount: 0,
        },
      })

      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(screen.getByText('検索結果0件')).toBeInTheDocument()
      })
    })

    it('should display sentinel element when hasNextPage is true', async () => {
      setupUseHouseWorksMock({
        houseWorksList: {
          edges: [
            {
              node: {
                id: 'housework-1',
                title: 'Task 1',
                description: 'Desc',
                category: 'CLEANING',
                schedule: '',
                point: 10,
                committed: true,
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-01T00:00:00Z',
                suggestedBy: { id: 'user-2', name: 'Other User' },
              },
            },
          ],
          totalCount: 1,
        },
        hasNextPage: true,
      })

      const { container } = renderWithTheme(<Page />)

      await waitFor(() => {
        expect(
          screen.getByTestId('housework-card-housework-1'),
        ).toBeInTheDocument()
      })

      // Sentinel element should have height style
      const sentinelElement = container.querySelector(
        'div[style*="height: 100px"]',
      )
      expect(sentinelElement).toBeInTheDocument()
    })
  })

  describe('Edge Case Tests', () => {
    it('should handle undefined currentUser', async () => {
      const { useCurrentUser } = require('@/hooks')

      useCurrentUser.mockReturnValueOnce({
        currentUser: undefined,
        isLoading: false,
        refreshUser: jest.fn(),
      })

      renderWithTheme(<Page />)

      // Should render page without crashing
      await waitFor(() => {
        expect(screen.getByText('House Work')).toBeInTheDocument()
      })
    })

    it('should handle currentUser with admin role', async () => {
      const { useCurrentUser } = require('@/hooks')

      useCurrentUser.mockReturnValueOnce({
        currentUser: {
          id: 'admin-1',
          name: 'Admin User',
          family_id: 'family-1',
          role: 'admin',
        },
        isLoading: false,
        refreshUser: jest.fn(),
      })

      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(screen.getByText('House Work')).toBeInTheDocument()
      })
    })

    it('should handle multiple housework items', async () => {
      setupUseHouseWorksMock({
        houseWorksList: {
          edges: [
            {
              node: {
                id: 'housework-1',
                title: 'Task 1',
                description: 'Desc 1',
                category: 'CLEANING',
                schedule: '',
                point: 10,
                committed: true,
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-01T00:00:00Z',
                suggestedBy: { id: 'user-2', name: 'User 2' },
              },
            },
            {
              node: {
                id: 'housework-2',
                title: 'Task 2',
                description: 'Desc 2',
                category: 'COOKING',
                schedule: '',
                point: 5,
                committed: false,
                createdAt: '2024-01-02T00:00:00Z',
                updatedAt: '2024-01-02T00:00:00Z',
                suggestedBy: { id: 'user-1', name: 'User 1' },
              },
            },
            {
              node: {
                id: 'housework-3',
                title: 'Task 3',
                description: 'Desc 3',
                category: 'LAUNDRY',
                schedule: '',
                point: 8,
                committed: true,
                createdAt: '2024-01-03T00:00:00Z',
                updatedAt: '2024-01-03T00:00:00Z',
                suggestedBy: { id: 'user-3', name: 'User 3' },
              },
            },
          ],
          totalCount: 3,
        },
      })

      renderWithTheme(<Page />)

      await waitFor(() => {
        expect(
          screen.getByTestId('housework-card-housework-1'),
        ).toBeInTheDocument()
        expect(
          screen.getByTestId('housework-card-housework-2'),
        ).toBeInTheDocument()
        expect(
          screen.getByTestId('housework-card-housework-3'),
        ).toBeInTheDocument()
        expect(screen.getByText('検索結果3件')).toBeInTheDocument()
      })
    })
  })

  describe('Sort Functionality Tests', () => {
    it('should have sort dropdown available', async () => {
      renderWithTheme(<Page />)

      await waitFor(() => {
        const sortDropdown = screen.getByRole('combobox')
        expect(sortDropdown).toBeInTheDocument()
      })
    })
  })
})
