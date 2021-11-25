import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArtistsTable from '../components/artists/artistsTable/ArtistsTable'
import { RootState } from '../core/store'
import { ArtistsActionCreators } from '../core/store/reducers/artists/action-creators'

const ArtistTableContainer = () => {
  const dispatch = useDispatch()
  const { items, pagination, isLoading } = useSelector(
    (state: RootState) => state.artists
  )
  const [currentPage, setCurrentPage] = useState(pagination.page)

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setCurrentPage(newPage + 1)
  }, [])

  const handleBulkDelete = (ids: readonly string[]) => {
    dispatch(ArtistsActionCreators.bulkDelete(ids))
  }

  useEffect(() => {
    dispatch(
      ArtistsActionCreators.fetchArtists({
        page: currentPage,
        limit: pagination.limit,
        sort: '',
        title: '',
        description: '',
      })
    )
  }, [dispatch, currentPage, pagination.limit])

  console.log('render artists table container')
  return (
    <>
      {items.length > 0 ? (
        <ArtistsTable
          data={items}
          pagination={pagination}
          onPageChange={handleChangePage}
          loading={isLoading}
          onBulkDelete={handleBulkDelete}
        />
      ) : (
        <h1>Загрузка таблицы</h1>
      )}
    </>
  )
}

export default ArtistTableContainer
