import { UserModel } from '../../../../models/User.model'
import { AuthActionTypes, SetUserAction } from './types'

export const AuthActionCreators = {
  setUser: (user: UserModel): SetUserAction => ({
    type: AuthActionTypes.SET_USER,
    payload: user,
  }),
}
