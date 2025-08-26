import { ApolloClientWrapper } from '@/graphql/ApolloClientWrapper'
import { defaultTheme } from '@/theme/default'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Slide, ToastContainer } from 'react-toastify'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <ToastContainer
              position='top-center'
              autoClose={2000}
              transition={Slide}
              hideProgressBar={true}
              newestOnTop={true}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
            <ApolloClientWrapper>{children}</ApolloClientWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
