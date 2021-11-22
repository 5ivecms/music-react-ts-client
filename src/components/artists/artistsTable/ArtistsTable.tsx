import React, { FC, memo } from 'react'
import {
  CircularProgress,
  Paper,
  TableHead,
  TablePagination,
} from '@mui/material'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { IArtist } from '../../../core/types/IArtist'
import { green } from '@mui/material/colors'

interface IProps {
  data: IArtist[]
  pagination: any
  onPageChange: (event: unknown, newPage: number) => void
  loading: boolean
}

const ArtistsTableHead: FC = React.memo(() => {
  console.log('рендеринг шапки')
  return (
    <TableHead>
      <TableRow>
        <TableCell>Имя</TableCell>
        <TableCell align="right">Описание</TableCell>
        <TableCell align="right">Изображение</TableCell>
      </TableRow>
    </TableHead>
  )
})

const ArtistTableBody = React.memo(({ data }: { data: IArtist[] }) => {
  console.log('рендеринг боди')
  return (
    <TableBody>
      {data.map((artist) => (
        <TableRow
          key={artist._id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {artist.title}
          </TableCell>
          <TableCell align="right">{artist.description}</TableCell>
          <TableCell align="right">{artist.image}</TableCell>
        </TableRow>
      ))}
    </TableBody>
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
    console.log('рендеринг пагинации')
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
}) => {
  console.log('рендер таблицы', data.length, loading)
  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <ArtistsTableHead />
          <ArtistTableBody data={data} />
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
