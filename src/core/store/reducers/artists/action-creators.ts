import { AppDispatch } from '../..'
import { IArtist } from '../../../types/IArtist'
import {
  ArtistsActionTypes,
  SetArtists,
  SetIsLoading,
  SetPagination,
} from './types'
import api from '../../../services/api'
import { IFindManyRequest } from '../../../services/api/endpoints/artists'
import { IPagination } from '../../../types/IPagination'

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
    } catch (e) {
      dispatch(ArtistsActionCreators.setIsLoading(false))
    }
  },
}
