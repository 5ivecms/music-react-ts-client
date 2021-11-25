import { AppDispatch } from '../..'
import { IArtist } from '../../../types/IArtist'
import {
  ArtistsActionTypes,
  BulkDeleteSuccess,
  SetArtists,
  SetIsLoading,
  SetPagination,
} from './types'
import api from '../../../services/api'
import { IFindManyRequest } from '../../../services/api/endpoints/artists'
import { IPagination } from '../../../types/IPagination'
import axios from 'axios'

export const ArtistsActionCreators = {
  setArtists: (payload: {
    artists: IArtist[]
    pagination: IPagination
  }): SetArtists => ({
    type: ArtistsActionTypes.SET_ARTISTS,
    payload,
  }),

  setIsLoading: (payload: boolean): SetIsLoading => ({
    type: ArtistsActionTypes.SET_IS_LOADING,
    payload,
  }),

  setPagination: (payload: IPagination): SetPagination => ({
    type: ArtistsActionTypes.SET_PAGINATION,
    payload,
  }),

  fetchArtists: (data?: IFindManyRequest) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ArtistsActionCreators.setIsLoading(true))
      const artistsResponse = await api.artists.findMany(data)
      const { page, total, limit, items } = artistsResponse.data
      const pagination: IPagination = { page, limit, total }
      dispatch(ArtistsActionCreators.setArtists({ artists: items, pagination }))
    } catch (e: Error | any) {
      if (axios.isAxiosError(e)) {
        console.log('Ошибка ', e?.response?.statusText)
      }
      dispatch(ArtistsActionCreators.setIsLoading(false))
    }
  },

  bulkDelete: (ids: readonly string[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ArtistsActionCreators.setIsLoading(true))
      await api.artists.bulkDelete(ids)
      dispatch(ArtistsActionCreators.bulkDeleteSuccess(ids))
    } catch (e) {
      dispatch(ArtistsActionCreators.setIsLoading(false))
    }
  },

  bulkDeleteSuccess: (payload: readonly string[]): BulkDeleteSuccess => ({
    type: ArtistsActionTypes.BULK_DELETE_SUCCESS,
    payload,
  }),
}
