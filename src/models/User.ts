interface UserState {
  userCode : string;
  password : string;
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expires_in: number;
}

class User {
  state: UserState = {
    userCode : "",
    password : "",
    access_token: "",
    refresh_token: "",
    scope: "",
    token_type: "",
    expires_in: 0,
  };

  constructor() {}

  setState(newState: Partial<UserState>) {
    this.state = { ...this.state, ...newState };
  }
}

export default User;
