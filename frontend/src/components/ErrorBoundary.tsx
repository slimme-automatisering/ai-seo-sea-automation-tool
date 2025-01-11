import { Component, ErrorInfo, ReactNode } from 'react'
import { Box, Typography, Button } from '@mui/material'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          p={3}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Oeps! Er is iets misgegaan.
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            We hebben een onverwachte fout aangetroffen. Probeer de pagina te herladen.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleReload}
            sx={{ mt: 2 }}
          >
            Pagina herladen
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}
