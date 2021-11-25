import { IArtist } from '../../../types/IArtist'
import { IPagination } from '../../../types/IPagination'

export interface ArtistsState {
  isLoading: boolean
  items: IArtist[]
  searchFilter: any
  pagination: IPagination
  error: string
}

export enum ArtistsActionTypes {
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_ARTISTS = 'SET_ARTISTS',
  SET_PAGINATION = 'SET_PAGINATION',
  BULK_DELETE = 'BULK_DELETE',
  BULK_DELETE_SUCCESS = 'BULK_DELETE_SUCCESS',
}

export interface SetIsLoading {
  type: ArtistsActionTypes.SET_IS_LOADING
  payload: boolean
}

export interface SetError {
  type: ArtistsActionTypes.SET_ERROR
  payload: string
}

export interface SetArtists {
  type: ArtistsActionTypes.SET_ARTISTS
  payload: {
    artists: IArtist[]
    pagination: IPagination
  }
}

export interface SetPagination {
  type: ArtistsActionTypes.SET_PAGINATION
  payload: any
}

export interface BulkDelete {
  type: ArtistsActionTypes.BULK_DELETE
  payload: string[]
}

export interface BulkDeleteSuccess {
  type: ArtistsActionTypes.BULK_DELETE_SUCCESS
  payload: readonly string[]
}

export type ArtistsAction =
  | SetIsLoading
  | SetError
  | SetArtists
  | SetPagination
  | BulkDelete
  | BulkDeleteSuccess
