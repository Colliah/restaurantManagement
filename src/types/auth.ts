export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber?: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
  phoneNumber?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
