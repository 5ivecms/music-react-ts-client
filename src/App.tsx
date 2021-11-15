import { Box } from '@mui/system'
import { FC } from 'react'
import ArtistsTable from './components/artists/artistsTable/ArtistsTable'
import Header from './components/common/Header/Header'

const App: FC = () => {
  return (
    <>
      <Header />
      <Box sx={{ padding: 2 }}>
        <ArtistsTable />
      </Box>
    </>
  )
}

export default App
