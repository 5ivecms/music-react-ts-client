import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Box } from '@mui/system'
import { FC } from 'react'

const Header: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Music
            </Typography>
            <Button color="inherit">Войти</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default Header
