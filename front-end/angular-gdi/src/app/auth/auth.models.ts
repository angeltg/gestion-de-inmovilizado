export interface Auth {
  uuid: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  company: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse{
  uuid: string;
  email: string;
  expiresIn: number;
  refreshToken: string;
  accessToken: string;
  company: string;
}

export interface RegisterReuqest{
  fullName: string,
  email: string,
  password: string,
  company: string
}