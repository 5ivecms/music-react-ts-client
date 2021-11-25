import React, { FC, memo } from 'react'
import {
  Checkbox,
  CircularProgress,
  IconButton,
  Paper,
  TableHead,
  TablePagination,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { IArtist } from '../../../core/types/IArtist'
import { green } from '@mui/material/colors'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { alpha } from '@mui/material/styles'

interface IProps {
  data: IArtist[]
  pagination: any
  onPageChange: (event: unknown, newPage: number) => void
  loading: boolean
  onBulkDelete: (ids: readonly string[]) => void
}

interface EnhancedTableToolbarProps {
  selected: readonly string[]
  onBulkDelete: (ids: readonly string[]) => void
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { selected, onBulkDelete } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected.length} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}
      {selected.length > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => onBulkDelete(selected)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

interface ArtistsTableHeadProps {
  numSelected: number
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  rowCount: number
}

const ArtistsTableHead: FC<ArtistsTableHeadProps> = React.memo((props) => {
  const { onSelectAllClick, numSelected, rowCount } = props
  console.log('рендеринг шапки')
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>

        <TableCell>Имя</TableCell>
        <TableCell align="right">Описание</TableCell>
        <TableCell align="right">Изображение</TableCell>
      </TableRow>
    </TableHead>
  )
})

const ArtistTablePagination: FC<any> = React.memo(
  ({
    pagination,
    onPageChange,
  }: {
    pagination: any
    onPageChange: (event: unknown, newPage: number) => void
  }) => {
    return (
      <TablePagination
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.limit}
        page={pagination.page - 1}
        onPageChange={onPageChange}
        rowsPerPageOptions={[]}
      />
    )
  }
)

const TablePreloader: FC = () => {
  console.log('рендер прелоадер')
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          backgroundColor: '#fff',
          opacity: 0.6,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          margin: 'auto',
          zIndex: 1,
        }}
      ></Box>
      <CircularProgress
        size={68}
        sx={{
          color: green[500],
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          margin: 'auto',
          zIndex: 2,
        }}
      />
    </>
  )
}

const ArtistsTable: FC<IProps> = ({
  data,
  pagination,
  onPageChange,
  loading,
  onBulkDelete,
}) => {
  const [selected, setSelected] = React.useState<readonly string[]>([])

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n._id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <TableContainer component={Paper}>
        <EnhancedTableToolbar selected={selected} onBulkDelete={onBulkDelete} />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <ArtistsTableHead
            onSelectAllClick={handleSelectAllClick}
            numSelected={selected.length}
            rowCount={data.length}
          />
          <TableBody>
            {data.map((artist) => {
              const isItemSelected = isSelected(artist._id)
              return (
                <TableRow
                  key={artist._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onClick={(e) => handleClick(e, artist._id)}
                      inputProps={{
                        'aria-labelledby': `enhanced-table-checkbox-${artist._id}`,
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {artist.title}
                  </TableCell>
                  <TableCell align="right">{artist.description}</TableCell>
                  <TableCell align="right">{artist.image}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <ArtistTablePagination
          pagination={pagination}
          onPageChange={onPageChange}
        />
      )}
      {loading && <TablePreloader />}
    </Box>
  )
}

export default memo(ArtistsTable)
