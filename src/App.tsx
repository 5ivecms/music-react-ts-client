import { Container } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import { Header } from './components/common/Header'
import ArtistPage from './pages/ArtistPage'

const App: FC = () => {
  return (
    <>
      <Header />
      <Box sx={{ padding: 2 }}>
        <Container>
          <ArtistPage />
        </Container>
      </Box>
    </>
  )
}

export default App
