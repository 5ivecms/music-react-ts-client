import { ArtistsState, ArtistsAction, ArtistsActionTypes } from './types'

const initialState: ArtistsState = {
  isLoading: true,
  items: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 10,
  },
  searchFilter: {},
  error: '',
}

const artistsReducer = (
  state = initialState,
  action: ArtistsAction
): ArtistsState => {
  switch (action.type) {
    case ArtistsActionTypes.SET_ARTISTS: {
      return {
        ...state,
        isLoading: false,
        items: action.payload.artists,
        pagination: action.payload.pagination,
      }
    }

    case ArtistsActionTypes.SET_IS_LOADING: {
      return { ...state, isLoading: action.payload }
    }

    case ArtistsActionTypes.SET_ERROR: {
      return { ...state, error: action.payload }
    }

    case ArtistsActionTypes.SET_PAGINATION: {
      return { ...state, pagination: action.payload }
    }

    default:
      return state
  }
}

export default artistsReducer
