export interface GenericResponse {
  status: string;
  message: string;
}

export interface IResetPasswordRequest {
  resetToken: string;
  password: string;
  passwordConfirm: string;
}

export interface IPostRequest {
  title: string;
  content: string;
  image: string;
  user: string;
}

export interface IUser {
  name: string;
  email: string;
  role: string;
  photo: string;
  _id: string;
  id: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface IPostResponse {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  user: IUser;
  created_at: string;
  updated_at: string;
}
