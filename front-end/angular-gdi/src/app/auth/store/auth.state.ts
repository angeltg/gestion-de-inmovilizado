import { State, Store, StateContext, Action } from '@ngxs/store';
import { Auth } from '../auth.models';
import { AuthService } from '../services/auth.service';
import { Login, LoginSuccess, LoginFailed } from './auth.actions';

@State<Auth>({
  name: 'auth',
  defaults: {
    ...JSON.parse(localStorage.getItem('auth'))
  }
})
export class AuthState {
  constructor(private store: Store, private authService: AuthService) {}

  @Action(Login)
  login({ dispatch }: StateContext<Auth>, action: Login) {
    this.authService
      .login(action.login)
      .subscribe(
        data => dispatch(new LoginSuccess(data)),
        error => dispatch(new LoginFailed(error.error))
      );
  }

  @Action(LoginSuccess)
  loginSuccess(
    { patchState }: StateContext<Auth>,
    { loginResponse }: LoginSuccess
  ) {
    patchState({ ...loginResponse });
  }

  @Action([LoginFailed])
  error(ctx: StateContext<Auth>, { errors }: any) {}
}
