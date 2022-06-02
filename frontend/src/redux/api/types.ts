export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface IResetPasswordRequest {
  resetToken: string;
  password: string;
  passwordConfirm: string;
}

export interface ICreatePostRequest {
  name: string;
  content: string;
  image: string;
  user: string;
}

export interface IPostResponse {
  id: string;
  name: string;
  content: string;
  image: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
