export interface ISignUpRequestBody {
  full_name: string;
  email: string;
  password: string;
}

export interface ISignInRequestBody {
  email: string;
  password: string;
}

export interface IAuthResult {
  user: {
    id: number;
    email: string;
    full_name: string | null;
  };
  token: string;
}
