import { UserModel } from '../../../../models/User.model'
import { AuthAction, AuthActionTypes, AuthState } from './types'

const initialState: AuthState = {
  isAuth: false,
  user: {} as UserModel,
  isLoading: false,
  error: '',
}

export default function authReducer(
  state = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH:
      return { ...state, isAuth: action.payload, isLoading: false }

    case AuthActionTypes.SET_USER:
      return { ...state, user: action.payload }

    case AuthActionTypes.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false }

    case AuthActionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload }

    default:
      return state
  }
}
